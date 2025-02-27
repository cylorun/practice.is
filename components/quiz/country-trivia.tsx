"use client";

import {ChangeEvent, useEffect, useRef, useState} from "react";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {Toast} from "@/components/ui/toast";

function normalizeSpecialCharacters(input: string): string {
	if (!input) return "";
	return input
		.normalize("NFD") // Decompose special characters into base letters + diacritical marks
		.replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents, tildes, etc.)
		.replace(/ð/g, "d") // Icelandic "eth"
		.replace(/þ/g, "th") // Icelandic "thorn"
		.replace(/ß/g, "ss") // German sharp S
		.replace(/æ/g, "ae") // Nordic "ae"
		.replace(/œ/g, "oe") // French "oe"
		.replace(/ø/g, "o")  // Danish/Norwegian "ø"
		.replace(/ł/g, "l")  // Polish "ł"
		.replace(/đ/g, "d")  // Croatian "đ"
		.replace(/ŋ/g, "ng") // Sami "ŋ"
		.replace(/ç/g, "c")  // French/Portuguese "ç"
		.replace(/Ñ/g, "N")  // Uppercase "Ñ"
		.replace(/ñ/g, "n")  // Lowercase "ñ"
		.replace(/[\u2018\u2019\u201A\u201B]/g, "'") // Single quotes
		.replace(/[\u201C\u201D\u201E\u201F]/g, '"'); // Double quotes
}

