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
	Mail,
	type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
	modes: (props: LucideProps) => <Dices {...props} />,
	countries: (props: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
			 stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
			 className="lucide lucide-earth">
			<path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/>
			<path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/>
			<path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/>
			<circle cx="12" cy="12" r="10"/>
		</svg>
	),
	general: (props: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
			 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
			 className="lucide lucide-book-text">
			<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
			<path d="M8 11h8"/>
			<path d="M8 7h6"/>
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
	mail: Mail,
	discord: (props: LucideProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width={props.size ? props.size : 24} height={props.size ? props.size : 24} viewBox="0 0 24 24" fill="none"
			 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path
				d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
		</svg>
	)

}
