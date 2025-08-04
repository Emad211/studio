import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { services } from "@/lib/data"
import { ChevronDown } from "lucide-react"

export function ServicesSection() {
  return (
    <section id="services" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> What I Do
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">My services are tailored to bring your digital vision to life.</p>
      </div>
      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {services.map((service, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card/50 backdrop-blur-sm border rounded-lg transition-all hover:border-primary/50">
              <AccordionTrigger className="p-6 text-left hover:no-underline group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-full text-primary group-data-[state=open]:text-primary group-data-[state=open]:bg-primary/10 transition-colors">
                     <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-headline text-foreground group-data-[state=open]:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" />
              </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
