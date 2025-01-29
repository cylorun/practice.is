import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
	lowercase
 	removes leading whitespace
 	replace accented letters with their non-accented version
 	ignore any special symbols (,./=+_ for example)
 */
export function normalizeString(str: string): string {
	return str
		.toLowerCase() // Convert to lowercase
		.trim() // Remove leading/trailing spaces
		.normalize("NFD") // Normalize the string to separate characters from accents
		.replace(/[\u0300-\u036f]/g, "") // Remove all diacritical marks (accents)
		.replace(/[áàâäãåā]/g, "a") // Replace accented 'a' characters
		.replace(/[éèêëē]/g, "e") // Replace accented 'e' characters
		.replace(/[íìîïī]/g, "i") // Replace accented 'i' characters
		.replace(/[óòôöõō]/g, "o") // Replace accented 'o' characters
		.replace(/[úùûüū]/g, "u") // Replace accented 'u' characters
		.replace(/[ýÿ]/g, "y") // Replace accented 'y' characters
		.replace(/[^a-zA-Z0-9áéíóúýöæðþü\s]/g, ""); // Remove special characters except Icelandic letters and spaces
}


/**
 * Returns a number which represents the amount of differing characters between the two strings
 * @param str1
 * @param str2
 */
export function stringDifference (str1: string, str2: string): number {
	const len = Math.max(str1.length, str2.length);
	let diffCount = 0;

	for (let i = 0; i < len; i++) {
		if (str1[i] !== str2[i]) {
			diffCount++;
		}
	}

	return diffCount;
}


/**
 * Returns whether string a is a percentage-th of string b
 * @param a
 * @param b
 * @param percentage
 */
export function stringPercentageMatch (a: string, b: string, percentage: number): boolean  {
	if (percentage < 0 || percentage > 100) {
		throw new Error("Percentage must be between 0 and 100.");
	}

	const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase(); // Remove spaces and normalize case
	const aNormalized = normalize(a);
	const bNormalized = normalize(b);

	let matchingCharacters = 0;
	const bCharMap: Record<string, number> = {};

	for (const char of bNormalized) {
		bCharMap[char] = (bCharMap[char] || 0) + 1;
	}

	for (const char of aNormalized) {
		if (bCharMap[char]) {
			matchingCharacters++;
			bCharMap[char]--;
		}
	}

	const percentageMatch = (matchingCharacters / aNormalized.length) * 100;

	return percentageMatch >= percentage;
};
