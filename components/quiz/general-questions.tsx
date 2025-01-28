import React, { useEffect, useState } from "react";
import axios from "axios";



import {capitalize, normalizeString} from "@/lib/utils";
import { Button } from "@/components/ui/button";





type Question = {
	question: string
	ans: string
}


const GeneralQuestions = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [randQuestion, setRandQuestion] = useState<Question>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [guessTimes, setGuessTimes] = useState<number[]>([]);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [averageTime, setAverageTime] = useState<number | null>(null);
	const [roundsPlayed, setRoundsPlayed] = useState<number>(0);

	const [userAnswer, setUserAnswer] = useState<string>("");

	const fetchQuestions = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get("/questions.json")
			if (res.status === 200) {
				setQuestions(res.data)
			} else {
				throw new Error("Failed to fetch questions")
			}

			setRandQuestion(res.data[Math.floor(Math.random() * res.data.length)])
			setStartTime(Date.now());
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const isValidAnswer = (answer: string): boolean => {
		if (!answer) {
			return false;
		}
		return normalizeString(answer) === normalizeString((randQuestion?.ans ?? ""));
	}

	useEffect(() => {
		fetchQuestions()
	}, []);

	useEffect(() => {
		console.log(randQuestion);
		console.log(averageTime);
	}, [randQuestion]);

	useEffect(() => {
		if (isValidAnswer(userAnswer)) {
			setRoundsPlayed((prev) => prev + 1);

			const endTime = Date.now();
			const timeTaken = (endTime - startTime!) / 1000;

			setGuessTimes((prev) => {
				const updatedGuessTimes = [...prev, timeTaken];
				const newAverageTime = updatedGuessTimes.reduce((acc, curr) => acc + curr, 0) / updatedGuessTimes.length;
				setAverageTime(newAverageTime);
				return updatedGuessTimes;
			});

			nextQuestion();
		}
	}, [userAnswer]);



	const nextQuestion = () => {
		setRandQuestion(questions[Math.floor(Math.random() * questions.length)]);
		setUserAnswer("");
		setStartTime(Date.now());
	}

	const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserAnswer(e.currentTarget.value);
	}

	const onSkip = () => {
		nextQuestion();
	}

	return (
		<section className="mt-8 flex w-full flex-col items-center justify-center">
			<p className="mb-4 text-center text-lg ">
				<span className=" font-semibold">Spurning: </span>
				<br/>
				<span className={"text-accent"}>{randQuestion?.question ? capitalize(randQuestion?.question) : ""}</span>
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
					Meðaltími:{" "}
					<span className="font-semibold text-accent">
					{averageTime ? averageTime.toFixed(2) : "--:--"}
				  </span>
					{" "} sekúndur yfir {roundsPlayed} {roundsPlayed === 1 ? 'leik' : 'leiki'}
				</p>
			</div>
		</section>
	)
}

export default GeneralQuestions
