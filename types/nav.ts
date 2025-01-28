import Element = React.JSX.Element;
import {LucideProps} from "lucide-react";

export interface NavItem {
  icon: (props: LucideProps) => Element
  title: string
  href?: string
  disabled?: boolean
  iconSize?: number;
}
