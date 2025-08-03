import { skills } from "@/lib/data"
import { CircularProgress } from "@/components/ui/circular-progress"

export function SkillsSection() {
  return (
    <section id="skills" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> My Skills
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">A showcase of my technical expertise and capabilities.</p>
      </div>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center gap-2">
            <CircularProgress value={skill.level} />
            <p className="font-semibold text-sm">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
