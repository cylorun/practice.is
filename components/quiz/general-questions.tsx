import {Button} from "@/components/ui/button";
import {useState} from "react";


const GeneralQuestions = () => {

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [guessTimes, setGuessTimes] = useState<number[]>([]);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [averageTime, setAverageTime] = useState<number | null>(null);
	const [roundsPlayed, setRoundsPlayed] = useState<number>(0);



	const onSkip = () => {

	}
	return (
		<section className="container mx-auto grid max-w-2xl items-center justify-center gap-6 pb-8 pt-6 md:py-10">
			<p className="mb-4 text-lg">
				<span className="font-semibold">Question: </span>
				<span className={'text-accent'}>---</span>
			</p>

			<div className="flex flex-col rounded-md p-8 shadow-lg shadow-black">
				<label htmlFor="capital-inp" className="mb-2 text-sm text-gray-300">
					Capital
				</label>
				<input
					id="cap-inp"
					type="text"
					className={'textinp'}
					placeholder="Enter capital..."
					autoFocus={true}
				/>

				<label htmlFor="curr-inp" className="mb-2 text-sm text-gray-300">
					Currency
				</label>
				<input
					id="curr-inp"
					type="text"
					className={'textinp'}
					placeholder="Enter currency."
				/>
			</div>

			<Button
				variant={"default"}
				className="my-2 max-h-12  min-w-28 rounded-md p-2 shadow-md shadow-black"
				onClick={onSkip}
			>
				Skip
			</Button>

			<p className="text-md text-gray-300">
				Average Time:{" "}
				<span className="font-semibold text-blue-400">
         			{averageTime ? averageTime.toFixed(2) : "--:--"}
      			</span>
				{" "}seconds in {roundsPlayed} {roundsPlayed === 1 ? 'round' : 'rounds'}
			</p>
		</section>
	);
}

export default GeneralQuestions;
