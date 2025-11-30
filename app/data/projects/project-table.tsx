'use client'

import { DataTable } from "@/components/data-table";
import { columns, myTasksColumns } from "@/components/project/columns";
import { File, Project, Task, User } from "@prisma/client";

// Extend the Task type to include related entities for display in the table
export interface TaskProps extends Task {
	assignedTo: User; // The user assigned to the task
	project: Project; // The project the task belongs to
	attachments: File[]; // Any files attached to the task (uploadthing comes later)
}

// Component to display a list of tasks for a specific project
export const ProjectTable = ({ tasks }: { tasks: TaskProps[] }) => {
	return (
		<DataTable columns={columns} data={tasks as any} />

	)
}

// Component to display tasks specifically assigned to the current user
export const MyTasksTable = ({ tasks }: { tasks: TaskProps[] }) => {
	return (
		<DataTable columns={myTasksColumns} data={tasks as any} />
	)
}
