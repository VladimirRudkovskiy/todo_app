import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { NavBar } from "@/components/navbar";
import { AppSidebarContainer } from "@/components/sidebar/app-sidebar-container";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

interface Props {
	children: React.ReactNode;
	params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
	const { data } = await getUserWorkspaces();
	const { workspaceId } = await params;


	// If the user completed onboarding but has no workspaces,
	if (data?.onboardingCompleted && !data?.workspaces) {
		redirect("/create-workspace")
		// redirect them to create their first workspace.
	} else if (!data?.onboardingCompleted) {
		redirect("/onboarding")
	}

	// Determine which workspace is currently active based on the URL.
	const currentWorkspace = data?.workspaces?.find(w => w.workspaceId === workspaceId);

	return (
		<SidebarProvider>
			<div className="w-full flex bg-background h-screen">
				<Sidebar>
					<AppSidebarContainer
						data={data as any}
						workspaceId={workspaceId}
					/>
				</Sidebar>

				<main className="w-full overflow-y-auto min-h-screen">
					<div className="flex items-start">
						<SidebarTrigger className="pt-3" />

						<NavBar
							id={currentWorkspace?.id || ""}
							name={currentWorkspace?.workspaces?.name || ""}
							email={""}
							image={""}
						/>
					</div>

					<div className="p-0 md:p-4 pt-2">
						{children}
					</div>
				</main>
			</div>
		</SidebarProvider>
	)
}

export default WorkspaceIdLayout
