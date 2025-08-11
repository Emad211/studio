"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { services, servicesFa } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type Service = (typeof services)[0]

const ServiceCard = ({ service, isSelected, onSelect, lang }: { service: Service, isSelected: boolean, onSelect: () => void, lang?: 'en' | 'fa' }) => {
  const isFa = lang === 'fa';
  return (
    <div className="rounded-lg bg-card/50 backdrop-blur-sm border border-transparent hover:border-primary/30 transition-colors duration-300">
      <div
        onClick={onSelect}
        className={cn(
          "p-4 cursor-pointer flex items-center justify-between gap-4",
          isSelected ? "text-primary" : "text-foreground"
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "p-3 rounded-full transition-colors duration-300",
              isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
            )}
          >
            <service.icon className="w-6 h-6" />
          </div>
          <h3 className={cn("text-lg font-headline", isFa && "text-right")}>
            {service.title}
          </h3>
        </div>
        <motion.div animate={{ rotate: isSelected ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  )
}

export function ServicesSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const isFa = lang === 'fa';

  const t = {
    title: isFa ? "خدمات من" : "What I Do",
    subtitle: isFa ? "خدمات من برای تحقق بخشیدن به چشم‌انداز دیجیتالی شما طراحی شده است." : "My services are tailored to bring your digital vision to life.",
    number: "02."
  }

  const currentServices = isFa ? servicesFa : services;

  const handleSelectService = (service: Service) => {
    if (selectedService?.title === service.title) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  return (
    <section id="services" className="container">
      <div className={cn("mb-12", isFa ? "text-right" : "text-left", "md:text-center")}>
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">{t.number}</span> {t.title}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto space-y-4">
        {currentServices.map((service) => {
          const isSelected = selectedService?.title === service.title;
          return (
            <div key={service.title} className="flex flex-col">
              <ServiceCard
                service={service}
                isSelected={isSelected}
                onSelect={() => handleSelectService(service)}
                lang={lang}
              />
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '-0.5rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{
                      height: { type: "spring", stiffness: 200, damping: 30 },
                      opacity: { duration: 0.4 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-8 rounded-b-lg bg-card/50 backdrop-blur-sm border border-t-0">
                      <p className={cn("text-muted-foreground", isFa ? "text-right" : "text-left")}>
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
