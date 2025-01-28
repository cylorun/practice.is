import {
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  User,
  Info,
  Github,
  Globe,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: (props: LucideProps) => <SunMedium {...props} />,
  moon: (props: LucideProps) => <Moon {...props} />,
  twitter: (props: LucideProps) => <Twitter {...props} />,
  user: (props: LucideProps) => <User {...props} />,
  info: (props: LucideProps) => <Info {...props} />,
  gitHub: (props: LucideProps) => <Github {...props} />,
  logo: (props: LucideProps) => <Globe {...props} />,
}
