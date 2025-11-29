'use client';

import { useWorkspaceId } from "@/hooks/use-workspace-Id";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { CheckSquare, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";

export const NavMain = () => {

	const workspaceId = useWorkspaceId();
	const {setOpenMobile} = useSidebar();

	const items = [
		{
			label: "Home",
			href: `/workspace/${workspaceId}`,
			icon: LayoutDashboard,
			path: "home"
		},
		{
			label: "My Tasks",
			href: `/workspace/${workspaceId}/my-tasks`,
			icon: CheckSquare,
			path: "my-tasks"
		},
		// {
		// 	label: "Members",
		// 	href: `/workspace/${workspaceId}/members`,
		// 	icon: Users,
		// 	path: "members"
		// },
		{
			label: "Settings",
			href: `/workspace/${workspaceId}/settings`,
			icon: Settings,
			path: "settings"
		}
	]
	return (
		<>
		<SidebarGroup>
			<SidebarGroupLabel>Menu</SidebarGroupLabel>
			<SidebarMenu className="space-y-3">
				{
					items.map(el=> (
						<SidebarMenuItem key={el.label}>
							<SidebarMenuButton asChild tooltip={el.label}
							className="px-2 py-1.5"
							>
								<Link href={el.href} onClick={() => setOpenMobile(false)}>
									<el.icon className="mr-2 h-4 w-4" />
									{el.label}
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))
				}
			</SidebarMenu>
		</SidebarGroup>
		</>
	)
}
