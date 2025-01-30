'use client'
import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const googleLogin = async () => {
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: { redirectTo: `${window.location.origin}/auth/callback` }
		});
		setLoading(false);
		if (error) setError(error.message);
	};

	const passwordLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		setLoading(false);
		if (error) setError(error.message);
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-sm p-6 shadow-lg shadow-black">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-semibold">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={passwordLogin} className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm text-muted-foreground">Email</label>
							<input className={'textinp'} id="email" name="email" type="email" placeholder="Enter your email" required />
						</div>
						<div>
							<label htmlFor="password" className="block text-sm text-muted-foreground">Password</label>
							<input className={'textinp'} id="password" name="password" type="password" placeholder="Enter your password" required />
						</div>
						{error && <p className="text-sm text-destructive">{error}</p>}
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Login"}
						</Button>
					</form>
					<div className="mt-6 text-center text-sm">or</div>
					<Button onClick={googleLogin} variant="secondary" className="mt-4 w-full" disabled={loading}>
						{loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Login with Google"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
