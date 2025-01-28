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
