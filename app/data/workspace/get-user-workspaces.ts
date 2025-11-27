import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated";

export const getUserWorkspaces = async () => {
	try {
		const { userId } = await userRequired();

		const user = await db.user.findUnique({
			where: { id: userId },
			select: {
				onboardingCompleted: true,
				workspaces: {
					select: {
						id: true,
						userId: true,
						workspaceId: true,
						accessLevel: true,
						createdAt: true,
						workspaces: {
							select: {
								name: true,
							}
						}
					}
				}
			}
		});

		return {
			data: {
				onboardingCompleted: user?.onboardingCompleted ?? false,
				workspaces: user?.workspaces ?? []
			}
		};
	} catch (error) {
		return { data: null };
	}
};
