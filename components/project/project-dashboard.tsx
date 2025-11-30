import { CommentProps, ProjectProps } from "@/utils/types"
import { Activity, Task } from "@prisma/client";
import { ProjectHeader } from "./project-header";
import { Card } from "../ui/card";
import { TaskDistributionChart } from "./task-distr-chart";
import { ActivitiFeed } from "./activity-feed";

interface ProjectDashboardProps {
	project: ProjectProps;
	tasks: {
		completed: number;
		inProgress: number;
		total: number;
		items: Task[];
	};
	activities?: Activity[];
	totalWorkspaceMembers: number;

}

export const ProjectDashboard = ({
	project,
	tasks,
	activities = [],
}: ProjectDashboardProps) => {
	return (
		<>
			<div className="flex flex-col gap-6 px-2 md:px-4 2xl:px-6 py-0">
				<ProjectHeader
					project={project as ProjectProps}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
					<TaskDistributionChart tasks={tasks} />

					<Card>
						<h3 className="text-lg font-semibold mb-4 text-center">Recent activities</h3>
						<ActivitiFeed activities={activities.slice(0, 5) as any} />
					</Card>
				</div>
			</div>
		</>
	)
}
