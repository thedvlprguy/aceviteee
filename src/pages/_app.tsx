import { ClerkProvider } from "@clerk/nextjs"
import "../styles/globals.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default MyApp

