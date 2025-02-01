import { Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto h-16 flex items-center justify-center">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by{" "}
          <Link 
            href="https://github.com/ascendantnaval" 
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            Naval
          </Link>
          {" & "}
          <Link 
            href="https://github.com/thedvlprguy" 
            target="_blank"
            className="hover:text-primary transition-colors"
          >
            Aditya
          </Link>
        </p>
      </div>
    </footer>
  )
} 