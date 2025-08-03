import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="container">
      <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold font-headline text-primary">
            <span className="font-mono text-xl text-secondary">01.</span> About Me
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hello! I'm Emad Karimi, a Computer Engineer with over 3 years of experience in Artificial Intelligence and Machine Learning. I specialize in Generative AI, Agent Development, Deep Learning, and statistical analysis.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            My core skills include programming with Python, R, and MATLAB, neural network development, data analysis, and thesis writing. I have successfully completed over 80 projects and am always ready to take on new challenges in the technology field.
          </p>
           <p className="mt-4 text-lg text-muted-foreground">
            I'm passionate about teamwork and knowledge sharing. My goal is to contribute to technological advancement and improve people's lives through innovative projects and solving complex problems.
          </p>
        </div>
        <div className="md:col-span-2 relative group">
          <div className="aspect-square relative">
            <Image
              src="https://placehold.co/500x500.png"
              alt="Emad Karimi"
              width={500}
              height={500}
              className="rounded-lg object-cover z-10 relative group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="portrait person"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-lg transform transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
