'use server';

import { db } from "@/lib/db";
import { userRequired } from "../data/user/is-user-authenticated";


export const deleteTask = async (taskId: string) => {
	const { userId } = await userRequired();

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
