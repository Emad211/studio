"use client"

import { Button } from "@/components/ui/button"
import { Github, Mail, Send } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const socialLinks = [
  { icon: Mail, href: "mailto:emad.k50000@gmail.com", ariaLabel: "Email", text: "emad.k50000@gmail.com", faText: "ایمیل" },
  { icon: Github, href: "https://github.com/Emad211", ariaLabel: "Github", text: "GitHub", faText: "گیت‌هاب" },
  { icon: Send, href: "https://t.me/Freelancer_programmerr", ariaLabel: "Telegram", text: "Telegram", faText: "تلگرام" },
]

export function ContactSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
    const isFa = lang === 'fa'
    const t = {
        title: isFa ? "در تماس باشید" : "Get In Touch",
        subtitle: isFa ? "من همیشه برای گفتگو در مورد پروژه‌های جدید، ایده‌های خلاقانه یا فرصت‌های همکاری آماده‌ام. با من در ارتباط باشید." : "I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out.",
        connectTitle: isFa ? "ارتباط با من" : "Let's Connect",
        number: "05."
    }

  return (
    <section id="contact" className="container">
      <div className={cn("mb-12", isFa ? "text-right" : "text-left")}>
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">{t.number}</span> {t.title}
        </h2>
      </div>

       <div className="max-w-3xl mx-auto rounded-xl border bg-card/50 backdrop-blur-lg p-8 md:p-12 shadow-lg text-center">
          <h3 className="text-2xl font-bold font-headline mb-4">{t.connectTitle}</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, ariaLabel, text, faText }) => (
              <Button key={ariaLabel} variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
                  <Icon className={isFa ? "ml-2 h-5 w-5" : "mr-2 h-5 w-5"} />
                  {isFa ? faText : text}
                </Link>
              </Button>
            ))}
          </div>
       </div>
    </section>
  )
}
