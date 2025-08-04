"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Mail, MapPin, Phone, Send } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

const socialLinks = [
  { icon: Github, href: "https://github.com/Emad211", ariaLabel: "Github" },
  { icon: Send, href: "https://t.me/Freelancer_programmerr", ariaLabel: "Telegram" },
]

export function ContactSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
  const { toast } = useToast();
  const t = {
    title: "Get In Touch",
    subtitle: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submitButton: "Send Message",
    email: "emad.k50000@gmail.com",
    phone: "+98-939-990-8021",
    location: "Tehran, Iran",
    successTitle: "Message Sent!",
    successDescription: "Thank you for reaching out. I'll get back to you as soon as possible.",
    errorTitle: "Uh oh! Something went wrong.",
    errorDescription: "There was a problem with your request. Please try again.",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Here you would typically send the form data to a server
      console.log("Form submitted:", values)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      toast({
        title: t.successTitle,
        description: t.successDescription,
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: t.errorTitle,
        description: t.errorDescription,
      })
    }
  }

  return (
    <section id="contact" className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">05.</span> {t.title}
        </h2>
      </div>

       <div className="max-w-5xl mx-auto rounded-lg border bg-card/60 backdrop-blur-sm p-8 md:p-12 shadow-2xl shadow-primary/10">
        <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">{t.subtitle}</h3>
              <div className="space-y-6 text-muted-foreground mt-8">
                <div className="flex items-start gap-4 hover:text-foreground transition-colors">
                  <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <a href={`mailto:${t.email}`}>{t.email}</a>
                </div>
                <div className="flex items-start gap-4 hover:text-foreground transition-colors">
                  <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <span>{t.phone}</span>
                </div>
                <div className="flex items-start gap-4 hover:text-foreground transition-colors">
                  <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
                  <span>{t.location}</span>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, ariaLabel }) => (
                  <Button key={ariaLabel} variant="outline" size="icon" asChild>
                    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
                      <Icon />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.nameLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.emailLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.messageLabel}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full">
                    {form.formState.isSubmitting ? "Sending..." : t.submitButton}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
       </div>
    </section>
  )
}
