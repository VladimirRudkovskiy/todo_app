import { Card } from "@/components/ui/card";

const WorkspacePage = () => {
	return (
		<div className="flex flex-col gap-6 px-6 py-16 items-center justify-center transition-colors duration-300 max-w-2xl mx-auto w-full">

			{/* Header */}
			<header className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 transition-colors duration-300">
				<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">Welcome to Your Workspace</h1>
				<p className="text-gray-500 dark:text-gray-300 text-center">
					Streamline tasks. Maximize efficiency.
				</p>
			</header>

			{/* Grid layout */}
			<div className="max-w-2xl mx-auto w-full">
				{/* Task Overview */}
				<Card className="bg-white dark:bg-gray-900 transition-colors duration-300">
					<h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
						Overview your task
					</h3>
					<div className="flex flex-col items-center justify-center gap-2 py-4">
						<div className="w-32 h-32 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
							100%
						</div>
						<p className="text-gray-600 dark:text-gray-300">Complete Your Tasks</p>
					</div>
				</Card>

			</div>
			<footer className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 transition-colors duration-300">
				<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">Let’s turn plans into progress</h1>
				<p className="text-gray-500 dark:text-gray-300 text-center">
					Small steps. Big results.
				</p>
			</footer>
		</div>
	);
};

export default WorkspacePage;
