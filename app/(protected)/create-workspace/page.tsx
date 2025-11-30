import { getUserWorkspaces } from '@/app/data/workspace/get-user-workspaces'
import CreateWorkspaceForm from '@/components/workspace/create-workspace-form'
import { redirect } from 'next/navigation';

const page = async () => {

	const { data } = await getUserWorkspaces();

	// If the user has NOT completed onboarding,
	// immediately redirect them to the onboarding flow.
	if (!data?.onboardingCompleted) redirect("/onboarding")

	return (
		<div>
			<CreateWorkspaceForm />
		</div>
	)
}

export default page
