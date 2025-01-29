"use client";

import React, { createContext, useContext, useState } from "react";

interface GameModeContextValue {
	gameMode: string;
	setGameMode: (mode: string) => void;
}

const GameModeContext = createContext<GameModeContextValue | undefined>(undefined);

export const GameModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [gameMode, setGameMode] = useState("general");

	return (
		<GameModeContext.Provider value={{ gameMode, setGameMode }}>
			{children}
		</GameModeContext.Provider>
	);
};

export const useGameMode = (): GameModeContextValue => {
	const context = useContext(GameModeContext);
	if (!context) {
		throw new Error("useGameMode must be used within a GameModeProvider");
	}
	return context;
};
