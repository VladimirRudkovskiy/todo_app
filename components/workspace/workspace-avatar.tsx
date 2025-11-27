import { Avatar, AvatarFallback } from "../ui/avatar"

export const WorkspaceAvatar = ({ name }: { name: string }) => {
	return (
		<Avatar className="size-6 2xl:size-8 rounded-md items-center">
			<AvatarFallback className="w-full h-full bg-blue-600 text-base text-white rounded-md">
				{name?.charAt(0)}
			</AvatarFallback>
		</Avatar>
	)
}
