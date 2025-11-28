import { TaskStatus } from "@prisma/client";

export const roleList = [
	"Developer",
	"Designer",
	"Product Manager",
	"Project Manager",
	"QA Engineer",
	"DevOps Engineer",
	"Data Scientist",
	"Marketing Specialist",
	"Sales Representative",
	"Customer Support",
	"Human Resources",
	"Finance",
	"Operations Manager",
	"Business Analyst",
	"Consultant",
	"Entrepreneur",
	"Other",
];

export const industryTypeList = [
	"Technology",
	"Healthcare",
	"Finance",
	"Education",
	"Retail",
	"Manufacturing",
	"Marketing & Advertising",
	"Consulting",
	"Non-Profit",
	"Government",
	"Entertainment",
	"Real Estate",
	"Transportation & Logistics",
	"Hospitality & Tourism",
	"Telecommunications",
	"Other",
];

export const taskStatus = [
	{
		status: TaskStatus.TODO,
		label: "TO DO",
		color: "bg-blue-500"
	},
	{
		status: TaskStatus.IN_PROGRESS,
		label: "IN PROGRESS",
		color: "bg-yellow-500"
	},
	{
		status: TaskStatus.COMPLETED,
		label: "COMPLETED",
		color: "bg-green-500"
	},
]
