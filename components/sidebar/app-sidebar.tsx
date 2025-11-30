
import { User } from "@prisma/client";
import { AppSidebarDataProps } from "./app-sidebar-container"
import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import { Sidebar, SidebarContent, SidebarGroupLabel, SidebarHeader } from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { WorkspaceSelector } from "./workspace-selector";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-project-list";

export const AppSidebar = (
	{ data, // user & workspace related data
		projects,  // list of projects in the current workspace
		workspaceMembers,
	}: {
		data: AppSidebarDataProps;
		projects: ProjectProps[];
		workspaceMembers: WorkspaceMembersProps[]
		user: User; // current logged-in user
	}
) => {
	return (
		<>
			<Sidebar collapsible="icon">
				<SidebarHeader className="bg-background">
					<div className="flex items-center">
						<Avatar>
							<Link href="/workspace">
								<AvatarImage
									src="/logo.png"
									className="cursor-pointer"
								/>
							</Link>
						</Avatar>
						<SidebarGroupLabel>
							<span className="text-xl font-bold">Prioritize</span>
						</SidebarGroupLabel>
					</div>

					<div className="flex justify-between mb-0">
						<SidebarGroupLabel className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
							Workspace
						</SidebarGroupLabel>

						<Button asChild size="icon" className="size-5">
							<Link href="/create-workspace">
								<Plus />
							</Link>
						</Button>
					</div>

					<WorkspaceSelector workspaces={data.workspaces} />
				</SidebarHeader>

				<SidebarContent>
					<NavMain />
					<NavProjects
						projects={projects} workspaceMembers={workspaceMembers}
					/>
				</SidebarContent>
			</Sidebar>
		</>
	)
}
