import { ProjectProps } from "@/utils/types";
import { File, Task, User } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProjectAvatar } from "../project/project-avatar";
import { ProfileAvatar } from "../profile-avatar";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { file } from "zod";
import Image from "next/image";

interface TaskProps {
	task: Task & {
		assignedTo: User;
		project: ProjectProps;
		attachments: File[];
	}
}

export const TaskDetails = ({ task }: TaskProps) => {
	return (
		<Card>
			<CardHeader className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
				<div className="space-y-2">
					<CardTitle>{task?.title}</CardTitle>
					<div className="flex items-center gap-3">
						<ProjectAvatar name={task?.project.name} />
						<p className="text-base text-muted-foreground">
							{task?.project.name}
						</p>
					</div>
				</div>

				<div className="w-full md:w-auto flex flex-col justify-end items-end gap-3">
					{/* <EditTaskDialog key={new Date().getTime()}
					task={task}
					project={task.project}
					/> */}

					<div className="flex items-center gap-3">
						<span className="text-sm text-muted-foreground">
							Assigned To
						</span>
						<ProfileAvatar
							url={task.assignedTo.image || undefined}
							name={task.assignedTo.name}
						/>
						<span className="text-sm font-medium">
							{task.assignedTo.name}
						</span>
					</div>
				</div>
			</CardHeader>
			<Separator className="my-2" />

			<CardContent className="space-y-6">
				<div>
					<h4>Description</h4>
					<p className="text-muted-foreground">{task.description || "No dscription"}
					</p>
				</div>
				<div>

					<div className="grid grid-cols-1 gap-4">
						<div>
							<p className="text-sm text-muted-foreground">Status</p>
							<Badge variant={task.status}>
								{task.status}
							</Badge>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Due Date</p>
							<p className="font-medium">
								{task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No due date"}
							</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Priority</p>
							<Badge variant={task.priority}>
								{task.priority}
							</Badge>
						</div>
					</div>
				</div>

				<div>
					<h4>Attachments</h4>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{
							task?.attachments.map((file) => (
								<div key={file.id} className="relative group cursor-pointer">
									<Image
										src={file.type === "IMAGE" ? file.url : "/pdf.png"}
										alt={"attachment"}
										width={80}
										height={80}
										className="w-full h-32 object-cover rounded-lg"
									/>

									<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rouned-lg flex items-center justify-center">
										<a href={file.url} target="_blank" rel="noopener noreferrer">
											<span className="text-white text-sm"></span>
										</a>
									</div>
								</div>
							))}
					</div>
					{task.attachments.length === 0 &&
						<div className="text-sm text-muted-foreground flex items-center h-20">
							<p>No attachments found</p>
						</div>}
				</div>
			</CardContent>
		</Card>
	)
}
