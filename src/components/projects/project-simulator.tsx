
"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ProjectSimulatorProps {
  images: string[];
  lang?: 'en' | 'fa';
}

export function ProjectSimulator({ images, lang = 'en' }: ProjectSimulatorProps) {
  const isFa = lang === 'fa';
  const t = {
    title: isFa ? "شبیه‌ساز تعاملی" : "Interactive Simulator",
    subtitle: isFa ? "برای دیدن پروژه در عمل، گالری را ورق بزنید." : "Click through the gallery to see the project in action.",
  }
  return (
    <div className="mt-12 w-full">
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="aspect-video relative overflow-hidden rounded-lg border bg-muted">
                   <img
                    src={src}
                    alt={`Project screenshot or GIF ${index + 1}`}
                    className="w-full h-full object-contain"
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
