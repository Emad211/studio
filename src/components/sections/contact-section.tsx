"use client"

import { Button } from "@/components/ui/button"
import { Github, Mail, Send } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { icon: Mail, href: "mailto:emad.k50000@gmail.com", ariaLabel: "Email", text: "emad.k50000@gmail.com" },
  { icon: Github, href: "https://github.com/Emad211", ariaLabel: "Github", text: "GitHub" },
  { icon: Send, href: "https://t.me/Freelancer_programmerr", ariaLabel: "Telegram", text: "Telegram" },
]

export function ContactSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
  const t = {
    title: "Get In Touch",
    subtitle: "I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out.",
    connectTitle: "Let's Connect",
  }

  // Persian translations can be added here if needed for `lang === 'fa'`

  return (
    <section id="contact" className="container">
      <div className="text-left mb-12">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">05.</span> {t.title}
        </h2>
      </div>

       <div className="max-w-3xl mx-auto rounded-xl border bg-card/50 backdrop-blur-lg p-8 md:p-12 shadow-lg text-center">
          <h3 className="text-2xl font-bold font-headline mb-4">{t.connectTitle}</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, ariaLabel, text }) => (
              <Button key={ariaLabel} variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
                  <Icon className="mr-2 h-5 w-5" />
                  {text}
                </Link>
              </Button>
            ))}
          </div>
       </div>
    </section>
  )
}
