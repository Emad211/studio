import { Github, Send, User, Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "../ui/button"
import Link from "next/link"
import { getSiteSettings } from "@/lib/actions"

export async function Footer() {
  const settings = await getSiteSettings();
  const { socials, en, fa } = settings;

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Logo />
            <span className="font-bold font-headline">{en.siteName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login" aria-label="Admin Login">
                <User />
              </Link>
            </Button>
            {socials.email && (
                 <Button variant="ghost" size="icon" asChild>
                    <Link href={`mailto:${socials.email}`} target="_blank" rel="noopener noreferrer" aria-label="Email">
                        <Mail />
                    </Link>
                </Button>
            )}
            {socials.github && (
                 <Button variant="ghost" size="icon" asChild>
                    <Link href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="Github">
                        <Github />
                    </Link>
                </Button>
            )}
            {socials.telegram && (
                 <Button variant="ghost" size="icon" asChild>
                    <Link href={socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                        <Send />
                    </Link>
                </Button>
            )}
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {en.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
