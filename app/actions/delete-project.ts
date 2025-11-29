"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId: string) {
	await db.project.delete({
		where: { id: projectId },
	});

	revalidatePath("/workspace");
}
