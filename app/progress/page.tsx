import { auth } from "@clerk/nextjs"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProgressPage() {
  const { userId } = auth()
  if (!userId) {
    return <div>Please sign in to view your progress.</div>
  }

  const testResults = await prisma.testResult.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })

  const totalTests = testResults.length
  const averageScore =
    totalTests > 0 ? testResults.reduce((acc, result) => acc + result.score / result.totalQuestions, 0) / totalTests : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Your Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Tests Taken</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalTests}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{(averageScore * 100).toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Recent Test Results</h2>
      <div className="space-y-4">
        {testResults.slice(0, 5).map((result) => (
          <Card key={result.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold">Test ID: {result.testId}</p>
                <p className="text-sm text-gray-300">{new Date(result.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-2xl font-bold">
                {result.score}/{result.totalQuestions}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

