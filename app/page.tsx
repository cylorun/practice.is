'use client'

import CountryTriviaGame from "@/components/quiz/country-trivia";
import {useGameMode} from "@/components/game-mode-provider";


const Page = () => {
	const {gameMode} = useGameMode();

	if (gameMode === "country") {
		return <CountryTriviaGame/>
	}

	return (
		<p>{gameMode}</p>
	)
};

export default Page;
