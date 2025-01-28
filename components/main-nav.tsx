import * as React from "react"
import Link from "next/link"

import {NavItem} from "@/types/nav"
import {siteConfig} from "@/config/site"
import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button";
import {ThemeToggle} from "@/components/theme-toggle";

interface MainNavProps {
	items?: NavItem[]
}

export function MainNav({items}: MainNavProps) {
	return (
		<div className="flex gap-6 md:gap-5">
			<Link href="/" className="flex items-center space-x-2">
				<Icons.logo className="h-8 w-8"/>
				<span className="inline-block font-bold text-xl">{siteConfig.name}</span>
			</Link>
			{items?.length ? (
				<nav className="border-l-2 border-l-foreground flex gap-2">
					{items?.map(
						(item, index) =>
							item.href && (
								<Link
									key={index}
									href={item.href}
									className={cn(
										"flex items-center text-sm font-medium ml-2",
										item.disabled && "cursor-not-allowed opacity-80"
									)}
								>
									<div
										className={buttonVariants({
											size: "icon",
											variant: "ghost",
										})}
									>
										<item.icon size={item.iconSize ? item.iconSize : 24}/>
										<span className="sr-only">{item.title}</span>
									</div>
								</Link>
							)
					)}
				</nav>
			) : null}
		</div>
	)
}
