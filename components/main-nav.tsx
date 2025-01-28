import * as React from "react"
import Link from "next/link"

import {siteConfig} from "@/config/site"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Tooltip from "@/components/ui/tooltip";

export function MainNav() {
	return (
		<div className="flex gap-6 md:gap-5">
			<Link href="/" className="flex items-center space-x-2">
				<Icons.logo className="h-8 w-8"/>
				<span className="inline-block font-bold text-xl">{siteConfig.name}</span>
			</Link>
			<nav className="border-l-2 border-l-foreground flex gap-2">
				{/*About button*/}
				<Link
					href={"/about"}
					className={"flex items-center text-sm font-medium ml-2"}
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
				<div className={"border-l-2 border-l-foreground flex gap-2"}>
					<Tooltip direction={'bottom'} text={"Countries"}>
						<div
							className={cn(buttonVariants({
								size: "icon",
								variant: "ghost",
							}), "ml-2")}
						>
							<Icons.countries/>
							<span className="sr-only">Countries</span>
						</div>
					</Tooltip>

					<Tooltip direction={'bottom'} text={"Celebrities"}>
						<div
							className={buttonVariants({
								size: "icon",
								variant: "ghost",
							})}
						>
							<Icons.people/>
							<span className="sr-only">Countries</span>
						</div>
					</Tooltip>
				</div>
			</nav>
		</div>
	)
}
