import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
          <div className="relative group w-full max-w-xs">
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
              For me, AI is the ultimate puzzle. It's a blend of intricate mathematics, creative problem-solving, and a deep understanding of data to build systems that don't just follow instructions, but learn, adapt, and create. Whether it's crafting a complex algorithm or developing an intelligent agent, I am driven by the challenge of pushing the boundaries of what's possible.
            </p>
             <p>
              I believe we are at a pivotal moment in technology, and I am excited to be part of building an intelligent future, one line of code at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
