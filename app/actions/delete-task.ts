'use server';

import { db } from "@/lib/db";


export const deleteTask = async (taskId: string) => {

	const task = await db.task.findUnique({
		where: { id: taskId },
		include: {
			project: {
				include: { workspace: true }
			}
		}
	});

	if (!task) throw new Error("Task not found");


	await db.task.delete({ where: { id: taskId } });

	return { success: true };
};
