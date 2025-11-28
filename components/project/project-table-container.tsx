import { getProjectById } from "@/app/data/projects/get-project-id";
import { ProjectTable } from "@/app/data/projects/project-table";

export const ProjectTableContainer = async ({
	projectId
}: {
	projectId: string
}) => {

	const {tasks} = await getProjectById(projectId);
	return (
		<div className="p-0">
			<ProjectTable tasks={tasks as any}>

			</ProjectTable>
		</div>
	);
};
