import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				OWNER: "bg-pink-600 text-white",
				MEMBER: "bg-blue-600 text-white",
				VIEWER: "bg-gray-600 text-white",
				TODO: "bg-blue-600 text-white",
				IN_PROGRESS: "bg-yellow-600 text-white",
				COMPLETED: "bg-green-600 text-white",
				
				P1: "bg-blue-200 text-blue-800",   // Low
				P2: "bg-blue-300 text-blue-900",   // Low
				P3: "bg-blue-400 text-blue-950",   // Low
				P4: "bg-yellow-200 text-yellow-800", // Medium
				P5: "bg-yellow-300 text-yellow-900", // Medium
				P6: "bg-orange-400 text-orange-900", // High
				P7: "bg-orange-500 text-orange-950", // High
				P8: "bg-red-400 text-red-900",     // Critical
				P9: "bg-red-500 text-red-950",     // Critical
				P10: "bg-red-600 text-white",      // Critical
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span"

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
