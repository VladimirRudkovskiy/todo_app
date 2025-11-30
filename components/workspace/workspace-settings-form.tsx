'use client'

import { workspaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Workspace } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CreateWorkspaceDataType } from "./create-workspace-form";
import { toast } from "sonner";
import { deleteWorkspace, resetWorkspaceInviteCode, updateWorkspace } from "@/app/actions/workspace";
import { LinkIcon, RefreshCcw, UserPlus } from "lucide-react";
import { useConfirmation } from "@/hooks/use-delete";
import { ConfirmationDialog } from "../confirmation-dialog";

interface DataProps extends Workspace {
	members: {
		userId: string;
		accessLevel: $Enums.AccessLevel
	}[];
}

export const WorkspaceSettingsForm = ({ data }: { data: DataProps }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [isPending, setIsPending] = React.useState(false);
	const { isOpen, confirm, handleConfirm, handleCancel, confirmationOptions } =
		useConfirmation();
	const [inviteEmail, setInviteEmail] = React.useState("");

	// Initialize react-hook-form with Zod schema and default values
	const form = useForm<CreateWorkspaceDataType>({
		resolver: zodResolver(workspaceSchema),
		defaultValues: {
			name: data.name,
			description: data.description || "",
		},
	});

	// Construct workspace invite link
	const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/workspace.invite/${data.id}/join/${data.inviteCode}`;

	// Handle form submission to update workspace info
	const handleOnSubmit = async (values: CreateWorkspaceDataType) => {
		try {
			setIsPending(true);
			await updateWorkspace(data.id, values);

			toast.success("Workspace has been updated");

			router.refresh();
		} catch (error) {
			if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
				toast.error(
					error instanceof Error
						? error.message
						: "Something went wrong. Please try again."
				);
			}
		} finally {
			setIsLoading(false)
		}
	};

	const handleInvitation = () => {
		setIsLoading(true);
		// Logic to send invitation comes later
	}

	const copyInviteLink = () => {
		navigator.clipboard.writeText(inviteLink);
		toast.success("Link has been copied")
	}

	const handleResetInvite = async () => {
		try {
			setIsPending(true)
			await resetWorkspaceInviteCode(data.id);

			router.refresh()
			toast.success("Invite code reset successfully");
		} catch (error) {
			if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
				toast.error(
					error instanceof Error
						? error.message
						: "Something went wrong"
				);
			}
		} finally {
			setIsPending(false)
		}
	}

	const handleDelete = () => {
		confirm({
			title: "Delete Workspace",
			message: "Are you sure you want to delete workspace? This action can not be undone",
			onConfirm: async () => {
				try {
					setIsPending(true)

					await deleteWorkspace(data.id);
					toast.success("Workspace deleted successfully")
				} catch (error) {

					if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
						toast.error(
							error instanceof Error
								? error.message
								: "Something went wrong"
						)
					}
				} finally {
					setIsPending(false)
				}
			}
		})
	}

	return (
		<div className="p-3 md:p-6 max-w-4xl mx-auto space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Workspace Settings</CardTitle>
					<CardDescription>
						Manage your workspace settings from here.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-5">
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

							<div className="flex justify-between flex-row items-center gap-4 justify-end">
								<Button
									type="submit"
									disabled={isPending}
								>
									Save
								</Button>
							</div>
						</form>
					</FormProvider>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Invite Members</CardTitle>
					<CardDescription>
						Invite people to join your workspace.
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="flex gap-2">
						<Input
							placeholder="Enter email address"
							value={inviteEmail}
							onChange={(e) => setInviteEmail(e.target.value)} />

						<Button
							type="button"
							disabled={isPending}
							onClick={() => handleInvitation()}
						>
							<UserPlus className="mr-2 h-4 w-4" />
							Invite
						</Button>
					</div>

					<div className="space-y-2">
						<Input
							placeholder="Enter email address"
							value={inviteLink}
							readOnly
						/>

						<div className="flex items-center justify-end mt-4 gap-2">
							<Button
								type="button"
								variant={"outline"}
								onClick={() => copyInviteLink()}
							>
								<LinkIcon className="mr-2 h-4 w-4" />
								Copy
							</Button>

							<Button
								type="button"
								variant={"destructive"}
								disabled={isPending}
								onClick={() => handleResetInvite()}
							>
								<RefreshCcw className="mr-2 h-4 w-4" />
								Reset
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-destructive">Danger Zone</CardTitle>
					<CardDescription>
						Delete your workspace.
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6">


					<Button
						type="button"
						variant={"destructive"}
						disabled={isPending}
						className=""
						onClick={handleDelete}
					>
						Delete Workspace
					</Button>
				</CardContent>
			</Card>

			<ConfirmationDialog
				isOpen={isOpen}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
				title={confirmationOptions?.title || ""}
				message={confirmationOptions?.message || ""}
			/>
		</div>
	)
}
