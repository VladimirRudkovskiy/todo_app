'use server';

import { ProjectDataType } from "@/components/project/create-project-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/schema";
import { success } from "zod";

export const createNewProject = async (data: ProjectDataType) => {
	const { userId } = await userRequired();

	const workspace = await db.workspace.findUnique({
		where: { id: data?.workspaceId },
		include: {
			projects: {
				select: {
					id: true,
				},
			},
		},
	});

	const validatedData = projectSchema.parse(data)

	const workspaceMemberMembers = await db.workspaceMember.findMany({
		where: {
				workspaceId: data.workspaceId,
		},
	});

	const isUserMember = workspaceMemberMembers.some((member) => member.userId === userId)

	if (!isUserMember) {
		throw new Error("Unauthorized")
	}

	if (validatedData.memberAccess.length === 0) {
		validatedData.memberAccess = [userId];
	} else if(!validatedData.memberAccess.includes(userId)){
		validatedData.memberAccess.push(userId);
	}

	await db.project.create({
		data: {
			name: validatedData.name,
			description: validatedData.description || "",
			workspaceId: validatedData.workspaceId,
			projectAccess: {
				create: validatedData.memberAccess?.map((memberId) => ({workspaceMemberId: workspaceMemberMembers.find((member) => member?.userId === memberId)?.id!,
					hasAccess: true,
				})),
			},
			activities: {
				create: {
					type: "PROJECT_CREATED",
					description:`Created Project ${validatedData.name}`,
					userId: userId
				}
			}
		},
	});

	return {success: true}
}
