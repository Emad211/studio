
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Linkedin, Send } from "lucide-react"
import { cn } from "@/lib/utils"

function TwitterIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9-6.1 1.2-18 5-18 5s-2.9-1.5-5.4-5.2c0 0 2.6-2.3 5.5-3.4-1.6-1.6-2.9-3.4-2.9-3.4 3.8-1.5 7.3-2.6 11.5-3.4.8-.2 1.5.5 1.5.5z" />
        </svg>
    )
}

interface SocialShareProps {
  url: string
  title: string
  lang?: 'en' | 'fa'
}

export function SocialShare({ url, title, lang = 'en' }: SocialShareProps) {
    const isFa = lang === 'fa';
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const socialLinks = [
        {
            name: "توییتر",
            name_en: "Twitter",
            icon: <TwitterIcon />,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        },
        {
            name: "لینکدین",
            name_en: "LinkedIn",
            icon: <Linkedin />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: "تلگرام",
            name_en: "Telegram",
            icon: <Send />,
            href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card/50 p-6 text-center">
            <h3 className="font-semibold">{isFa ? "این مطلب را به اشتراک بگذارید" : "Share this post"}</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {socialLinks.map((link) => (
                    <Button key={link.name} variant="outline" asChild>
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.icon}
                            <span className="hidden sm:inline-block">{isFa ? link.name : link.name_en}</span>
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}
