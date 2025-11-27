"use server";

import { CreateWorkspaceDataType } from "@/components/workspace/create-workspace-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { workspaceSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { generateInviteCode } from "@/utils/get-invite-code";
import { Workspace } from "@prisma/client";

export const createNewWorkspace = async (data: CreateWorkspaceDataType): Promise<Workspace> => {
	try {
		const {userId} = await userRequired();

		const validatedData = workspaceSchema.parse(data)

		const res = await db.workspace.create({
			data: {
				name: validatedData.name,
				description: validatedData.description,
				ownerId: userId,
				inviteCode: generateInviteCode(),
				members: {
					create: {
						userId: userId,
						accessLevel: "OWNER",
					},
				},
			},
		});

		return res;
	} catch (error) {
		console.log(error)
		throw new Error("An error occured while creating the workspace");
	}
}
