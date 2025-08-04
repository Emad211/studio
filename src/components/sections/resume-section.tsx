import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { education, experience } from "@/lib/data"
import { Building, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const TimelineItem = ({ children, isLast }: { children: React.ReactNode; isLast: boolean }) => (
  <div className="relative flex items-start">
    <div className={cn("absolute left-[1.1875rem] top-0 h-full w-px bg-border", isLast ? "h-[1.1875rem]" : "")} />
    <div className="relative flex-shrink-0 w-full">
      {children}
    </div>
  </div>
);

const TimelineIcon = ({ icon }: { icon: React.ElementType }) => {
  const Icon = icon;
  return (
    <div className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
      <Icon className="h-5 w-5" />
    </div>
  );
};

const TimelineCard = ({ item }: { item: typeof education[0] | typeof experience[0] }) => (
    <Card className="ml-16 mb-8 h-full bg-secondary/10 backdrop-blur-lg border-secondary/20 hover:border-primary/50 transition-colors duration-300 shadow-lg hover:shadow-primary/20">
      <CardHeader className="border-b border-secondary/20 pb-4">
        <CardTitle className="font-headline text-lg">{'degree' in item ? item.degree : item.role}</CardTitle>
        {('specialization' in item && item.specialization) && <p className="text-sm text-primary">{item.specialization}</p>}
      </CardHeader>
      <CardContent className="pt-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{'university' in item ? item.university : item.company}</p>
        <div className="text-sm text-muted-foreground text-right">
          <p>{item.duration}</p>
          {('location' in item && item.location) && <p className="mt-1 text-xs">{item.location}</p>}
        </div>
      </CardContent>
    </Card>
  );

export function ResumeSection() {
  return (
    <section id="resume" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">02.</span> My Resume
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">My academic and professional journey.</p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-x-12">
        
        {/* Education Column */}
        <div>
          <h3 className="text-2xl font-bold font-headline mb-8 flex items-center justify-center md:justify-start gap-3">
            <GraduationCap className="w-8 h-8 text-secondary" />
            Education
          </h3>
          <div className="relative">
            {education.map((edu, index) => (
              <TimelineItem key={index} isLast={index === education.length - 1}>
                <TimelineIcon icon={GraduationCap} />
                <TimelineCard item={edu} />
              </TimelineItem>
            ))}
          </div>
        </div>
        
        {/* Experience Column */}
        <div>
          <h3 className="text-2xl font-bold font-headline mb-8 flex items-center justify-center md:justify-start gap-3">
            <Building className="w-8 h-8 text-secondary" />
            Work Experience
          </h3>
          <div className="relative">
            {experience.map((exp, index) => (
              <TimelineItem key={index} isLast={index === experience.length - 1}>
                <TimelineIcon icon={Building} />
                <TimelineCard item={exp} />
              </TimelineItem>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
