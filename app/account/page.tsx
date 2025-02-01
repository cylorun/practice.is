"use client"

import React, { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"
import {redirect} from "next/navigation";
import {Score} from "@/types/user";
import {useAuth} from "@/components/auth-provider";
import LoadingScreen from "@/components/loading-screen";

export default function Page() {
	const [scores, setScores] = useState<Score[]>([]);
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const {user} = useAuth();

	const fetchUserScores = async () => {
		setLoading(true);
		try {
			const { data, error } = await supabase
				.from("scores")
				.select("*")
				.order('created_at', {ascending: false})
				.limit(15);

			if (error || !data) {
				throw new Error(error.message)
			}

			setScores(data);
		} catch (error: any) {
			redirect('/login');
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!user) {
			redirect('/login');
			return;
		}
		fetchUserScores();
	}, [])

	if (loading) {
		return <LoadingScreen/>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div className="mx-auto max-w-2xl rounded-2xl bg-background p-6 shadow-lg shadow-black">
			{user ? (
				<div className="rounded-xl  p-6">
					<div className="mb-6 space-y-3">
						<h1 className="text-2xl font-semibold text-accent">
							 {user.user_metadata.name}
						</h1>
						<p className="text-lg font-semibold text-muted-foreground">
							<span className="text-foreground">Email:</span> {user.email}
						</p>
					</div>

					<h2 className="mb-4 text-xl font-semibold text-muted-foreground">Síðustu leikir</h2>
					{scores.length > 0 ? (
						<ul className="space-y-3">
							{scores.map((score: Score) => (
								<li
									key={score.id}
									className="flex items-center justify-between rounded-lg bg-accent p-4 shadow-md"
								>
									<span
										className="text-lg font-semibold text-accent-foreground">{score.value} stig</span>
									<span
										className="text-lg font-semibold text-muted-foreground">{score.duration_s}s</span>

									<span
										className="text-sm text-accent-foreground">{new Date(score.created_at).toLocaleString()}</span>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500">Þú hefur ekki spilað neina leiki :/</p>
					)}
				</div>
			) : (
				<p className="text-center text-lg font-semibold text-destructive-foreground">User not found</p>
			)}
		</div>
	);

}
