'use client'
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();
	const { id } = router.query;
	const [userData, setUserData] = useState<any>(null); // Store user data
	const [loading, setLoading] = useState<boolean>(true); // Track loading state
	const [error, setError] = useState<string | null>(null); // Track error state

	// Fetch user data from Supabase
	const fetchUserData = async (userId: string) => {
		try {
			const { data, error } = await supabase
				.from('users')
				.select('*') // Fetch all user fields (you can modify this)
				.eq('id', userId)
				.single(); // Since we expect only one user

			if (error) {
				throw new Error(error.message);
			}

			setUserData(data); // Store user data
		} catch (error) {
			setError(error.message); // Set error if any
		} finally {
			setLoading(false); // Set loading to false after data fetch is complete
		}
	};

	// Trigger fetch when `id` is available
	useEffect(() => {
		if (id) {
			fetchUserData(id as string); // Make sure `id` is a string before passing it
		}
	}, [id]); // Depend on `id`, so fetch when it changes

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1>Profile</h1>
			{userData ? (
				<div>
					<p>ID: {userData.id}</p>
					<p>Name: {userData.name}</p>
					<p>Email: {userData.email}</p>
					{/* Render other user data as needed */}
				</div>
			) : (
				<p>User not found</p>
			)}
		</div>
	);
}
