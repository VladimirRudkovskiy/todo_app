"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId: string) {
	// Delete the project record from the database using its unique ID.
	// If the ID does not exist, Prisma will throw an error.
	await db.project.delete({
		where: { id: projectId },
	});

	revalidatePath("/workspace");
}
