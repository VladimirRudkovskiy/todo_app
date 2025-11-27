'use client'

import { useWorkspaceId } from "@/hooks/use-workspace-Id"
import { projectSchema } from "@/lib/schema"
import { WorkspaceMembersProps } from "@/utils/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { toast } from "sonner"
import { createNewProject } from "@/app/actions/project"
import { useRouter } from "next/navigation"

interface Props {
	workspaceMembers: WorkspaceMembersProps[]
}

export type ProjectDataType = z.infer<typeof projectSchema>


export const CreateProjectForm = ({ workspaceMembers }: Props) => {
	const workspaceId = useWorkspaceId();
	const [pending, setPending] = useState(false);
	const router = useRouter();
	const form = useForm<ProjectDataType>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			name: "",
			description: "",
			memberAccess: [],
			workspaceId: workspaceId as string,
		}
	});

	const handleSubmit = async (data: ProjectDataType) => {
		try {
			setPending(true)

			await createNewProject(data);

			toast.success("Project Created Successfully")

			router.refresh();
		} catch (error) {
			console.log(error);

			toast.error("Something went wrong");
		} finally {
			setPending(false)
		}
	}
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button size="icon" className="size-5">
						<Plus />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<Card className="w-full p-6">
						<DialogHeader>
							<DialogTitle>Create new Workspace</DialogTitle>
						</DialogHeader>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Project Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter Workspace name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								</div>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Bio</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Workspace Description"
													className="resize-none"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<div>
									<FormField
										control={form.control}
										name="memberAccess"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Project Access</FormLabel>
												<FormDescription className="text-xs text-muted-foreground mb-4">
													Select which workspace members should have access to this project
												</FormDescription>

												<div>
													{
														workspaceMembers?.map((member) => (
															<div
																key={member?.userId}
																className="flex items-center space-x-2">
																<Checkbox
																	id={member.userId}
																	checked={field.value?.includes(member.userId)}
																	onCheckedChange={(checked) => {
																		const currentValue = field.value || [];
																		if (checked) {
																			field.onChange([
																				...currentValue,
																				member.userId,
																			]);
																		} else {
																			field.onChange(
																				currentValue.filter((id) => id !== member.userId)
																			);
																		}
																	}}
																/>
																<label htmlFor={member.userId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer">
																	{member.user.name} <br />
																	{member.accessLevel.toLowerCase()}
																</label>
															</div>
														))
													}
												</div>
											</FormItem>
										)}
									/>
								</div>

								<div className="flex justify-between flex-row items-center gap-4">
									<Button type="button" variant={"outline"} disabled={pending}>
										Cancel</Button>
									<Button type="submit" disabled={pending} >Create Project
									</Button>
								</div>
							</form>
						</Form>
					</Card>
				</DialogContent>
			</Dialog>
		</>
	)
}
