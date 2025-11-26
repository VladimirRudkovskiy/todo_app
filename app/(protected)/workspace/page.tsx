import { getUserWorkspaces } from '@/app/data/workspace/get-user-workspaces'
import { redirect } from 'next/navigation';

const page = async () => {
	const result = await getUserWorkspaces();
	const data = result?.data;

	if(!data) return null

	if(data.onboardingCompleted && data?.workspace.length === 0) {
		redirect("/create-workspace")
	} else if (!data.onboardingCompleted){
		redirect("/onboarding")
	} else {
		redirect(`/workspace/${data.workspace[0].workspaceId}`)
	}


}

export default page
