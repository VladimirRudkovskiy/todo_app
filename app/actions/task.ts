"use server"

import { TaskFormValues } from "@/components/task/create-task-dialog"
import { userRequired } from "../data/user/is-user-authenticated"
import { taskFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { TaskStatus } from "@prisma/client";


export const createNewTask = async (
	data: TaskFormValues,
	projectId: string,
	workspaceId: string
) => {
	const { userId } = await userRequired();

	// Validate the incoming task data against schema to ensure correct types.
	const validatedData = taskFormSchema.parse(data);

	// Check if the user is a member of the workspace before allowing task creation.
	const isUserMember = await db.workspaceMember.findUnique({
		where: {
			userId_workspaceId: {
				userId,
				workspaceId
			},
		},
	});

	if (!isUserMember) {
		throw new Error("Unauthorized")
	}

	// Fetch existing tasks in the project to calculate the new task's position.
	const tasks = await db.task.findMany({
		where: { projectId }
	});

	// Find the last task in the same status and sort by position descending.
	const lastTask = tasks?.filter(task => task.status === data.status).sort((a, b) => b.position = a.position)[0];

	// Determine position for the new task.
	const position = lastTask ? lastTask.position + 1000 : 1000;

	const task = await db.task.create({
		data: {
			title: validatedData.title,
			description: validatedData.description,
			startDate: new Date(validatedData.startDate),
			dueDate: new Date(validatedData.dueDate),
			projectId,
			assigneeId: validatedData.assigneeId,
			status: validatedData.status,
			priority: validatedData.priority,
			position

		},
		include: {
			project: true,
		},
	});

	await db.activity.create({
		data: {
			type: "TASK CREATED",
			description: `created task "${validatedData.title}"`,
			projectId,
			userId,
		},
	});

	return { success: true }
}

export const updatedTaskPosition = async (taskId: string, newPosition: number, status: TaskStatus) => {
	await userRequired();

	const task = await db.task.update({
		where: { id: taskId },
		data: { position: newPosition, status },
	});

	return task
}

export const updateTask = async (
	taskId: string,
	data: TaskFormValues,
	projectId: string,
	workspaceId: string
) => {
	const { userId } = await userRequired();

	// Validate incoming task data.
	const validatedData = taskFormSchema.parse(data);

	const isUserMember = await db.workspaceMember.findUnique({
		where: {
			userId_workspaceId: {
				userId,
				workspaceId
			},
		},
	});

	if (!isUserMember) {
		throw new Error("Unauthorized")
	}

	// Check if the user has access to the project itself.
	const projectAccess = await db.projectAccess.findUnique({
		where: {
			workspaceMemberId_projectId: {
				workspaceMemberId: isUserMember.id,
				projectId,
			},
		},
	});

	if (!projectAccess) {
		throw new Error("You do not have access to this project")
	}

	// Update the task's details in the database.
	const task = await db.task.update({
		where: { id: taskId },
		data: {
			title: validatedData.title,
			description: validatedData.description,
			startDate: new Date(validatedData.startDate),
			dueDate: new Date(validatedData.dueDate),
			...(validatedData.assigneeId && { assigneeId: validatedData.assigneeId }),
			status: validatedData.status,
			priority: validatedData.priority,
		},
	});

	await db.activity.create({
		data: {
			type: "TASK CREATED",
			description: `updated task "${validatedData.title}"`,
			projectId,
			userId,
		},
	});

	return { success: true }
}
