import { getUserWorkspaces } from '@/app/data/workspace/get-user-workspaces'
import CreateWorkspaceForm from '@/components/workspace/create-workspace-form'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

	const {data} = await getUserWorkspaces();

	if(!data?.onboardingCompleted) redirect("/onboarding")

	return (
		<div>
			<CreateWorkspaceForm />
		</div>
	)
}

export default page
