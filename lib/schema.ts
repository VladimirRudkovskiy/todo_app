import z from "zod";

export const userSchema = z.object({
	name:z
	.string()
	.min(2, "Name must be at least 2 characters long")
	.max(100, "Maximum is 100 characters"),
	about:z.string().optional(),
	country:z.string().min(2, "Country is ruquired"),
	industryType:z.string().min(2, "Industry Type is required"),
	email: z.string().email({ message: "Invalid email address" }),
	role:z.string().min(1, "Role is required"),
	image:z.string().optional(),
});

export const workspaceSchema = z.object({
	name:z.string().min(2, "Name is Required").max(100, "Maximum is 100 characters"),
	description:z.string().optional(),
})

export const projectSchema = z.object({
	name: z.string().min(3, {message: "Workspace name must ne at least 3 characters"}),
	workspaceId: z.string(),
	description: z.string().optional(),
	memberAccess: z.array(z.string().optional())
});
