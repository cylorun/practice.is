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
				<span className="hidden text-xl font-bold xs:inline-block">{siteConfig.name}</span>
			</Link>
			<div className={'flex items-center rounded bg-green-400 px-2 text-gray-900'}>
				BETA
			</div>
			<nav className="flex gap-2 border-l-2 border-l-foreground">
				<GameModeBar/>
			</nav>
		</div>
	)
}
