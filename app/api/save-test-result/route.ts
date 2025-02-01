import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { testId, score, totalQuestions } = await req.json()

  try {
    const result = await prisma.testResult.create({
      data: {
        userId,
        testId,
        score,
        totalQuestions,
      },
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error saving test result:", error)
    return NextResponse.json({ error: "Failed to save test result" }, { status: 500 })
  }
}

