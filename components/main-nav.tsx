'use client'

import * as React from "react"
import Link from "next/link"

import {siteConfig} from "@/config/site"
import {Icons} from "@/components/icons"
import {buttonVariants} from "@/components/ui/button";
import * as Select from '@radix-ui/react-select';
import {useState} from "react";

export function MainNav() {
	const [isOpen, setIsOpen] = useState(false);

	const handleButtonClick = () => {
		setIsOpen(!isOpen);
	};

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

				{/*Mode button*/}
				<div
					className={buttonVariants({
						size: "icon",
						variant: "ghost",
					})}
					onClick={handleButtonClick}
				>
					<Icons.modes size={22}/>
					<span className="sr-only">About</span>
				</div>

				{isOpen && (
					<Select.Root defaultValue="apple">
						<Select.Trigger className="cursor-pointer">
							<div className="p-2 bg-gray-200 rounded-md">Select an option</div>
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Fruits</Select.Label>
								<Select.Item value="orange">Orange</Select.Item>
								<Select.Item value="apple">Apple</Select.Item>
								<Select.Item value="grape" disabled>
									Grape
								</Select.Item>
							</Select.Group>
							<Select.Separator />
							<Select.Group>
								<Select.Label>Vegetables</Select.Label>
								<Select.Item value="carrot">Carrot</Select.Item>
								<Select.Item value="potato">Potato</Select.Item>
							</Select.Group>
						</Select.Content>
					</Select.Root>
				)}

			</nav>
		</div>
	)
}
