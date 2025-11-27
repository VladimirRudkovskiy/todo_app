export const runtime = "nodejs";

import { userRequired } from "@/app/data/user/is-user-authenticated";
import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import OnboardingForm from "@/components/onboarding-form";
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
	const { userId } = await userRequired();

	const client = await clerkClient();
	const clerkUser = await client.users.getUser(userId);

	const { data } = await getUserWorkspaces();

	if (data?.onboardingCompleted && data?.workspaces.length > 0) {
		redirect("/workspace");
	} else if (data?.onboardingCompleted) {
		redirect("/create-workspace");
	}

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
