import { formatDistanceToNow } from "date-fns";
import { ProfileAvatar } from "../profile-avatar";

export interface Activity {
	id: string;
	type: string;
	description: string;
	createdAt: Date;
	user: {
		name: string;
		image: string | null;
	};
}

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
