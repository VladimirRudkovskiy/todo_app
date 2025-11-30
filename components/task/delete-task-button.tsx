'use client';

import { deleteTask } from "@/app/actions/delete-task";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface DeleteTaskButtonProps {
	taskId: string;
	onDeleted?: () => void;
	className?: string;
	variant?: "ghost" | "destructive" | "default";
}

export const DeleteTaskButton = ({ taskId, onDeleted, className, variant = "ghost" }: DeleteTaskButtonProps) => {
	const handleDelete = async () => {

		// Ask user for confirmation before deletion
		if (!confirm("Are you sure you want to delete this task?")) return;

		try {
			await deleteTask(taskId);
			toast.success("Task deleted");

			// Call onDeleted callback if provided (to update parent state/UI)
			if (onDeleted) onDeleted();
		} catch (err) {
			toast.error((err as Error).message || "Failed to delete task");
		}
	};

	return (
		<Button variant="ghost" onClick={handleDelete}>
			Delete Task
		</Button>
	);
};
