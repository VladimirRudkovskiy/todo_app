export const runtime = "nodejs";

import { userRequired } from "@/app/data/user/is-user-authenticated";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import OnboardingForm from "@/components/onboarding-form";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
	// Ensures the user is authenticated.
	const { userId } = await userRequired();

	// Initialize Clerk backend client to fetch user details.
	const client = await clerkClient();

	// Fetch detailed user information from Clerk using the authenticated userId.
	const clerkUser = await client.users.getUser(userId);

	// Fetch workspace-related data for the current user.
	const { data } = await getUserWorkspaces();

	// If onboarding is already completed AND the user has at least one workspace,
	// redirect them directly to the main workspace area.
	if (data?.onboardingCompleted && data?.workspaces.length > 0) {
		redirect("/workspace");
		// redirect them to the workspace creation page.
	} else if (data?.onboardingCompleted) {
		redirect("/create-workspace");
	}

	// Construct the user's full name using Clerk data.
	// If first/last name is missing, fallback to an empty string.
	const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`;

	return (
		<div>
			<OnboardingForm
				name={name}
				email={clerkUser.emailAddresses[0].emailAddress}
				image={clerkUser.imageUrl}
			/>
		</div>
	);
};

export default page;
