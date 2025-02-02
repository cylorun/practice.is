
import React, { useEffect, useState } from "react";
import axios from "axios";
import {capitalize, cn, normalizeString, stringPercentageMatch} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {supabase, uploadScore} from "@/lib/supabase";
import {Toast} from "@/components/ui/toast";

type Question = {
	question: string;
	ans: string;
};

type GameResult = {
	question: string;
	userAnswer: string;
	correctAnswer: string;
	score: number;
	skipped: boolean;
};

const GAME_LENGTH_SECONDS = 10;

const GeneralQuestions = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [randQuestion, setRandQuestion] = useState<Question | null>(null);
	const [userAnswer, setUserAnswer] = useState<string>("");
	const [gameTime, setGameTime] = useState<number>(GAME_LENGTH_SECONDS);
	const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [gameResults, setGameResults] = useState<GameResult[]>([]);
	const [startTime, setStartTime] = useState<number>(Date.now());

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [openErrorToast, setOpenErrorToast] = useState(false);
	const [error, setError] = useState<string>("");

	const fetchQuestions = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get("/questions.json");
			if (res.status === 200) {
				setQuestions(res.data);
			} else {
				throw new Error("Failed to fetch questions");
			}
			nextQuestion(res.data);
		} catch (e: any) {
			setError(e.message);
			setOpenErrorToast(true);
		} finally {
			setIsLoading(false);
		}
	};

	const isValidAnswer = (answer: string): boolean => {
		if (!answer) {
			return false;
		}

		const ans = normalizeString(answer);
		const correctAns = normalizeString(randQuestion?.ans ?? "");

		return stringPercentageMatch(ans, correctAns, 70);
	};

	const checkAnswer = (skipped = false) => {
		if (!randQuestion) return;

		if (!userAnswer || userAnswer === "") {
			skipped = true; // if the useranswer is empty we count it as a skipped question
		}

		const correct = isValidAnswer(userAnswer);
		const timeTaken = (Date.now() - startTime) / 1000;

		const score = correct ? 1 : 0;
		setGameResults((prev) => [
			...prev,
			{
				question: randQuestion.question,
				userAnswer,
				correctAnswer: randQuestion.ans,
				score,
				skipped
			},
		]);

		if (correct) {
			setRoundsPlayed((prev) => prev + 1);
		}

		nextQuestion();
	};

	const nextQuestion = (data = questions) => {
		if (gameTime <= 0) return;

		setRandQuestion(data[Math.floor(Math.random() * data.length)]);
		setUserAnswer("");
		setStartTime(Date.now());
	};

	const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserAnswer(e.currentTarget.value);
	};

	const onSkip = () => {
		checkAnswer(true);
	};

	const restartGame = () => {
		setGameOver(false);
		setGameTime(GAME_LENGTH_SECONDS);
		setGameResults([]);

		setRandQuestion(questions[Math.floor(Math.random() * questions.length)]);
		setUserAnswer("");
		setStartTime(Date.now());
	};

	const getScoreTextNColor = (gameScore: GameResult): string[] => {
		if (gameScore.skipped) {
			return ["Pass", "text-[#afaaa9]"]
		}

		if (gameScore.score === 1) {
			return ["Rétt", "text-[#00ff00]"]
		}

		return ["Rangt", "text-[#ff0000]"]
	}


	useEffect(() => {
		fetchQuestions();
	}, []);

	useEffect(() => {
		if (gameTime > 0 && !gameOver) {
			const timer = setInterval(() => {
				setGameTime((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(timer);
						setGameOver(true);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [gameTime, gameOver]);

	useEffect(() => {
		(async () => {
			if (gameOver && gameResults.length > 0) { // if no gameresults the player hasnt done anything, so pointless to upload
				const {data: userData, error: userError} = await supabase.auth.getUser();
				if (!userData || userError) {
					return;
				}

				const user_id = userData.user.id;
				const {data, error} = await uploadScore({
					user_id,
					duration_s: GAME_LENGTH_SECONDS,
					type: "speedquestions",
					created_at: new Date(),
					correct_questions: gameResults.reduce((p, c) => p + c.score, 0),
					wrong_questions: gameResults.reduce((p, c) => p + (!c.skipped && c.score === 0 ? 1 : 0), 0),
					total_questions: gameResults.length,
				});

				if (error) {
					setError(error.message);
					setOpenErrorToast(true);
				}
			}
		})();
	}, [gameOver]);

	useEffect(() => {
		if (!randQuestion) return;
		setStartTime(Date.now());
		console.log(randQuestion);
	}, [randQuestion]);

	return (
		<section className="mt-8 flex w-full flex-col items-center justify-center">
			<Toast error title={"An error occured"} description={error ? error : "Unknown error"} open={openErrorToast} setOpen={setOpenErrorToast}/>

			{!gameOver ? (
				<>
					<p className="mb-4 text-center text-lg ">
						<span className="font-semibold">Spurning: </span>
						<br />
						<span className={"text-accent"}>
              {randQuestion?.question ? capitalize(randQuestion?.question) : ""}
            </span>
					</p>
					<div className="container mx-auto grid max-w-2xl items-center justify-center gap-6 pb-8 pt-6 md:py-10">
						<div className="flex flex-col rounded-md p-8 shadow-lg shadow-black">
							<label htmlFor="capital-inp" className="mb-2 text-sm text-gray-300">
								Svar
							</label>
							<input
								id="cap-inp"
								type="text"
								value={userAnswer}
								onChange={onUserInput}
								className={"textinp"}
								placeholder="Sláðu inn svar..."
								autoFocus={true}
								onKeyUp={(e) => {
									if (e.key === "Enter") {
										checkAnswer();
									}
								}}
							/>
						</div>

						<Button
							variant={"default"}
							className="my-2 max-h-12  min-w-28 rounded-md p-2 shadow-md shadow-black"
							onClick={onSkip}
						>
							Næsta
						</Button>

						<p className="text-md text-foreground">
							Tími eftir:{" "}
							<span className="font-semibold text-accent">
								{gameTime}s
							</span>
						</p>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center">
					<h2 className="text-lg font-semibold">Leikur kláraður!</h2>
					<p>{gameResults.reduce((p, c) => p + c.score, 0)} stig</p>
					<div className="mt-4">
						<h3 className="font-semibold">Úrslit:</h3>
						<ul>
							{gameResults.map((result, index) => (
								<li key={index} className="mb-2">
									<p>
										<span className="font-semibold">Spurning: </span>
										{result.question}
									</p>
									<p>
										<span className="font-semibold">Þitt svar: </span>
										{result.userAnswer}{" "}
										<span className={getScoreTextNColor(result)[1]}>
                      						({getScoreTextNColor(result)[0]}).
                    					</span>
									</p>
									<p>
										<span className="font-semibold">Rétt svar: </span>
										{result.correctAnswer}
									</p>
								</li>
							))}
						</ul>
					</div>

					<div
						className={cn(buttonVariants({variant: "default"}), "my-4 hover:cursor-pointer")}
						onClick={restartGame}
					>
						Spila aftur
					</div>
				</div>
			)}
		</section>
	);
};

export default GeneralQuestions;
