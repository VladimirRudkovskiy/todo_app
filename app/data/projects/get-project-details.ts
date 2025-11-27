import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated"
import { TaskStatus } from "@prisma/client";


export const getProjectDetails = async (
	workspaceId: string,
	projectId: string
) => {
	try {
		const { userId } = await userRequired();

		const [isUserMember, totalWorkspaceMembers] = await Promise.all([
			db.workspaceMember.findUnique({
				where: {
					userId_workspaceId: {
						userId,
						workspaceId
					},
				},
			}),
			db.workspaceMember.count({
				where: { workspaceId },
			}),
		]);

		if (!isUserMember) {
			throw new Error("Unauthorized");
		}
		const [project, comments] = await Promise.all([
			db.project.findUnique({
				where: {
					id: projectId,
				},
				include: {
					projectAccess: {
						include: {
							workspaceMember: {
								include: {
									user: {
										select: { name: true, id: true, image: true },
									},
								},
							},
						},
					},
					tasks: {
						include: {
							assignedTo: {
								select: { name: true, image: true },
							},
							project: {
								select: { name: true, id: true },
							},
						},
					},
					activities: {
						include: {
							user: {
								select: { name: true, id: true, image: true },
							},
						},
						orderBy: { createdAt: "desc" },
					},
				},
			}),
			db.comment.findMany({
				where: { projectId },
				include: {
					user: {
						select: { name: true, id: true, image: true },
					},
				},
				orderBy: { createdAt: "desc" },
			}),
		]);

		const tasks = {
			total: project?.tasks.length,

			completed: project?.tasks.filter((task) => task.status === TaskStatus.COMPLETED).length,

			inProgress: project?.tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS).length,

			overdue: project?.tasks.filter((task) => task.status! == TaskStatus.COMPLETED && task.dueDate && new Date(task.dueDate) < new Date()).length,

			items: project?.tasks
		};

		return {
			project: {
				...project,
				members: project?.projectAccess?.map(access => access.workspaceMember),
			},
			tasks,
			activities: project?.activities,
			totalWorkspaceMembers,
			comments,
		};
	} catch (error) {
		console.log(error)

		return {
			success: false,
			error: true,
			message: "Something went wrong"
		}
	}
}
