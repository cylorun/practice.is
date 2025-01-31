"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"

import { supabase } from "@/lib/supabase"
import Login from "@/components/login"

export default function Page() {
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const checkUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (data && !error) {
				setLoggedIn(true);
				redirect("/account");
			} else {
				setLoggedIn(false);
			}
			setLoading(false);
		}

		checkUser();
	}, []);

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="mr-2 size-16 animate-spin" />
			</div>
		)
	}

	return <div>{!loggedIn ? <Login /> : null}</div>
}
