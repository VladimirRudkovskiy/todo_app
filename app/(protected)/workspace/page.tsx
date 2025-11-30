import { getUserWorkspaces } from '@/app/data/workspace/get-user-workspaces'
import { redirect } from 'next/navigation';

const page = async () => {
	const { data } = await getUserWorkspaces();

	if (data?.onboardingCompleted && data.workspaces.length === 0) {
		redirect("/create-workspace");
	} else if (!data?.onboardingCompleted) {
		redirect("/onboarding");
	} else {
		redirect(`/workspace/${data.workspaces[0].workspaceId}`);
	}


}

export default page
