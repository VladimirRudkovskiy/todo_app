import z from "zod";

export const userSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters long")
		.max(100, "Maximum is 100 characters"),
	about: z.string().optional(),
	country: z.string().min(2, "Country is ruquired"),
	industryType: z.string().min(2, "Industry Type is required"),
	email: z.string().email({ message: "Invalid email address" }),
	role: z.string().min(1, "Role is required"),
	image: z.string().optional(),
});

export const workspaceSchema = z.object({
	name: z.string().min(2, "Name is Required").max(100, "Maximum is 100 characters"),
	description: z.string().optional(),
})

export const projectSchema = z.object({
	name: z.string().min(3, { message: "Workspace name must ne at least 3 characters" }),
	workspaceId: z.string(),
	description: z.string().optional(),
	memberAccess: z.array(z.string().optional())
});

export const taskFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	assigneeId: z.string().optional(),
	status: z.enum([
		"TODO",
		"IN_PROGRESS",
		"COMPLETED",
	]),
	dueDate: z.date(),
	startDate: z.date(),
	priority: z.enum(["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10",]),
	attachments: z.array(
		z.object({
			name: z.string(),
			url: z.string(),
			typ: z.enum(["IMAGE", "PDF"]),
		})
	)
		.optional(),
});
