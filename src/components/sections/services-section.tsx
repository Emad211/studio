"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { services } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type Service = typeof services[0];

const ServiceCard = ({ service, isSelected, onSelect }: { service: Service, isSelected: boolean, onSelect: () => void }) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "p-4 rounded-lg cursor-pointer border-2 transition-all duration-300",
        "bg-card/50 backdrop-blur-sm",
        isSelected
          ? "border-primary shadow-lg shadow-primary/20"
          : "border-transparent hover:border-primary/50 hover:shadow-md hover:shadow-primary/10"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            className={cn(
                "p-3 rounded-full transition-colors duration-300", 
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary"
            )}
          >
            <service.icon className="w-6 h-6" />
          </motion.div>
          <motion.h3
            className="text-lg font-headline text-foreground"
            layout="position"
          >
            {service.title}
          </motion.h3>
        </div>
        <motion.div animate={{ rotate: isSelected ? 180 : 0 }}>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSelectService = (service: Service) => {
    if (selectedService?.title === service.title) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  return (
    <section id="services" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> What I Do
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">My services are tailored to bring your digital vision to life.</p>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
           const isSelected = selectedService?.title === service.title;
           return (
            <div key={service.title} className="flex flex-col gap-4">
              <ServiceCard 
                service={service}
                isSelected={isSelected}
                onSelect={() => handleSelectService(service)}
              />
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border -mt-2"
                  >
                    <p className="text-muted-foreground text-center">
                      {service.description}
                    </p>
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
