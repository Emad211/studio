import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { ResumeSection } from '@/components/sections/resume-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="space-y-24 md:space-y-32 my-24 md:my-32">
        <AboutSection />
        <ResumeSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection lang="en" />
      </div>
    </div>
  );
}
