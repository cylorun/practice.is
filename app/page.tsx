'use client'

import CountryTriviaGame from "@/components/quiz/country-trivia";
import GeneralQuestions from "@/components/quiz/general-questions";

import {useGameMode} from "@/components/game-mode-provider";


const Page = () => {
	const {gameMode} = useGameMode();

	if (gameMode === "country") {
		return <CountryTriviaGame/>
	}

	if (gameMode === "general") {
		return <GeneralQuestions/>
	}

	return (
		<p>{gameMode}</p>
	)
};

export default Page;
