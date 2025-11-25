import { SignInButton, SignUpButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="w-full h-screen flex flex-col">

			<header className="w-full flex justify-end px-6 py-4">
				<SignedOut>
					<div className="flex items-center gap-3">
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

			<main className="flex flex-1 flex-col items-center justify-center">
				<h1 className="text-5xl font-bold text-center">Welcome to Prioritize</h1>
			</main>

		</div>
	);
}
