"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { services } from "@/lib/data"
import { cn } from "@/lib/utils"

const ServiceCard = ({ service, isSelected, onClick }: { service: typeof services[0], isSelected: boolean, onClick: () => void }) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "p-6 rounded-lg cursor-pointer border-2 transition-all duration-300 text-center flex flex-col items-center gap-4 h-full",
        isSelected
          ? "bg-primary/10 border-primary shadow-lg shadow-primary/20"
          : "bg-card/50 backdrop-blur-sm border-transparent hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
      )}
      layout
    >
      <motion.div
        className={cn("p-3 rounded-full transition-colors", isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary")}
      >
        <service.icon className="w-8 h-8" />
      </motion.div>
      <motion.h3
        className="text-lg font-headline text-foreground"
        layout="position"
      >
        {service.title}
      </motion.h3>
    </motion.div>
  )
}

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState(services[0]);

  return (
    <section id="services" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> What I Do
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">My services are tailored to bring your digital vision to life.</p>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard 
            key={service.title}
            service={service}
            isSelected={selectedService.title === service.title}
            onClick={() => setSelectedService(service)}
          />
        ))}
      </div>

      <div className="mt-8 min-h-[100px] w-full">
         <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 rounded-lg bg-card/50 backdrop-blur-sm border text-center"
            >
              <p className="text-muted-foreground text-lg">
                {selectedService.description}
              </p>
            </motion.div>
        </AnimatePresence>
      </div>

    </section>
  )
}
