import { auth } from "@clerk/nextjs"

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    // Handle unauthenticated state, e.g., redirect to sign-in page
    return null
  }

  // Rest of your dashboard page code
}

