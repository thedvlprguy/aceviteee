import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { testId, score, answers, timeSpent } = body

    const testProgress = await prisma.userTestProgress.create({
      data: {
        userId,
        testId,
        score,
        answers,
        timeSpent,
        completed: true
      }
    })

    return NextResponse.json(testProgress)
  } catch (error) {
    console.error("Error saving test result:", error)
    return NextResponse.json(
      { error: "Failed to save test result" },
      { status: 500 }
    )
  }
} 