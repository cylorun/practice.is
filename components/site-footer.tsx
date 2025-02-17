import Tooltip from "@/components/ui/tooltip";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {GameModeBar} from "@/components/gamemode-bar";
import * as React from "react";


export function SiteFooter() {

	return (

		<footer className="flex justify-center border-t-2 border-muted p-4">
			<ul className="flex items-center space-x-3 text-sm font-medium">
				{/* about button */}
				<Link href="/about" className="flex items-center">
					<span>Um Okkur</span>
				</Link>

				{/* floating Separator */}
				<span className="text-3xl">·</span>

				{/* gh repo button */}
				<Link
					target="_blank"
					href="https://github.com/cylorun/practice.is"
					className="flex items-center"
				>
					<span>GitHub</span>
				</Link>
			</ul>
		</footer>

	)
}
