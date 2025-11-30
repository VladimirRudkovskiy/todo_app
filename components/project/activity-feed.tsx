import { formatDistanceToNow } from "date-fns";
import { ProfileAvatar } from "../profile-avatar";

// Define the shape of a single activity
export interface Activity {
	id: string; // Unique ID for each activity
	type: string; // Type of activity (TASK_CREATED)
	description: string; // Timestamp when activity occurred
	createdAt: Date;
	user: {
		name: string;
		image: string | null;
	};
}

// Props for the activity feed component
interface ActivityFeedProps {
	activities: Activity[];
}

export const ActivitiFeed = ({ activities }: ActivityFeedProps) => {
	return (
		<div className="flex flex-col items-center space-y-4">
			{activities.map((activity) => (
				<div
					key={activity.id}
					className="flex items-center gap-4 w-full max-w-md bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
				>
					<ProfileAvatar
						url={activity.user.image || undefined}
						name={activity.user.name}
						numOfChars={2}
						size="lg"
					/>

					<div className="flex flex-col">
						<p className="text-sm">
							<span className="font-medium">{activity.user.name}</span>{" "}
							{activity.description}
						</p>
						<span className="text-xs text-muted-foreground">
							{formatDistanceToNow(new Date(activity.createdAt), {
								addSuffix: true,
							})}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};
