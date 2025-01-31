import {Loader2} from "lucide-react";


export default function LoadingScreen() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Loader2 className="mr-2 size-16 animate-spin"/>
		</div>
	)
}

