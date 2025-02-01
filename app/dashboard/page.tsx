import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <TestSeriesCard title="Basic Pack" description="5 Best Explanation" price="₹499" href="/purchase/basic" />
        <TestSeriesCard
          title="Standard Pack"
          description="15 Best Explanation"
          price="₹999"
          href="/purchase/standard"
        />
        <TestSeriesCard
          title="Premium Pack"
          description="30 Best Explanation"
          price="₹1499"
          href="/purchase/premium"
        />
      </div>

      <Link href="/test">
        <Button size="lg">Start a Test</Button>
      </Link>
    </div>
  )
}

function TestSeriesCard({
  title,
  description,
  price,
  href,
}: { title: string; description: string; price: string; href: string }) {
  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="mb-4">{description}</p>
      <p className="text-2xl font-bold mb-4">{price}</p>
      <Link href={href}>
        <Button variant="outline">Purchase</Button>
      </Link>
    </div>
  )
}

