import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated"

export const getTaskById = async (
	taskId: string,
	workspaceId: string,
	projectId: string
) => {

	const { userId } = await userRequired();

	const isUserMember = await db.workspaceMember.findUnique({
		where: {
			userId_workspaceId: {
				userId,
				workspaceId,
			},
		},
	});

	if (!isUserMember) throw new Error("You are not a member");

	const projectAccess = await db.projectAccess.findUnique({
		where: {
			workspaceMemberId_projectId: {
				workspaceMemberId: isUserMember.id,
				projectId,
			},
		},
	});

	if (!projectAccess) {
		throw new Error("You are not allowed to view this project");
	}

	const [task] = await Promise.all([
		db.task.findUnique({
			where: { id: taskId },
			include: {
				assignedTo: { select: { id: true, name: true, image: true } },
				attachments: { select: { id: true, name: true, url: true } },
				project: {
					include: {
						projectAccess:{
							include: {
								workspaceMember:{
									include:{
										user:{
											select: { id: true, name: true, image: true },
										},
									},
								},
							},
						},
					},
				},
			},
		}),
	]);

	const project = {
		...task?.project,
		members: task?.project.projectAccess.map((access) => access.workspaceMember)
	}


	return {
		task: { ...task, project }
	}
}
