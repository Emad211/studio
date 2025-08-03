import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { services } from "@/lib/data"
import { cn } from "@/lib/utils"

function ServiceCard({ service, className }: { service: typeof services[0], className?: string }) {
  return (
    <Card className={cn(
      "h-full bg-secondary/10 backdrop-blur-lg border-secondary/20 hover:border-primary/50 transition-colors duration-300",
      "shadow-lg hover:shadow-primary/20",
      className
      )}>
      <CardHeader className="flex flex-col items-center text-center">
        <div className="mb-4 text-primary bg-primary/10 p-3 rounded-full">
          <service.icon className="w-8 h-8" />
        </div>
        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        <p>{service.description}</p>
      </CardContent>
    </Card>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">02.</span> What I Do
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">My services are tailored to bring your digital vision to life.</p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  )
}
