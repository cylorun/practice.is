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
import Script from "next/script"
import { SiteFooter } from "@/components/site-footer"

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

const GA_TRACKING_ID = "G-TL447XBT2L";


export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
			<head>
				<Script
					strategy="afterInteractive"
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<Script
					id="google-analytics"
					strategy="afterInteractive"
				>
					{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${GA_TRACKING_ID}');
				  `}
				</Script>
			</head>
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
							<SiteHeader/>
							<div className="flex-1">{children}</div>
						</div>
						<SiteFooter/>
						<TailwindIndicator/>
					</GameModeProvider>
				</AuthProvider>
			</ThemeProvider>
			</body>
			</html>
		</>
	)
}
