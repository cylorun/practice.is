import * as React from "react"
import Link from "next/link"

import {siteConfig} from "@/config/site"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button";
import {GameModeBar} from "@/components/gamemode-bar";
import Tooltip from "@/components/ui/tooltip";

export function MainNav() {
	return (
		<div className="flex gap-6 md:gap-5">
			<Link href="/" className="flex items-center space-x-2">
				<Icons.logo className="size-8"/>
				<span className="inline-block text-xl font-bold">{siteConfig.name}</span>
			</Link>
			<nav className="flex gap-2 border-l-2 border-l-foreground">
				{/*About button*/}
				<Tooltip text="Info" direction="bottom">
					<Link
						href={"/about"}
						className={"ml-2 flex items-center text-sm font-medium"}
					>
						<div
							className={buttonVariants({
								size: "icon",
								variant: "ghost",
							})}
						>
							<Icons.info size={22}/>
							<span className="sr-only">About</span>
						</div>
					</Link>
				</Tooltip>
				{/*gh repo button*/}
				<Tooltip text={"Kóði"} direction="bottom" >
					<Link
						target="_blank"
						href={"https://github.com/cylorun/practice.is"}
						className={" flex items-center text-sm font-medium"}
					>
						<div
							className={buttonVariants({
								size: "icon",
								variant: "ghost",
							})}
						>
							<Icons.code/>
							<span className="sr-only">Github Repo</span>
						</div>
					</Link>
				</Tooltip>
				<GameModeBar/>
			</nav>
		</div>
	)
}
