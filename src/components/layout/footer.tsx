import { Github, Send, User } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "../ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold font-headline">CodeCanvas</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Emad211" target="_blank" rel="noopener noreferrer" aria-label="Github">
                <Github />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://t.me/Freelancer_programmerr" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Send />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CodeCanvas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
