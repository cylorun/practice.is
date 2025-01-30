"use client"

import React, { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

export default function Page() {
	const [userData, setUserData] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	const fetchUserData = async () => {
		try {
			const { data, error } = await supabase.auth.getUser();
			const scores = await supabase
				.from("scores")
				.select("*");
			console.log(scores);
			console.log(data)
			if (error) {
				throw new Error(error.message)
			}

			setUserData(data.user)
		} catch (error: any) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUserData()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div>
			<h1>Profile</h1>
			{userData ? (
				<div>
					<p>ID: {userData.id}</p>
					<p>Name: {userData.user_metadata.name}</p>
					<p>Email: {userData.email}</p>
				</div>
			) : (
				<p>User not found</p>
			)}
		</div>
	)
}
