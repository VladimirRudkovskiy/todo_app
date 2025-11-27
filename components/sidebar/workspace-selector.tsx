'use client';

import { useWorkspaceId } from "@/hooks/use-workspace-Id";
import { WorkspaceProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";
import { Check, ChevronsUpDown } from "lucide-react";

export const WorkspaceSelector = ({
	workspaces
}: {
	workspaces: WorkspaceProps[]
}) => {

	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceProps | undefined>(undefined);

	const onSelect = (id: string) => {
		setSelectedWorkspace(
			workspaces.find((workspace) => workspace.workspaceId === id)
		)
		router.push(`/workspace/${id}`)
	};

	useEffect(() => {
		if (workspaceId && workspaces) {
			setSelectedWorkspace(
				workspaces.find((workspace) => workspace.workspaceId === workspaceId)
			);
		}
	}, [workspaceId, workspaces]);

	return <>
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<WorkspaceAvatar name={selectedWorkspace?.workspace?.name ?? "W"} />

							<div className="font-semibold text-muted-foreground">
								{selectedWorkspace?.workspace?.name}
							</div>

							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width]">
						{
							workspaces?.map(workspace => (
								<DropdownMenuItem key={workspace.id} onSelect={() => onSelect(workspace.workspaceId)}>
									<div className="flex flex-row items-center gap-2">
										<WorkspaceAvatar
											name={selectedWorkspace?.workspace?.name ?? "W"} />
										<p>{selectedWorkspace?.workspace?.name}</p>
									</div>
									{workspace.workspaceId === workspaceId && (
										<Check className="ml-auto" />
									)}
								</DropdownMenuItem>
							))
						}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	</>
}
