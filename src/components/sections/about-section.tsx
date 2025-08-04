import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { education, experience } from '@/lib/data'
import { Building, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const TimelineItem = ({ item, icon }: { item: typeof education[0] | typeof experience[0], icon: React.ElementType }) => {
    const Icon = icon;
    return (
        <div className="relative pl-12 pb-8">
            <div className="absolute left-[1.125rem] top-1 h-full w-px bg-border" />
            <div className="absolute left-0 top-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">{'degree' in item ? item.degree : item.role}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {'university' in item ? item.university : item.company}
                        {('location' in item && item.location) && `, ${item.location}`}
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-primary">{item.duration}</p>
                    {('specialization' in item && item.specialization) && <p className="mt-2 text-sm text-muted-foreground">{item.specialization}</p>}
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
            <Tabs defaultValue="experience" className="w-full max-w-3xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="experience">
                        <Building className="mr-2 h-4 w-4" />
                        Experience
                    </TabsTrigger>
                    <TabsTrigger value="education">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Education
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="experience" className="mt-8">
                    <div className="relative">
                        <div className="absolute left-[1.125rem] top-0 h-full w-px bg-border -z-10" />
                        {experience.map((item, index) => (
                            <TimelineItem key={index} item={item} icon={Building} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="education" className="mt-8">
                    <div className="relative">
                        <div className="absolute left-[1.125rem] top-0 h-full w-px bg-border -z-10" />
                        {education.map((item, index) => (
                           <TimelineItem key={index} item={item} icon={GraduationCap} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </section>
  )
}
