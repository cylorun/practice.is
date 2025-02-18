import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

const Page = () => {
	return (
		<div className="flex h-screen flex-col items-center justify-center p-6">
			<div className="max-w-3xl text-center">
				<h1 className="mb-6 text-4xl font-bold text-accent">Um Practice.is</h1>
				<p className="mb-6 text-lg text-foreground">
					Practice.is er síða til að æfa þig í allskonar hlutum. Síðan var gerð
					sérstæklega til að æfa sig fyrir getu keppnir eins og Gettu Betur.
				</p>

				<div className="mt-6">
					<a href="/" className={cn(buttonVariants({ variant: "secondary" }))}>
						Byrja æfingar
					</a>
				</div>
			</div>

			<div className="mt-12 max-w-3xl text-center">
				<h2 className="mb-6 text-3xl font-semibold text-accent">
					Hafðu samband
				</h2>

				<div className="space-y-6 text-lg text-foreground">
					<p>
						Hægt er að hafa samband við mig ef þú hefur spurningar eða
						athugasemdir.
					</p>

					<div className="space-y-4">
						<div className="flex items-center justify-center space-x-2">
							<Icons.mail />
							<a
								href="mailto:alfgrimurdavid@gmail.com"
								className={cn(buttonVariants({ variant: "link" }))}
							>
								alfgrimurdavid@gmail.com
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
