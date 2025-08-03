import Image from 'next/image'
import { Check } from 'lucide-react'

const skillsList = [
  "Generative AI & Agent Development",
  "Deep Learning & Neural Networks",
  "Python, R, & MATLAB",
  "TensorFlow, PyTorch, & Scikit-learn",
  "Data Analysis & Statistics",
  "Computer Vision & NLP"
]

export function AboutSection() {
  return (
    <section id="about" className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
          <div className="relative group w-full max-w-sm">
            <div className="relative rounded-lg overflow-hidden border-2 border-border p-2 group-hover:border-primary transition-colors duration-300">
              <div className="absolute inset-4 bg-primary/10 rounded-md -z-10 transform transition-transform duration-300 group-hover:scale-105"></div>
              <Image
                src="/profile-pic.jpg"
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
          <p className="mt-6 text-lg text-muted-foreground">
            Hello! I'm Emad Karimi, a Computer Engineer with a deep passion for Artificial Intelligence. I thrive on solving complex problems and building intelligent systems that push the boundaries of technology.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            With over 3 years of experience, my focus lies in creating innovative solutions from data-driven insights. Here are a few of the technologies I've been working with recently:
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {skillsList.map((skill) => (
              <li key={skill} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
