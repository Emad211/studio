
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
import { handleLogin } from "@/lib/actions"
import { useFormState } from 'react-dom'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const initialState = {
  message: '',
}

function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const result = await handleLogin(prevState, formData);
    if (result.success) {
      router.push('/admin');
    }
    return result;
  }, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state?.message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطا در ورود</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" className="w-full">
        ورود
      </Button>
    </form>
  )
}


export default function LoginPage() {
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
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

