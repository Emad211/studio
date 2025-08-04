import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { education, experience } from '@/lib/data'
import { Building, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const TimelineItem = ({ item, icon }: { item: typeof education[0] | typeof experience[0], icon: React.ElementType }) => {
    const Icon = icon;
    return (
        <Card className="mb-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-300">
            <div className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-headline text-lg font-semibold text-foreground">
                            {'degree' in item ? item.degree : item.role}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {'university' in item ? item.university : item.company}
                        </p>
                    </div>
                </div>

                <div className="md:ml-auto text-left md:text-right mt-2 md:mt-0">
                    <p className="text-sm text-primary font-medium">{item.duration}</p>
                    {('location' in item && item.location) && <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>}
                    {('specialization' in item && item.specialization) && <p className="mt-1 text-xs text-muted-foreground">{item.specialization}</p>}
                </div>
            </div>
        </Card>
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
            <Tabs defaultValue="experience" className="w-full max-w-4xl mx-auto">
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
                    <div>
                        {experience.map((item, index) => (
                            <TimelineItem key={index} item={item} icon={Building} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="education" className="mt-8">
                    <div>
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
