import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { AppSidebarContainer } from "@/components/sidebar/app-sidebar-container";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

interface Props {
	children: React.ReactNode;
	params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
	const {data} = await getUserWorkspaces();
	const { workspaceId } = await params;


	if(data?.onboardingCompleted && !data?.workspaces) {
		redirect("/create-workspace")
	}	else if(!data?.onboardingCompleted) {
		redirect("/onboarding")
	}
	return (
		<SidebarProvider>
			<div className="w-full flex bg-background h-screen">
				<AppSidebarContainer data={data as any} workspaceId={workspaceId}/>

				<main className="w-full overflow-y-auto min-h-screen">
					<div className="flex items-start">
						<SidebarTrigger className="pt-3"/>

						{/* <NavBar 
						id={data?.id}
						name={data?.name as string}
						email={data.email as string}
						image={data?.image as string}
						/> */}
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
