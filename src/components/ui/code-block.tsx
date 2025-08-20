"use client"

import { useState } from "react"
import { Button } from "./button"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 rounded-lg bg-card border font-code" dir="ltr">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <span className="text-xs text-muted-foreground">{language}</span>
        <Button variant="ghost" size="icon" onClick={handleCopy} className="h-7 w-7">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto text-left">
        <code>{code}</code>
      </pre>
    </div>
  )
}
