import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const result = await db.user.findMany(); // or any model you have

    return NextResponse.json({
      ok: true,
      message: "Prisma is working!",
      result,
    });
  } catch (err) {
    console.error("Prisma test error:", err);

    return NextResponse.json(
      {
        ok: false,
        error: String(err),
      },
      { status: 500 }
    );
  }
}
