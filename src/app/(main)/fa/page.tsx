import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomeFa() {
  return (
    <div className="flex flex-col">
      <HeroSection lang="fa" />
      <div className="space-y-16 md:space-y-24 my-16 md:my-24">
        <AboutSection lang="fa" />
        <ServicesSection lang="fa" />
        <SkillsSection lang="fa" />
        <ProjectsSection lang="fa" />
        <ContactSection lang="fa" />
      </div>
    </div>
  );
}
