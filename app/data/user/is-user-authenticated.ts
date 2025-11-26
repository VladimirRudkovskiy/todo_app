import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function userRequired() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/api/auth/login");
	}

	return { userId };

	
}
