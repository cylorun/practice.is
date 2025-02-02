"use client"

import React, {useEffect, useState} from "react"

import {supabase} from "@/lib/supabase"
import {redirect} from "next/navigation";
import {Score} from "@/types/user";
import {useAuth} from "@/components/auth-provider";
import LoadingScreen from "@/components/loading-screen";

type UserData = {
	scores: Score[];
	bestScore?: Score;
	successRate: number;
	totalPoints: number;
}

export default function Page() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const {user} = useAuth();

	const fetchUserData = async () => {
		setLoading(true);
		try {
			const {data: scoreData, error: scoresError} = await supabase
				.from("scores")
				.select("*")
				.order("created_at", {ascending: false})

			if (scoresError || !scoreData) {
				throw new Error(scoresError?.message || "Failed to fetch scores");
			}

			const bestScore = scoreData
				.filter((s) => s.correct_questions > 0)
				.reduce((best, current) => {
					if (!best) return current;

					const currentRatio = current.duration_s / current.correct_questions;
					const bestRatio = best.duration_s / best.correct_questions;

					return currentRatio < bestRatio ? current : best;
				}, null);

			const successRate = scoreData
				.reduce((total, current) => {
					return total + current.correct_questions / current.total_questions
				}, 0) / scoreData.length;

			const totalPoints = scoreData
				.reduce((total, curr) => {
					return total + curr.correct_questions;
				}, 0);

			setUserData({
				scores: scoreData.slice(0, 15),
				bestScore: bestScore || null,
				successRate: successRate,
				totalPoints: totalPoints
			});

		} catch (error: any) {
			setError(error.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		setTimeout(() => {
			if (!user) {
				redirect('/login');
				return;
			}

			fetchUserData();
		}, 500);
	}, [])

	if (loading || !userData) {
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
						<p className={''}>Nákvæmni:	{(userData.successRate * 100).toFixed(2)}%</p>
						<p className={''}>Stig samtals: {userData.totalPoints}</p>
					</div>


					{userData.scores.length > 0 ? (
						<section>
							{userData.bestScore && (
								<>
									<h2 className="mb-2 text-xl font-semibold text-muted-foreground">Besti leikur</h2>
									<div
										className="flex items-center justify-between rounded-lg bg-secondary p-4 shadow-md"
									>
										<span
											className="text-lg font-semibold text-accent-foreground">{userData.bestScore.correct_questions} stig</span>
										<span
											className="text-lg font-semibold text-muted-foreground">{userData.bestScore.duration_s}s</span>
										<span
											className="text-lg font-semibold text-muted-foreground">{Math.floor((userData.bestScore.correct_questions / userData.bestScore.total_questions) * 100)}%</span>
										<span
											className="text-sm text-accent-foreground">{new Date(userData.bestScore.created_at).toLocaleString()}</span>
									</div>
								</>
							)}
							<h2 className="mb-2 mt-4 text-xl font-semibold text-muted-foreground">Síðustu leikir</h2>

							<ul className="space-y-3">
								{userData.scores.map((score: Score) => (
									<li
										key={score.id}
										className="flex items-center justify-between rounded-lg bg-accent p-4 shadow-md"
									>
										<span
											className="text-lg font-semibold text-accent-foreground">{score.correct_questions} stig</span>
										<span
											className="text-lg font-semibold text-muted-foreground">{score.duration_s}s</span>
										<span
											className="text-lg font-semibold text-muted-foreground">{Math.floor((score.correct_questions / score.total_questions) * 100)}%</span>
										<span
											className="text-sm text-accent-foreground">{new Date(score.created_at).toLocaleString()}</span>
									</li>
								))}
							</ul>
						</section>
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
