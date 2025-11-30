import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";


export default async function Home() {
	const { userId } = await auth();
	const isLoggedIn = !!userId;

	return (

		<div className="w-full h-screen relative overflow-hidden flex flex-col">
			<video
				className="absolute top-0 left-0 w-full h-full object-cover z-0"
				autoPlay
				loop
				muted
				playsInline
			>
				<source src="/background.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<header className="w-full flex justify-end px-6 py-4 ">
				<SignedOut>
					<div className="flex items-center gap-3 z-10">
						<SignInButton mode="modal">
							<button className="px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 text-sm font-medium transition-all hover:bg-neutral-200 active:scale-95">
								Log In
							</button>
						</SignInButton>

						<SignUpButton mode="modal">
							<button className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium transition-all hover:bg-neutral-800 active:scale-95">
								Sign Up
							</button>
						</SignUpButton>
					</div>
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</header>

			<main className="flex flex-1 flex-col items-center justify-center z-10">
				<div className="max-w-7xl mx-auto">
					<div className="text-center">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
							<p>Your personal workspace</p>
							<p className="text-5xl md:text-6xl">
								for <span className="text-blue-400 drop-shadow-md">better productivity</span>
							</p>
						</h1>

						<p className="mt-6 text-base lg:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-sm">
							Organize your projects, tasks and goals in one place. Stay focused and achieve more with your personal command center.
						</p>

						<div className="flex items-center justify-center gap-4 mt-6">
							{isLoggedIn ? (
								<Button asChild>
									<Link href="/workspace">Go to Workspace</Link>
								</Button>
							) : null}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
