import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-10rem)] text-center">
      <div className="flex flex-col items-center">
        <SearchX className="w-24 h-24 text-primary animate-pulse" />
        <h1 className="mt-8 text-5xl font-bold font-headline">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">صفحه مورد نظر یافت نشد</h2>
        <p className="mt-2 text-muted-foreground max-w-sm">
          متاسفیم، اما صفحه‌ای که به دنبال آن بودید وجود ندارد. شاید آدرس را اشتباه وارد کرده‌اید یا صفحه حذف شده است.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">بازگشت به صفحه اصلی</Link>
        </Button>
      </div>
    </div>
  )
}
