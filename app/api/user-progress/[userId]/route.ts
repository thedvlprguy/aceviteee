import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Get user's test results
    const testResults = await prisma.userTestProgress.findMany({
      where: {
        userId: params.userId,
        completed: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5 // Get last 5 tests
    })

    // Calculate stats
    const allTests = await prisma.userTestProgress.findMany({
      where: {
        userId: params.userId,
        completed: true
      }
    })

    const stats = {
      testsTaken: allTests.length,
      averageScore: allTests.length > 0 
        ? Math.round(allTests.reduce((acc, test) => acc + test.score, 0) / allTests.length) 
        : 0,
      studyStreak: calculateStudyStreak(allTests),
      timeSpent: allTests.reduce((acc, test) => acc + test.timeSpent, 0)
    }

    return NextResponse.json({ testResults, stats })
  } catch (error) {
    console.error('Error fetching user progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user progress' },
      { status: 500 }
    )
  }
}

function calculateStudyStreak(tests: any[]): number {
  if (tests.length === 0) return 0

  const dates = tests.map(test => 
    new Date(test.createdAt).toISOString().split('T')[0]
  )
  const uniqueDates = [...new Set(dates)].sort()
  
  let streak = 1
  const today = new Date().toISOString().split('T')[0]
  const lastTestDate = uniqueDates[uniqueDates.length - 1]

  // If no test today, break streak
  if (lastTestDate !== today) return 0

  // Count consecutive days
  for (let i = uniqueDates.length - 1; i > 0; i--) {
    const current = new Date(uniqueDates[i])
    const previous = new Date(uniqueDates[i - 1])
    const diffDays = (current.getTime() - previous.getTime()) / (1000 * 3600 * 24)
    
    if (diffDays === 1) streak++
    else break
  }

  return streak
} 