function normalizeCountryString(data: any): string {
	return normalizeSpecialCharacters(data).replace(/[-.,_']/g, "").toLowerCase();
}

const CountryTrivia = () => {
	const [countries, setCountries] = useState<{ [key: string]: any }>({});
	const [randomCountry, setRandomCountry] = useState<string>("");
	const [previousCountry, setPreviousCountry] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [guessTimes, setGuessTimes] = useState<number[]>([]);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [averageTime, setAverageTime] = useState<number | null>(null);
	const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
	const [showCountryToast, setShowCountryToast] = useState(false);

	const [capInput, setCapInput] = useState<string>("");
	const [currInput, setCurrInput] = useState<string>("");

	const toastTimeoutRed = useRef<NodeJS.Timeout | null>(null);

	const fetchCountries = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get('/filtered_countries.json');
			if (res.status === 200) {
				const countryData = res.data;
				setCountries(countryData);
				setRandomCountry(
					Object.keys(countryData)[
						Math.floor(Math.random() * Object.keys(countryData).length)
						]
				);
				setStartTime(Date.now());
			}
		} catch (e) {
			console.error("Error fetching data!!\n" + e);
		} finally {
			setIsLoading(false);
		}
	};

	const getCapitalsFixed = (country: any) => {
		return country.capital.map(normalizeCountryString);
	}

	const getCurrenciesFixed = (country: any) => {
		const abbr = Object.keys(country.currencies).map((a) => a.toLowerCase());

		const currFullNames = Object.keys(country.currencies).reduce((prev, curr) => {
			country.currencies[curr].name.split(' ').forEach((t: any) => prev.push(normalizeCountryString(t as any)));
			return prev;
		}, [] as string[]);

		return [...abbr, ...currFullNames];
	}

	const currencyCorrect = (country: any, inp: string) => {
		const countryCurrs = getCurrenciesFixed(country);
		const splitCurrInpt = inp.split(' ');

		return countryCurrs.some((curr) => splitCurrInpt.includes(curr));
	}

	const capitalCorrect = (country: any, inp: string) => {
		const countryCaps = getCapitalsFixed(country);
		return countryCaps.includes(inp);
	}

	useEffect(() => {
		fetchCountries();
	}, []);

	useEffect(() => {
		const country = countries[randomCountry];
		if (!country) return;

		if (capitalCorrect(country, capInput) && currencyCorrect(country, currInput)) {
			const endTime = Date.now();
			const timeTaken = (endTime - startTime!) / 1000;

			setGuessTimes((prev) => {
				const updatedGuessTimes = [...prev, timeTaken];
				const newAverageTime = updatedGuessTimes.reduce((acc, curr) => acc + curr, 0) / updatedGuessTimes.length;
				setAverageTime(newAverageTime);
				return updatedGuessTimes;
			});


			nextCountry();
		}
	}, [capInput, currInput]);

	const getIncompleteInputID = ({capitalVal, currencyVal}: { capitalVal: string; currencyVal: string }) => {
		const country = countries[randomCountry];
		const mapping: { [key: string]: any } = {
			'cap-inp': capitalCorrect(country, capitalVal),
			'curr-inp': currencyCorrect(country, currencyVal),
		};

		for (let id of Object.keys(mapping)) {
			if (!mapping[id]) return id;
		}

		return null;
	}

	const nextCountry = (failed = false) => {
		setPreviousCountry(randomCountry);
		setRandomCountry(
			Object.keys(countries)[
				Math.floor(Math.random() * Object.keys(countries).length)
				]
		);

		if (!failed) {
			setRoundsPlayed((prev) => prev + 1);
		}

		document.getElementById('cap-inp')?.focus();

		setCurrInput("");
		setCapInput("");
		setStartTime(Date.now());
	}

	const handleCapChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCapInput(normalizeCountryString(value));

		const country = countries[randomCountry];
		if (capitalCorrect(country, value)) {
			const id = getIncompleteInputID({currencyVal: currInput, capitalVal: value});
			if (id) {
				document.getElementById(id)?.focus();
			}
		}
	}

	const handleCurrChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCurrInput(normalizeCountryString(value));

		const country = countries[randomCountry];
		if (currencyCorrect(country, value)) {
			const id = getIncompleteInputID({currencyVal: value, capitalVal: capInput});
			if (id) {
				document.getElementById(id)?.focus();
			}
		}
	}

	const onSkip = () => {
		nextCountry(true);

		if (toastTimeoutRed.current) {
			clearTimeout(toastTimeoutRed.current);
		}

		setShowCountryToast(true);

		toastTimeoutRed.current = setTimeout(() => {
			setShowCountryToast(false);
		}, 3000);
	};

	const getCountryCheatString = (name: string) => {
		const country = countries[name];
		if (!country) {
			return "Undefined country"
		}
		const capital = country.capital[0] ?? "None";
		const currencyKey = Object.keys(country.currencies)[0];
		const currency = country.currencies[currencyKey]?.name ?? "None";
		return `Capital: ${capital} | Currency: ${currency}`
	}

	if (isLoading) {
		return (
			<section className="container mx-auto grid max-w-xl items-center justify-center gap-4 pb-8 pt-6 md:py-10">
				<Skeleton variant="rounded" width={200} height={24} />

				<div className="flex flex-col rounded-md p-8 shadow-lg shadow-black">
					<Skeleton variant="rounded" width={80} height={20} className="mb-4" />
					<Skeleton variant="rounded" width={220} height={40} />
					<span className={'mb-4'}></span>
					<Skeleton variant="rounded" width={80} height={20} className="mb-4" />
					<Skeleton variant="rounded" width={220} height={40} />
				</div>

				<Skeleton variant="rounded" width={300} height={40} className="my-4" />

				<Skeleton variant="rounded" width={260} height={24} className={'ml-4'} />
			</section>
		);
	}

	return (
		<section className="container mx-auto grid max-w-2xl items-center justify-center gap-6 pb-8 pt-6 md:py-10">
			<Toast title={"It was"} description={getCountryCheatString(previousCountry)}  open={showCountryToast} setOpen={setShowCountryToast}/>
			<p className="mb-4 text-lg">
				<span className="font-semibold">Land: </span>
				<span className={'text-accent'}>{randomCountry}</span>
			</p>

			<div className="flex flex-col rounded-md p-8 shadow-lg shadow-black">
				<label htmlFor="capital-inp" className="mb-2 text-sm text-gray-300">
					Höfuðborg
				</label>
				<input
					id="cap-inp"
					type="text"
					value={capInput}
					onChange={handleCapChange}
					className={'textinp'}
					placeholder="Sláðu inn höfuðborg..."
					autoFocus={true}
				/>

				<label htmlFor="curr-inp" className="mb-2 text-sm text-gray-300">
					Gjaldmiðill
				</label>
				<input
					id="curr-inp"
					type="text"
					value={currInput}
					onChange={handleCurrChange}
					className={'textinp'}
					placeholder="Sláðu inn gjaldmiðil.."
				/>
			</div>

			<Button
				variant={"default"}
				className="my-2 max-h-12  min-w-28 rounded-md p-2 shadow-md shadow-black"
				onClick={onSkip}
			>
				Næsta
			</Button>

			<p className="text-md text-foreground">
				Meðaltími:{" "}
				<span className="font-semibold text-accent">
					{averageTime ? averageTime.toFixed(2) : "--:--"}
				  </span>
				{" "} sekúndur yfir {roundsPlayed} {roundsPlayed === 1 ? 'leik' : 'leiki'}
			</p>
		</section>
	);

};

export default CountryTrivia;
