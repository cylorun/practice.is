import { createClient } from "@supabase/supabase-js";
import {Score} from "@/types/user";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
