
import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated"

export const getUserWorkspaces = async () => {
	try {
		const { userId } = await userRequired();

		const workspaces = await db.user.findUnique({
			where: {
				id: userId
			},
			include: {
				workspace: {
					select: {
						id: true,
						userId: true,
						workspaceId: true,
						accessLevel: true,
						createdAt: true,
						workspace: {
							select: {
								name: true,
							}
						}
					}
				}
			}
		})
		return {data:workspaces}
	} catch (error) {
	}
}
