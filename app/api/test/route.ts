import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
	try {
		const result = await db.user.findMany();

		return NextResponse.json({
			ok: true,
			message: "Prisma is working!",
			result,
		});
	} catch (err) {


		return NextResponse.json(
			{
				ok: false,
				error: String(err),
			},
			{ status: 500 }
		);
	}
}
