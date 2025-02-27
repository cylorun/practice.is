'use client'

import Link from "next/link"

import {buttonVariants} from "@/components/ui/button"
import {Icons} from "@/components/icons"
import {MainNav} from "@/components/main-nav"
import {ThemeToggle} from "@/components/theme-toggle"
import * as React from "react";
import {useAuth} from "@/components/auth-provider";
import {redirect} from "next/navigation";
import Tooltip from "@/components/ui/tooltip";

export function SiteHeader() {
	const {user, logout} = useAuth();

	const onLogoutClick = () => {
		logout();

		redirect('/');
	}
	return (
		<header className="sticky top-0 z-40 w-full bg-background ">
			<div className="container flex h-16 items-center">
				<MainNav/>
				<div className="flex flex-1 items-center justify-end space-x-0 sm:space-x-4">
					<nav className="flex items-center space-x-0">
						<Link
							href={"/account"}
							className={"flex items-center text-sm font-medium"}
						>
							<Tooltip  text={user ? "Þú" : "Innskráning"} direction={"bottom"}>
								<div
									className={buttonVariants({
										size: "icon",
										variant: "ghost",
									})}
								>
									<Icons.user/>
									<span className="sr-only">{"user"}</span>
								</div>
							</Tooltip>
						</Link>
						{user && (
							<Tooltip text={"Útskrá"} direction={"bottom"}>
								<div
									className={buttonVariants({
										size: "icon",
										variant: "ghost",
									})}
									onClick={onLogoutClick}
								>
									<Icons.logout/>
									<span className="sr-only">{"user"}</span>
								</div>
							</Tooltip>
						)}
						<ThemeToggle/>
					</nav>
				</div>
			</div>
		</header>
	)
}
