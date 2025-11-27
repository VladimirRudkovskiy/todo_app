'use server';

import { UserDataType } from "@/components/onboarding-form";
import { userRequired } from "../data/user/is-user-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
	const { userId } = await userRequired();

	const validatedData = userSchema.parse(data);

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
			// subscription:{
			// 	create:{
			// 		plan: "FREE",
			// 		status: "ACTIVE",
			// 		currentPeriodEnd: new Date(),
			// 		cancelAtPeriodEnd: false
			// 	},
			// },
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
