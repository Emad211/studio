"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] text-center">
      <div>
        <h2 className="text-2xl font-bold font-headline text-destructive">متاسفانه خطایی رخ داده است!</h2>
        <p className="mt-4 text-muted-foreground">
          مشکلی در سمت سرور پیش آمده. لطفا کمی صبر کنید و دوباره تلاش کنید.
        </p>
        <Button onClick={() => reset()} className="mt-6">
          تلاش مجدد
        </Button>
      </div>
    </div>
  )
}
