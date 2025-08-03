import { skills } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function SkillsSection() {

  const skillCategories: Record<string, string[]> = {
    "Programming Languages": ["Python", "R", "MATLAB"],
    "AI & Machine Learning": ["Deep Learning", "Generative AI", "Computer Vision", "Agent Development", "NLP", "Neural Networks"],
    "AI Frameworks & Libraries": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "LangChain", "AutoGen"],
    "Data Science & Analytics": ["Pandas", "NumPy", "Statistics", "Matplotlib", "Seaborn", "Plotly"],
    "Web Development & Design": ["HTML5", "CSS3", "React", "Node.js", "Flask", "Bootstrap"],
    "Databases": ["SQL", "PostgreSQL", "MySQL", "MongoDB"],
    "Tools & Technologies": ["Git", "GitHub", "Docker", "Terminal", "SPSS"],
    "Research & Academic": ["Thesis Writing", "Research Methods", "LaTeX", "Academic Writing"]
  }

  return (
    <section id="skills" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> My Skills
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">A showcase of my technical expertise and capabilities.</p>
      </div>
      <div className="mt-12 space-y-8">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-xl font-bold font-headline mb-4 text-center md:text-left">{category}</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {skills.map((skillName) => {
                 const skill = { name: skillName, level: "Expert" }; // Placeholder level
                 return(
                  <Badge key={skill.name} variant="secondary" className="text-sm font-medium px-3 py-1">{skill.name}</Badge>
                 )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
