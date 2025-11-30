"use client"

import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";


interface TaskDistributionProps {
	tasks: {
		total: number;
		completed: number;
		inProgress: number;
	};
}

const chartConfig = {
	tasks: {
		label: "Tasks",
	},

	completed: {
		label: "Completed",
		color: "hsl(var(--chart-1))",
	},

	inProgress: {
		label: "in Progress",
	},

	todo: {
		label: "Todo",
	},
} satisfies ChartConfig;

export const TaskDistributionChart = ({ tasks }: TaskDistributionProps) => {
	const data = [
		{ name: "Completed", value: tasks.completed, fill: "#22c55e" },
		{ name: "In Progress", value: tasks.inProgress, fill: "#f59e0b" },
		{ name: "Todo", value: tasks.total - (tasks.completed + tasks.inProgress), fill: "#3b82f6" },
	].filter(item => item?.value > 0); //if any of this list has the value = 0 return latest value

	return (
		<Card className="flex flex-col">
			<CardHeader>
				<CardTitle className="text-lg font-semibold mb-4 text-center">Task Distribution</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>

						<Pie
							data={data}
							dataKey={"value"}
							nameKey={"name"}
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{tasks.total.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Tasks
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="text-center text-sm text-muted-foreground">
				<p className="w-full">Total task count per the project</p>
			</CardFooter>
		</Card>
	);
}
