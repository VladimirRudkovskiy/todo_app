'use server';

import { UserDataType } from "@/components/onboarding-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
	const { userId } = await userRequired();

	// Validate incoming user data against the schema to ensure correct format and types.
	const validatedData = userSchema.parse(data);

	// Create a new user record in the database with validated data.
	const userData = await db.user.create({
		data: {
			id: userId,
			name: validatedData.name,
			email: validatedData.email,
			industryType: validatedData.industryType,
			role: validatedData.role,
			about: validatedData.about,
			onboardingCompleted: true,
			image: validatedData.image || "",
		},

		select: {
			id: true,
			name: true,
			email: true,
			workspaces: {
				include: { workspaces: true }
			},
		}
	});

	if (userData.workspaces.length === 0) {
		redirect("/create-workspace");
	}

	redirect("/workspace");

};
