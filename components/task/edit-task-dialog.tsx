'use client';

import { useWorkspaceId } from "@/hooks/use-workspace-Id";
import { taskFormSchema } from "@/lib/schema";
import { ProjectProps } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { format } from "date-fns";
import {
	Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../ui/select";
import { Task, TaskPriority, TaskStatus, User } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { taskStatus } from "@/utils";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { createNewTask, updateTask } from "@/app/actions/task";

interface Props {
	project: ProjectProps;
	task: Task & {
		assignedTo: User;
	}
}

export type TaskFormValues = z.infer<typeof taskFormSchema>;

export const EditTaskDialog = ({ task, project }: Props) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const workspaceId = useWorkspaceId();
	const [pending, setPending] = useState(false);

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(taskFormSchema),
		defaultValues: {
			title: task.title || "",
			description: task.description || "",
			status: task.status || "TODO",
			dueDate: task.dueDate || new Date(),
			startDate: task.startDate || new Date(),
			priority: task.priority || "P5",
			attachments: [],
			assigneeId: task.assigneeId || ""
		},
	});

	const handleOnSubmit = async (data: TaskFormValues) => {
		try {
			setPending(true);

			await updateTask(task.id, data, project.id, workspaceId as string)

			toast.success("Task updated successfully")
			router.refresh();
			form.reset();

		} catch (error) {
			console.log(error)
			toast.error("Failed to update task")
		} finally {
			setPending(false)
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"}>
					<PencilIcon />
					Edit Task
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Task</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleOnSubmit)}
						className="space-y-4"
					>
						{/* Task Title */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Task Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter task title" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						{/* ASSIGNEE + PRIORITY */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

							{/* Assignee */}
							<FormField
								control={form.control}
								name="assigneeId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Assignee</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select assignee" />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{Array.isArray(project.members) ? (
													project.members.map((member) => (
														<SelectItem key={member.id} value={member.userId}>
															{member.user?.name}
														</SelectItem>
													))
												) : (
													project.members && (
														<SelectItem value={project.members.userId}>
															{project.members.user?.name}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							{/* Priority */}
							<FormField
								control={form.control}
								name="priority"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Priority</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select priority" />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{Object.values(TaskPriority).map((priority) => (
													<SelectItem key={priority} value={priority}>
														{priority}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="startDate"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Date</FormLabel>
										<Popover modal={true}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date < field.value ||
														date < new Date(new Date().setHours(0, 0, 0, 0))
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="dueDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Due Date</FormLabel>
										<Popover modal={true}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date < field.value ||
														date < new Date(new Date().setHours(0, 0, 0, 0))
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{taskStatus.map((status) => (
												<SelectItem key={status.status} value={status.status}>
													{status.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Add your description"
											{...field}
											rows={4}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="flex justify-end space-x-2">
							<Button type="submit" disabled={pending}>Save Changes</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
