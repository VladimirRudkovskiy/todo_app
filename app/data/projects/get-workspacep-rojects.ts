import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated"
import { AccessLevel, Prisma } from "@prisma/client";

export const getWorkspaceProjectsByWorkspaceId = async (workspaceId: string) => {
	try {
		const { userId } = await userRequired();

		const isUserMember = await db.workspaceMember.findUnique({
			where: {
				userId_workspaceId: {
					userId: userId,
					workspaceId,
				}
			}
		});

		if (!isUserMember) {
			throw new Error(`User is not the member of Workspace`)
		}

		// Build the query for projects:
		// - If user is OWNER, fetch all projects in the workspace
		// - Otherwise, fetch only projects where the user has explicit access
		const query: Prisma.ProjectWhereInput = isUserMember.accessLevel === AccessLevel.OWNER ? { workspaceId } : {
			projectAccess: {
				some: {
					hasAccess: true,
					workspaceMember: { userId, workspaceId }
				}
			}
		};

		// Fetch projects and workspace members in parallel for efficiency
		const [projects, workspaceMembers] = await Promise.all([
			db.project.findMany({
				where: query,
				select: { name: true, id: true, workspaceId: true, description: true }
			}),
			db.workspaceMember.findMany({
				where: { workspaceId },
				include: {
					user: {
						select: { name: true, id: true, image: true }
					},
				},
			})
		]);

		return { projects, workspaceMembers }
	} catch (error) {

		return {
			success: false, error: true, message: "Internal server error"
		}
	}
}
