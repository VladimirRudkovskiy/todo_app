import { getWorkspaceProjectsByWorkspaceId } from "@/app/data/projects/get-workspacep-rojects";
import { getUserById } from "@/app/data/user/get-user";
import { $Enums, User } from "@prisma/client";
import { AppSidebar } from "./app-sidebar";
import { ProjectProps, WorkspaceMembersProps, WorkspaceProps } from "@/utils/types";

export interface AppSidebarDataProps extends User {
	id: string,
	name: string,
	createdAt: Date,
	userId: string,
	workspaceId: string,
	accessLevel: $Enums.AccessLevel,
	onboardingCompleted: boolean;
	workspaces: WorkspaceProps[];
	workspace: {
		name: string,
	};
}[];

export const AppSidebarContainer = async ({
	data,
	workspaceId
}: {
	data: AppSidebarDataProps,
	workspaceId: string
}) => {

	// Fetch projects and workspace members for the given workspace
	const { projects, workspaceMembers } = await getWorkspaceProjectsByWorkspaceId(workspaceId);
	const user = await getUserById();

	return (
		<AppSidebar
			data={data}
			projects={projects as unknown as ProjectProps[]}
			workspaceMembers={workspaceMembers as unknown as WorkspaceMembersProps[]}
			user={user as User}

		/>
	)
}
