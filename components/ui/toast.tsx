"use client"

import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"

import { cn } from "@/lib/utils"

export function Toast({
	title,
	description,
	open,
	setOpen,
	error = false,
}: {
	title: string
	description?: string
	open: boolean
	setOpen: (state: boolean) => void
	error?: boolean
}) {
	return (
		<ToastPrimitive.Provider swipeDirection="right">
			<ToastPrimitive.Root
				open={open}
				onOpenChange={setOpen}
				className={cn(
					`fixed xs:right-[5rem] xs:top-20 sm:right-5 sm:top-20 flex xs:w-32 sm:w-64 items-center justify-between rounded-lg ${error ? "bg-red-400" : "bg-green-400"} bg-opacity-80 border-2 ${error ? "border-red-700" : "border-green-700"} p-4 text-card`,
					"transition-all duration-300 ease-in-out"
				)}
			>
				<div>
					<ToastPrimitive.Title className="font-semibold text-accent-foreground">
						{title}
					</ToastPrimitive.Title>
					{description && (
						<ToastPrimitive.Description className="text-sm text-foreground">
							{description}
						</ToastPrimitive.Description>
					)}
				</div>
				<ToastPrimitive.Close className="ml-4 cursor-pointer text-gray-200 hover:text-white">
					×
				</ToastPrimitive.Close>
			</ToastPrimitive.Root>
			<ToastPrimitive.Viewport className="fixed bottom-5 right-5 w-auto" />
		</ToastPrimitive.Provider>
	)
}
