import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { education, experience } from '@/lib/data'
import { Building, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

const TimelineCard = ({ item, side }: { item: typeof education[0] | typeof experience[0], side: 'top' | 'bottom' }) => {
    return (
        <div className={cn("relative flex flex-col items-center w-64", side === 'top' ? 'mb-8' : 'mt-8')}>
            <div className="absolute w-px h-8 bg-border" style={side === 'top' ? { bottom: '-2rem' } : { top: '-2rem' }}></div>
            <div className="absolute w-3 h-3 rounded-full bg-primary ring-4 ring-background" style={side === 'top' ? { bottom: '-0.375rem' } : { top: '-0.375rem' }}></div>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-300 w-full">
                <CardHeader>
                    <CardTitle className="font-headline text-base leading-tight">
                        {'degree' in item ? item.degree : item.role}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground pt-1">
                        {'university' in item ? item.university : item.company}
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-primary font-medium">{item.duration}</p>
                    {('location' in item && item.location) && <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>}
                    {('specialization' in item && item.specialization) && <p className="mt-1 text-xs text-muted-foreground">{item.specialization}</p>}
                </CardContent>
            </Card>
        </div>
    )
}


export function AboutSection() {
    return (
        <section id="about" className="container">
            {/* About Me Intro */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                    <div className="relative group w-full max-w-sm">
                        <div className="relative rounded-lg overflow-hidden border-2 border-border p-2 group-hover:border-primary transition-colors duration-300">
                            <div className="absolute inset-4 bg-primary/10 rounded-md -z-10 transform transition-transform duration-300 group-hover:scale-105"></div>
                            <Image
                                src="/profile-pic2.jpg"
                                alt="Emad Karimi"
                                width={500}
                                height={500}
                                className="rounded-lg object-contain z-10 relative transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="portrait man"
                            />
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <h2 className="text-3xl font-bold font-headline text-primary">
                        <span className="font-mono text-xl text-secondary">01.</span> About Me
                    </h2>
                    <div className="mt-6 text-lg text-muted-foreground space-y-4">
                        <p>
                            My journey began with a degree in computer engineering, where I built a solid foundation in logic and systems. However, I quickly realized my true passion wasn't just in making machines work, but in making them think. This curiosity led me down the fascinating path of artificial intelligence.
                        </p>
                        <p>
                            For me, AI is the ultimate puzzle. It's a blend of intricate mathematics, creative problem-solving, and a deep understanding of data to build systems that don't just follow instructions, but learn, adapt, and create.
                        </p>
                    </div>
                </div>
            </div>

            {/* Resume Timeline */}
            <div className="mt-24">
                <h3 className="text-2xl font-bold font-headline text-center mb-12">My Journey</h3>
                <Tabs defaultValue="experience" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                        <TabsTrigger value="experience">
                            <Building className="mr-2 h-4 w-4" />
                            Experience
                        </TabsTrigger>
                        <TabsTrigger value="education">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Education
                        </TabsTrigger>
                    </TabsList>
                    <div className="mt-16 overflow-x-auto pb-8">
                        <TabsContent value="experience">
                            <div className="relative flex flex-col md:flex-row justify-center items-center px-4">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block"></div>
                                <div className="absolute top-0 left-1/2 w-px h-full bg-border -translate-x-1/2 md:hidden"></div>
                                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                    {experience.map((item, index) => (
                                        <TimelineCard key={index} item={item} side={index % 2 === 0 ? 'bottom' : 'top'} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="education">
                            <div className="relative flex flex-col md:flex-row justify-center items-center px-4">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block"></div>
                                 <div className="absolute top-0 left-1/2 w-px h-full bg-border -translate-x-1/2 md:hidden"></div>
                                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                    {education.map((item, index) => (
                                         <TimelineCard key={index} item={item} side={index % 2 === 0 ? 'bottom' : 'top'} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </section>
    )
}
