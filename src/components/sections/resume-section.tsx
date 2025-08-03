import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { education, experience } from "@/lib/data"
import { Building, GraduationCap } from "lucide-react"

export function ResumeSection() {
  return (
    <section id="resume" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">02.</span> My Resume
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">My academic and professional journey.</p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-secondary" />
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">{edu.degree}</CardTitle>
                  <p className="text-sm text-muted-foreground">{edu.university}</p>
                   {edu.specialization && <p className="text-sm text-primary">{edu.specialization}</p>}
                </CardHeader>
                <CardContent className="flex justify-between items-center text-sm">
                  <span>{edu.duration}</span>
                  <span>GPA: {edu.gpa}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2">
            <Building className="w-6 h-6 text-secondary" />
            Work Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index} className="bg-card/80">
                <CardHeader>
                  <CardTitle className="text-lg font-headline">{exp.role}</CardTitle>
                  <p className="text-sm text-muted-foreground">{exp.company || exp.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{exp.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
