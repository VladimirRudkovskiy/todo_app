'use client';

import { Bell, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { useClerk } from "@clerk/nextjs";

interface Props {
	id: string;
	name: string;
	email: string;
	image: string;
}

export const NavBar = ({ id, email, name, image }: Props) => {
	const {signOut} = useClerk();

	const handleLogOut = async () => {
		await signOut();

	}
	return (
		<nav className="w-full flex justify-end items-center px-4 py-2">
			<div className="flex items-center gap-2">
				<Button variant={"ghost"}>
					<Bell />
				</Button>

				<ModeToggle />

				<Button variant={"ghost"} onClick={handleLogOut}>
					<LogOut />
				</Button>
			</div>
		</nav>
	);
};
