import { skills } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgress } from "@/components/ui/circular-progress"

export function SkillsSection() {

  const featuredSkills = ["Python", "Deep Learning", "Generative AI", "Computer Vision", "TensorFlow", "PyTorch"]
  const featuredSkillsData = skills.filter(s => featuredSkills.includes(s.name))

  const skillCategories: Record<string, string[]> = {
    "Programming Languages": ["R", "MATLAB"],
    "AI & Machine Learning": ["Agent Development", "NLP", "Neural Networks"],
    "AI Frameworks & Libraries": ["Scikit-learn", "OpenCV", "LangChain", "AutoGen"],
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

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {featuredSkillsData.map(skill => (
          <div key={skill.name} className="flex flex-col items-center gap-3">
             <CircularProgress value={skill.level} size={120} strokeWidth={8}/>
             <h3 className="text-base font-semibold font-headline">{skill.name}</h3>
          </div>
        ))}
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <Card key={category} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-300">
             <CardHeader>
               <CardTitle className="font-headline text-lg">{category}</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skillName) => (
                    <Badge key={skillName} variant="secondary" className="text-sm font-medium px-3 py-1">{skillName}</Badge>
                  ))}
                </div>
             </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
