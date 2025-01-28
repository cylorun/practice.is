import Tooltip from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import * as React from "react";


export function GameModeBar () {
	return (
		<div className={"flex gap-2 border-l-2 border-l-foreground"}>
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
	)
}
