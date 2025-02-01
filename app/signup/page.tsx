'use client';
import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Signup() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const onRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const reppassword = formData.get('reppassword') as string;

		if (password !== reppassword) {
			setError("Passwords do not match.");
			setLoading(false);
			return;
		}

		const { error } = await supabase.auth.signUp({ email, password });
		setLoading(false);
		if (error) {
			setError(error.message);
		} else {
			setSuccess("Registration successful! Check your email to verify your account.");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-sm p-6 shadow-xl rounded-lg">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={onRegister} className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium pb-1">Email</label>
							<input className="p-2 textinp" id="email" name="email" type="email" placeholder="Enter your email" required />
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium pb-1">Password</label>
							<input className="p-2 textinp" id="password" name="password" type="password" placeholder="Enter your password" required />
						</div>
						<div>
							<label htmlFor="reppassword" className="block text-sm font-medium pb-1">Repeat Password</label>
							<input className="p-2 textinp" id="reppassword" name="reppassword" type="password" placeholder="Repeat password" required />
						</div>
						{error && <p className="text-sm text-red-600">{error}</p>}
						{success && <p className="text-sm text-green-600">{success}</p>}
						<Button type="submit" className="w-full flex justify-center items-center" disabled={loading}>
							{loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Sign Up"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
