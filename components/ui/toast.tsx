"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export function Toast({
						  title,
						  description,
						  open,
						  setOpen,
					  }: {
	title: string;
	description?: string;
	open: boolean;
	setOpen: (state: boolean) => void;
}) {
	return (
		<ToastPrimitive.Provider swipeDirection="right">
			<ToastPrimitive.Root
				open={open}
				onOpenChange={setOpen}
				className={cn(
					"fixed bottom-5 right-5 flex w-80 items-center justify-between rounded-lg bg-gray-900 p-4 text-white shadow-lg",
					"transition-all duration-300 ease-in-out"
				)}
			>
				<div>
					<ToastPrimitive.Title className="font-semibold">{title}</ToastPrimitive.Title>
					{description && (
						<ToastPrimitive.Description className="text-sm text-gray-300">
							{description}
						</ToastPrimitive.Description>
					)}
				</div>
				<ToastPrimitive.Close className="ml-4 cursor-pointer text-gray-400 hover:text-white">
					×
				</ToastPrimitive.Close>
			</ToastPrimitive.Root>
			<ToastPrimitive.Viewport className="fixed bottom-5 right-5 w-auto" />
		</ToastPrimitive.Provider>
	);
}
