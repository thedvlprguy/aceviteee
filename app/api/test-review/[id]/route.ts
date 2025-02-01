import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const testResult = await prisma.testResult.findUnique({
      where: {
        id: params.id,
        userEmail: session.user.email
      },
      include: {
        questions: true
      }
    })

    if (!testResult) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    return NextResponse.json(testResult)
  } catch (error) {
    console.error('Error fetching test review:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 