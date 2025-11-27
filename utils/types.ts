import { $Enums, AccessLevel, Workspace, WorkspaceMember } from "@prisma/client";

export interface WorkspaceMembersProps extends WorkspaceMember {
	user: {
		id: string;
		name: string,
		email: string,
		image?: string
	};
	projectAccess: {
		id: string,
		hasAccess: boolean,
		projectId: string,
	}[];
}

export interface ProjectProps {
	id: string,
	name: string,
	description?: string | null,
	workspaceId: string,
	members: {
		id: string,
		userId: string,
		workspaceId: string,
		accessLevel: AccessLevel,
		createdAt: Date,
		user: {
			id: string,
			name: string,
			email: string,
			image: string;
		};
	};
}[];

export interface WorkspaceProps {
	id: string,
	createdAt: Date,
	userId: string,
	workspaceId: string,
	accessLevel: $Enums.AccessLevel;
	workspace: {
		name: string
	};
}
