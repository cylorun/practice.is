import {Icons} from "@/components/icons";

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Practice",
  description:
    "Æfingar fyrir quiz",
  mainNav: [
    {
      icon: Icons.info,
      href: "/about",
      title: "About",
      iconSize: 22
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
