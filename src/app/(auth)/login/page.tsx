
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { HeroBackground } from "@/components/sections/hero-background"

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin');
  }

  return (
    <>
      <HeroBackground />
      <div className="relative flex items-center justify-center min-h-screen py-12 bg-transparent" dir="rtl">
        <Card className="mx-auto max-w-sm w-full bg-card/50 backdrop-blur-lg border-border/30 shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">ورود به پنل مدیریت</CardTitle>
            <CardDescription>
              برای دسترسی به داشبورد، اطلاعات کاربری خود را وارد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  defaultValue="admin@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  autoComplete="current-password"
                  defaultValue="password"
                />
              </div>
              <Button type="submit" className="w-full">
                ورود
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
