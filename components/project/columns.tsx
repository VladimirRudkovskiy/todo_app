import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown, EllipsisVertical, Paperclip } from "lucide-react";
import Link from "next/link";
import { ProjectAvatar } from "./project-avatar";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { ProfileAvatar } from "../profile-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DeleteTaskButton } from "../task/delete-task-button";
import { deleteTask } from "@/app/actions/delete-task";
import { toast } from "sonner";

export type TaskTableItem = {
	id: string;
	name: string;
	title: string;
	status: string;
	dueDate: string;
	assignedTo: {
		name: string;
		image?: string;
	};
	project: Project;
};

export const columns: ColumnDef<TaskTableItem>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="select-all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label={`select row`}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'title', header: ({ column }) => (
			<Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
				Task Title <ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => {
			const title = row.getValue("title") as string;
			return (
				<Link href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}>
					<div className="flex items-center gap-2">
						<ProjectAvatar name={title} />

						<span className="text-sm font-medium xl:text-base capitilize">{title}</span>
					</div>
				</Link>
			)
		}
	},

	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return (
				<Badge variant={status as any}>
					{status == "IN_PROGRESS" ? "IN PROGRESS" : status}
				</Badge>
			);
		},
	},

	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => {
			const priority = row.getValue("priority") as string;
			return (
				<Badge variant={"secondary"} className="font-normal">
					{priority}
				</Badge>
			);
		},
	},

	{
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => {
			const createdAt = row.getValue("createdAt") as Date;
			return (
				<div>{format(new Date(createdAt), "MMM dd, yyyy")}</div>
			);
		},
	},

	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => {
			const date = row.getValue("dueDate") as Date;
			return (
				<div>{format(new Date(date), "MMM dd, yyyy")}</div>
			);
		},
	},

	{
		accessorKey: "assignedTo",
		header: "Assigned To",
		cell: ({ row }) => {
			const assignedTo = row.getValue("assignedTo") as {
				name: string;
				image?: string;
			};
			return (
				<div className="flex items-center gap-2">
					<ProfileAvatar
						name={assignedTo?.name || "Unassigned"}
						url={assignedTo?.image}
					/>
					<span>{assignedTo?.name || "Unassigned"}</span>
				</div>
			);
		},
	},

	{
		accessorKey: "attachments",
		header: "Attachments",
		cell: ({ row }) => {
			const attachments = row.getValue("attachments") as string[];
			return (
				<div className="flex items-center gap-2">
					<Paperclip className="w-4 h-4" />
					{attachments.length}
				</div>
			);
		},
	},

	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"ghost"}>
								<EllipsisVertical className="2-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Link
									href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
								>
									View Task
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								Delete Task
								{/* <DeleteTask taskId={row.original.id} /> */}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
];

export const myTasksColumns: ColumnDef<TaskTableItem>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="select-all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label={`select row`}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},

	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant={"ghost"}
					onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
				>
					Task Title
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const title = row.getValue("title") as string;
			return (
				<Link href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}>
					<div className="flex items-center gap-2">
						<ProjectAvatar name={title} />

						<span className="text-sm font-medium xl:text-base capitilize">{title}</span>
					</div>
				</Link>
			)
		}
	},

	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant={"ghost"}
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const status = row.getValue("status") as string;
			return (
				<Badge variant={status as any}>
					{status === "IN_PROGRESS" ? "IN PROGRESS" : status}
				</Badge>
			);
		},
	},

	{
		accessorKey: "priority",
		enableSorting: true,
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Priority <ArrowUpDown />
			</Button>
		),
		sortingFn: (rowA, rowB, columnId) => {
			const getNumber = (value: string) => parseInt(value.replace("P", ""), 10);
			const a = getNumber(rowA.getValue(columnId));
			const b = getNumber(rowB.getValue(columnId));
			return a - b;
		},
		cell: ({ row }) => {
			const priority = row.getValue("priority") as string;
			return <Badge variant="secondary" className="font-normal">{priority}</Badge>;
		},
	},

	{
		accessorKey: "createdAt",
		enableSorting: true,
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				Created At <ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => {
			const createdAt = row.getValue("createdAt") as Date;
			return <div>{format(new Date(createdAt), "MMM dd, yyyy")}</div>;
		},
	},

	{
		accessorKey: "dueDate",
		enableSorting: true,
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				Due Date <ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => {
			const date = row.getValue("dueDate") as Date;
			return <div>{format(new Date(date), "MMM dd, yyyy")}</div>;
		},
	},

	{
		accessorKey: "project",
		header: "Project",
		cell: ({ row }) => {
			const project = row.getValue("project") as {
				name: string;
			};
			return (
				<Link
					href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}`}
				>
					<div className="flex items-center gap-2">
						<ProjectAvatar name={project?.name} />
						<span>{project?.name}</span>
					</div>
				</Link>
			);
		},
	},

	{
		accessorKey: "attachments",
		header: "Attachments",
		cell: ({ row }) => {
			const attachments = row.getValue("attachments") as string[];
			return (
				<div className="flex items-center gap-2">
					<Paperclip className="w-4 h-4" />
					{attachments.length}
				</div>
			);
		},
	},

	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost">
								<EllipsisVertical className="2-4 h-4" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							{/* View Task */}
							<DropdownMenuItem asChild>
								<Link
									href={`/workspace/${row.original.project.workspaceId}/projects/${row.original.project.id}/${row.original.id}`}
								>
									View Task
								</Link>
							</DropdownMenuItem>

							{/* Delete Task */}
							<DropdownMenuItem
								className="text-destructive" // make text red
								onSelect={async () => {
									if (!confirm("Are you sure you want to delete this task?")) return;
									try {
										await deleteTask(row.original.id);
										// toast({ title: "Task deleted" });
										window.location.reload(); // or trigger refetch
									} catch (err) {
										// toast({
										// 	title: "Failed to delete task",
										// 	description: (err as Error).message,
										// 	variant: "destructive",
										// });
									}
								}}
							>
								Delete Task
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];

