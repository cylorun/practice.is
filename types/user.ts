export type Score = {
	id?: string;
	user_id: string;
	type: string;
	duration_s: number;
	created_at: Date;
	correct_questions: number;
	total_questions: number;
	wrong_questions: number;
}
