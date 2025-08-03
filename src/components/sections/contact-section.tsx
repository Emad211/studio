import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section id="contact" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">05.</span> Get In Touch
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Have a project in mind or just want to say hello? My inbox is always open.
        </p>
      </div>
      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>I'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
