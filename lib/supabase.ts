import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Score = {
	id?: string;
	user_id: string;
	value: number;
	type: string;
	duration_s: number;
	created_at: Date;
}

export async function uploadScore(score: Score) {
	if (process.env.NODE_ENV !== "production") {
		console.log(`Not uploading score, cause not in prod: ${JSON.stringify(score)}`);
		return {data: null, error: "Not uploading score, cause not in prod"};
	}
	return supabase
		.from("scores")
		.insert({
			...score
		});
}
