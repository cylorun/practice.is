"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"

import { supabase } from "@/lib/supabase"
import Login from "@/components/login"
import {useAuth} from "@/components/auth-provider";

export default function Page() {
	const {user} = useAuth();

	if (user) {
		redirect('/account');
	}

	return <div>{!user ? <Login /> : null}</div>
}
