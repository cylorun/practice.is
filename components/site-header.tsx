import Link from "next/link"

import {siteConfig} from "@/config/site"
import {buttonVariants} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {MainNav} from "@/components/main-nav"
import {ThemeToggle} from "@/components/theme-toggle"
import {cn} from "@/lib/utils";
import * as React from "react";

export function SiteHeader() {
	return (
		<header className="bg-background sticky top-0 z-40 w-full ">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav items={siteConfig.mainNav}/>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						<Link
							href={"/profile"}
							className={"flex items-center text-sm font-medium"}
						>
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.user/>
								<span className="sr-only">{"profile"}</span>
							</div>
						</Link>
						<ThemeToggle/>
					</nav>
				</div>
			</div>
		</header>
	)
}
