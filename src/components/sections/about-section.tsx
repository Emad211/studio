import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { education, experience, educationFa, experienceFa } from '@/lib/data'
import { Building, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

const TimelineCard = ({ item, side, lang }: { item: (typeof education[0] | typeof experience[0]), side: 'top' | 'bottom', lang: 'en' | 'fa' }) => {
    const isFa = lang === 'fa'
    return (
        <div className="relative flex flex-col items-center w-full md:w-64">
            <div className="absolute w-px h-8 bg-border hidden md:block" style={side === 'top' ? { bottom: '-2rem' } : { top: '-2rem' }}></div>
            <div className="absolute w-3 h-3 rounded-full bg-primary ring-4 ring-background hidden md:block" style={side === 'top' ? { bottom: '-0.375rem' } : { top: '-0.375rem' }}></div>

             <div className={cn("absolute top-0 w-px h-full bg-border md:hidden", isFa ? "right-0 -translate-x-1/2" : "left-0 -translate-x-1/2")}>
                <div className="absolute w-3 h-3 rounded-full bg-primary ring-4 ring-background top-1/2 -translate-y-1/2 left-1/2"></div>
            </div>

            <Card className={cn(
                "bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-300 w-full",
                isFa ? "mr-4 md:mr-0" : "ml-4 md:ml-0"
            )}>
                <CardHeader>
                    <CardTitle className={cn("font-headline text-base leading-tight", isFa && "text-right")}>
                        {'degree' in item ? item.degree : item.role}
                    </CardTitle>
                    <p className={cn("text-sm text-muted-foreground pt-1", isFa && "text-right")}>
                        {'university' in item ? item.university : item.company}
                    </p>
                </CardHeader>
                <CardContent className={cn(isFa && "text-right")}>
                    <p className="text-xs text-primary font-medium">{item.duration}</p>
                    {('location' in item && item.location) && <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>}
                    {('specialization' in item && item.specialization) && <p className="mt-1 text-xs text-muted-foreground">{item.specialization}</p>}
                </CardContent>
            </Card>
        </div>
    )
}


export function AboutSection({ lang = 'en' }: { lang?: 'en' | 'fa' }) {
    const isFa = lang === 'fa';
    const t = {
        title: isFa ? "درباره من" : "About Me",
        p1: isFa ? "سفر من با مدرک مهندسی کامپیوتر آغاز شد، جایی که پایه‌ای محکم در منطق و سیستم‌ها ساختم. با این حال، به سرعت متوجه شدم که علاقه‌ی واقعی من فقط به کار انداختن ماشین‌ها نیست، بلکه به فکر واداشتن آن‌هاست. این کنجکاوی مرا به مسیر شگفت‌انگیز هوش مصنوعی کشاند." : "My journey began with a degree in computer engineering, where I built a solid foundation in logic and systems. However, I quickly realized my true passion wasn't just in making machines work, but in making them think. This curiosity led me down the fascinating path of artificial intelligence.",
        p2: isFa ? "برای من، هوش مصنوعی یک پازل نهایی است. ترکیبی از ریاضیات پیچیده، حل خلاقانه‌ی مسئله و درک عمیق داده‌ها برای ساختن سیستم‌هایی است که نه تنها دستورالعمل‌ها را دنبال می‌کنند، بلکه یاد می‌گیرند، سازگار می‌شوند و خلق می‌کنند." : "For me, AI is the ultimate puzzle. It's a blend of intricate mathematics, creative problem-solving, and a deep understanding of data to build systems that don't just follow instructions, but learn, adapt, and create.",
        journeyTitle: isFa ? "سفر من" : "My Journey",
        experience: isFa ? "تجربه کاری" : "Experience",
        education: isFa ? "تحصیلات" : "Education"
    }

    const currentExperience = isFa ? experienceFa : experience;
    const currentEducation = isFa ? educationFa : education;

    return (
        <section id="about" className="container">
            <div className={cn("text-center mb-12", isFa ? "md:text-right" : "md:text-left")}>
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">01.</span> {t.title}
                </h2>
            </div>
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
                <div className={cn("order-1 lg:order-2", isFa ? "text-right lg:text-right" : "text-left")}>
                    <div className="mt-6 text-lg text-muted-foreground space-y-4">
                        <p>
                           {t.p1}
                        </p>
                        <p>
                           {t.p2}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-2xl font-bold font-headline mb-12 text-center">{t.journeyTitle}</h3>
                <Tabs defaultValue="experience" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                        <TabsTrigger value="experience">
                            <Building className={cn(isFa ? "ml-2" : "mr-2", "h-4 w-4")} />
                            {t.experience}
                        </TabsTrigger>
                        <TabsTrigger value="education">
                            <GraduationCap className={cn(isFa ? "ml-2" : "mr-2", "h-4 w-4")} />
                            {t.education}
                        </TabsTrigger>
                    </TabsList>
                    <div className="mt-16 overflow-x-auto pb-8">
                        <TabsContent value="experience">
                            <div className="relative flex justify-center items-center px-4">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block"></div>
                                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                    {currentExperience.map((item, index) => (
                                        <TimelineCard key={index} item={item} lang={lang} side={index % 2 === 0 ? 'bottom' : 'top'} />
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="education">
                            <div className="relative flex justify-center items-center px-4">
                                <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block"></div>
                                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                    {currentEducation.map((item, index) => (
                                         <TimelineCard key={index} item={item} lang={lang} side={index % 2 === 0 ? 'bottom' : 'top'} />
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
