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
            Hello! I'm Alex, a passionate software engineer with a knack for creating elegant solutions in the digital realm. My journey into code began years ago, and since then, I've been captivated by the power of technology to solve real-world problems.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            I thrive on turning complex ideas into simple, beautiful, and intuitive designs. Whether it's crafting a responsive front-end or architecting a robust back-end, I am dedicated to building high-quality software that is both functional and delightful to use.
          </p>
        </div>
        <div className="md:col-span-2 relative group">
          <div className="aspect-square relative">
            <Image
              src="https://placehold.co/500x500.png"
              alt="Alex Doe"
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
