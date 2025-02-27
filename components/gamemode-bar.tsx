'use client'

import Tooltip from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import * as React from "react";
import {useGameMode} from "@/components/game-mode-provider";


export function GameModeBar (): JSX.Element {
	const {gameMode, setGameMode} = useGameMode();

	const handleClick = (value: string) => {
		if (window.location.pathname !== "/") {
			window.location.href = "/"
		}

		setGameMode(value);
	}

	return (
		<div className={"flex gap-2 border-l-2 border-l-foreground"}>
			<Tooltip direction={'bottom'} text={"Lönd"}>
				<div
					className={cn(buttonVariants({
						size: "icon",
						variant: "ghost",
					}), "ml-2")}
					onClick={(e) => handleClick("country")}
				>
					<Icons.countries/>
					<span className="sr-only">Lönd</span>
				</div>
			</Tooltip>

			<Tooltip direction={'bottom'} text={"Almennt"}>
				<div
					className={buttonVariants({
						size: "icon",
						variant: "ghost",
					})}
					onClick={(e) => handleClick("general")}

				>
					<Icons.general/>
					<span className="sr-only">Almennt</span>
				</div>
			</Tooltip>
		</div>
	)
}
