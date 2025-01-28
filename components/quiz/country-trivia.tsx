'use client'

import {useEffect, useState, ChangeEvent} from "react";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@mui/material";

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

function fixDataString(data: any): string {
	return normalizeSpecialCharacters(data).replace(/[-.,_']/g, "").toLowerCase();
}

const INPUT_STYLE = 'w-full max-w-sm p-3 rounded-md bg-accent text-accent-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent mb-4'

const CountryTrivia = () => {
	const [countries, setCountries] = useState<{ [key: string]: any }>({});
	const [randomCountry, setRandomCountry] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [guessTimes, setGuessTimes] = useState<number[]>([]);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [averageTime, setAverageTime] = useState<number | null>(null);
	const [roundsPlayed, setRoundsPlayed] = useState<number>(0);

	const [capInput, setCapInput] = useState<string>("");
	const [currInput, setCurrInput] = useState<string>("");

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
		return country.capital.map(fixDataString);
	}

	const getCurrenciesFixed = (country: any) => {
		const abbr = Object.keys(country.currencies).map((a) => a.toLowerCase());

		const currFullNames = Object.keys(country.currencies).reduce((prev, curr) => {
			country.currencies[curr].name.split(' ').forEach((t: any) => prev.push(fixDataString(t as any)));
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
			setGuessTimes((prev) => [...prev, timeTaken]);
			setAverageTime((prevState: number | null) => {
				const prevTimes = prevState ?? 0;
				const newAverage = (prevTimes + timeTaken) / (guessTimes.length + 1);
				return newAverage;
			});

			nextCountry();
		}
	}, [capInput, currInput]);

	const getIncompleteInputID = ({capVal, currVal}: { capVal: string; currVal: string }) => {
		const country = countries[randomCountry];
		const mapping: { [key: string]: any } = {
			'cap-inp': capitalCorrect(country, capVal),
			'curr-inp': currencyCorrect(country, currVal),
		};

		for (let id of Object.keys(mapping)) {
			if (!mapping[id]) return id;
		}

		return null;
	}

	const nextCountry = (failed = false) => {
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
		setCapInput(fixDataString(value));

		const country = countries[randomCountry];
		if (capitalCorrect(country, value)) {
			const id = getIncompleteInputID({currVal: currInput, capVal: value});
			if (id) {
				document.getElementById(id)?.focus();
			}
		}
	}

	const handleCurrChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCurrInput(fixDataString(value));

		const country = countries[randomCountry];
		if (currencyCorrect(country, value)) {
			const id = getIncompleteInputID({currVal: value, capVal: capInput});
			if (id) {
				document.getElementById(id)?.focus();
			}
		}
	}

	const onSkip = () => {
		nextCountry(true);
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
			<p className="mb-4 text-lg">
				<span className="font-semibold">Country: </span>
				<span className={'text-accent'}>{randomCountry}</span>
			</p>

			<div className="flex flex-col rounded-md p-8 shadow-lg shadow-black">
				<label htmlFor="capital-inp" className="mb-2 text-sm text-gray-300">
					Capital
				</label>
				<input
					id="cap-inp"
					type="text"
					value={capInput}
					onChange={handleCapChange}
					className={INPUT_STYLE}
					placeholder="Enter capital..."
					autoFocus={true}
				/>

				<label htmlFor="curr-inp" className="mb-2 text-sm text-gray-300">
					Currency
				</label>
				<input
					id="curr-inp"
					type="text"
					value={currInput}
					onChange={handleCurrChange}
					className={INPUT_STYLE}
					placeholder="Enter currency."
				/>
			</div>

			<Button
				variant={"default"}
				className="my-2 max-h-12  min-w-28 rounded-md p-2 shadow-md shadow-black"
				onClick={onSkip}
			>
				Skip
			</Button>

			<p className="text-md text-gray-300">
				Average Time:{" "}
				<span className="font-semibold text-blue-400">
        {averageTime ? averageTime.toFixed(2) : "-"}
      </span>
				{" "}seconds in {roundsPlayed} {roundsPlayed === 1 ? 'round' : 'rounds'}
			</p>
		</section>
	);

};

export default CountryTrivia;
