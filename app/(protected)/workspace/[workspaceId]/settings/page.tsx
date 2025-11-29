import { getWorkspaceById } from '@/app/data/workspace/get-workspace';
import { WorkspaceSettingsForm } from '@/components/workspace/workspace-settings-form';
import React from 'react'

const WorkspaceSettings = async ({ params }: {params: Promise<{workspaceId: string}>}) => {

	const {workspaceId} = await params;

	const {data} = await getWorkspaceById(workspaceId)
	return (
		<div>
			<WorkspaceSettingsForm data={data as any}/>
		</div>
	)
}

export default WorkspaceSettings
