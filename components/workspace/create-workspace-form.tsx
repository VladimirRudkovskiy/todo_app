'use client'

import { workspaceSchema } from "@/lib/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createNewWorkspace } from "@/app/actions/workspace";
import { useRouter } from "next/navigation";

// Type inferred from Zod schema for workspace creation
export type CreateWorkspaceDataType = z.infer<typeof workspaceSchema>;

export const CreateWorkspaceForm = () => {
	const [pending, setPending] = useState(false);
	const router = useRouter();

	// Initialize react-hook-form with Zod validation
	const form = useForm<CreateWorkspaceDataType>({
		resolver: zodResolver(workspaceSchema),
		defaultValues: {
			name: "",
			description: "",
		}
	});

	const onSubmit = async (data: CreateWorkspaceDataType) => {
		try {
			setPending(true);
			const res = await createNewWorkspace(data); // Call API/action to create workspace

			toast.success("Workspace created successfully");

			router.push(`/workspace/${res.id}`)
		} catch (error) {

			toast.error("Something went wrong")
		}
	}


	return (
		<div className="min-h-screen flex items-center justify-center bg-background">

			<div className="w-full max-w-md">
				<Card className="w-full p-6">
					<CardHeader>
						<CardTitle>Create new Workspace</CardTitle>
						<CardDescription>
							Set up a workspace.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Workspace Name</FormLabel>
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

								<div className="flex justify-between flex-row items-center gap-4">
									<Button type="button" variant={"outline"} disabled={pending}>
										Cancel</Button>
									<Button type="submit" disabled={pending} >Create Workspace
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default CreateWorkspaceForm
