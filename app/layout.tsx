import "@/styles/globals.css"
import React from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { GameModeProvider } from "@/components/game-mode-provider"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import {AuthProvider} from "@/components/auth-provider";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body
					className={cn(
						"min-h-screen bg-background font-sans antialiased",
						fontSans.variable
					)}
					suppressHydrationWarning
				>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
						<AuthProvider>
							<GameModeProvider>
								<div className="relative flex min-h-screen flex-col">
									<SiteHeader />
									<div className="flex-1">{children}</div>
								</div>
								<TailwindIndicator />
							</GameModeProvider>
						</AuthProvider>
					</ThemeProvider>
				</body>
			</html>
		</>
	)
}
