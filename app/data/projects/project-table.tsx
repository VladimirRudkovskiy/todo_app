'use client'

import { DataTable } from "@/components/data-table";
import { columns, myTasksColumns } from "@/components/project/columns";
import { File, Project, Task, User } from "@prisma/client";

export interface TaskProps extends Task {
	assignedTo: User;
	project: Project;
	attachments: File[];
}

export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => {
	return (
		<DataTable columns={columns} data={tasks as any} />

	)
}

export const MyTasksTable = ({ tasks }: { tasks: TaskProps[] }) => {
	return (
		<DataTable columns={myTasksColumns} data={tasks as any} />
	)
}
