import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
	const { searchParams, origin } = new URL("https://practice.is/api/auth/callback"); //im really sorry for doing this
	const code = searchParams.get('code')

	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get('next') ?? '/'

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code)
		if (!error) {
			const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
			const isLocalEnv = process.env.NODE_ENV === 'development'
			if (isLocalEnv) {
				return NextResponse.redirect(`${origin}${next}`)
			} else if (forwardedHost) {
				return NextResponse.redirect(`https://${forwardedHost}${next}`)
			} else {
				return NextResponse.redirect(`${origin}${next}`)
			}
		}
	}

	return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
