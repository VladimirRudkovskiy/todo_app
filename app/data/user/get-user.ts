import { db } from "@/lib/db";
import { userRequired } from "./is-user-authenticated"

export const getUserById = async () => {
	try {
		const { userId } = await userRequired();

		const data = await db.user.findUnique({
			where: { id: userId }
		});

		return data;
	} catch (error) {

		return {
			success: false,
			error: true,
			message: "Failed to get User",
			status: 500
		};
	}
};
