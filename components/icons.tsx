import {
	LucideProps,
	Moon,
	SunMedium,
	Twitter,
	User,
	Info,
	Github,
	Globe,
	Dices,
	PersonStanding,
	type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
	modes: (props: LucideProps) => <Dices {...props} />,
	countries: (props: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
			 stroke="currentColor" stroke-width="3" strokeLinecap="round" strokeLinejoin="round"
			 className="lucide lucide-earth">
			<path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>
			<path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/>
			<path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/>
			<circle cx="12" cy="12" r="10"/>
		</svg>
	),
	people: PersonStanding,
	sun: (props: LucideProps) => <SunMedium {...props} />,
	moon: (props: LucideProps) => <Moon {...props} />,
	twitter: (props: LucideProps) => <Twitter {...props} />,
	user: (props: LucideProps) => <User {...props} />,
	info: (props: LucideProps) => <Info {...props} />,
	gitHub: (props: LucideProps) => <Github {...props} />,
	logo: (props: LucideProps) => <Globe {...props} />,
}
