'use client';

import { ProjectProps, WorkspaceMembersProps } from "@/utils/types";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { CreateProjectForm } from "../project/create-project-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { deleteProject } from "@/app/actions/delete-project";


export const NavProjects = ({
	projects,
	workspaceMembers
}: {
	projects: ProjectProps[];
	workspaceMembers: WorkspaceMembersProps[];
}) => {

	const pathname = usePathname();

	return (
		<SidebarGroup className="group-data-[collapsible-icon]:hidden">
			<SidebarGroupLabel className="flex justify-between">
				<span className="text-sm font-semibold text-muted-foreground uppercase">
					Projects
				</span>
				<CreateProjectForm workspaceMembers={workspaceMembers} />
			</SidebarGroupLabel>

			<SidebarMenu>
				{projects?.map((proj) => {
					const href = `/workspace/${proj.workspaceId}/projects/${proj.id}`;

					return (
						<SidebarMenuItem key={proj.id} className="flex items-center justify-between">
							
							{/* Project Link */}
							<SidebarMenuButton asChild>
								<a
									href={href}
									className={
										pathname === href
											? "text-blue-500 font-semibold"
											: "text-muted-foreground"
									}
								>
									{proj.name}
								</a>
							</SidebarMenuButton>

							{/* Actions Menu (3 dots) */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-6 w-6 p-0 ml-2">
										<EllipsisVertical className="w-4 h-4" />
									</Button>
								</DropdownMenuTrigger>

								<DropdownMenuContent side="right">
									
									{/* Delete Project */}
									<DropdownMenuItem
										className="text-destructive"
										onSelect={async () => {
											if (!confirm(`Delete project "${proj.name}"?`)) return;
											
											try {
												await deleteProject(proj.id);
												window.location.reload();
											} catch (err) {
												console.error(err);
												alert("Failed to delete project.");
											}
										}}
									>
										Delete Project
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
};
