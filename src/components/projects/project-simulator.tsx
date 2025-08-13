"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ProjectSimulatorProps {
  images: string[];
}

export function ProjectSimulator({ images }: ProjectSimulatorProps) {
  return (
    <div className="mt-12 w-full">
       <div className="text-center mb-6">
        <h3 className="font-headline text-2xl font-semibold">Interactive Simulator</h3>
        <p className="text-muted-foreground">Click through the gallery to see the project in action.</p>
      </div>
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="aspect-video relative overflow-hidden rounded-lg border">
                   <Image
                    src={src}
                    alt={`Project screenshot ${index + 1}`}
                    fill
                    className="object-contain"
                    data-ai-hint="app screenshot"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
