"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
	user: any;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const checkUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (!error && data) {
				setUser(data.user);
			}
		};

		checkUser();

		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user || null);
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

