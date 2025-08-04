"use client"

import { motion } from "framer-motion"
import { skillGraphData } from "@/lib/data"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const levelToSize: { [key: string]: number } = {
  Expert: 24,
  Advanced: 20,
  Intermediate: 16,
  Beginner: 12,
};

const SkillNode = ({ x, y, level, name, categoryColor }: { x: number, y: number, level: string, name: string, categoryColor: string }) => {
  const size = levelToSize[level] || 16;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <motion.circle
        r={size / 2}
        className={cn("stroke-1", categoryColor)}
        fill="hsl(var(--background))"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: Math.random() * 1.5 }}
      />
      <text
        className="text-xs fill-muted-foreground transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        y={size / 2 + 15}
        textAnchor="middle"
      >
        {name}
      </text>
    </g>
  );
};

const Constellation = ({ category, skills, index }: { category: string, skills: any[], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [nodes, setNodes] = useState<{x: number, y: number, [key: string]: any}[]>([]);
  const categoryColor = `stroke-chart-${(index % 5) + 1}`;
  
  useEffect(() => {
    setNodes(skills.map((skill) => {
      const angle = (Math.random() * 2 * Math.PI); // Random angle for more variation
      const radius = Math.random() * 40 + 80;
      return {
        ...skill,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    }));
  }, [skills]);

  if (nodes.length === 0) {
    return null; // Don't render anything on the server or before client-side calculation
  }

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <h3 className={cn(
        "text-center font-headline text-lg mb-4 transition-colors duration-300",
        isHovered ? `text-chart-${(index % 5) + 1}`.replace('stroke-', 'text-') : "text-muted-foreground"
      )}>
        {category}
      </h3>
      <svg viewBox="-150 -150 300 300" className="w-64 h-64 md:w-72 md:h-72 transition-transform duration-300 group-hover:scale-110">
        <motion.g
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          variants={{
            visible: { opacity: 0.3 },
            hidden: { opacity: 0.1 },
          }}
          transition={{ duration: 0.3 }}
        >
          {nodes.map((node, i) => (
            <line
              key={i}
              x1={node.x}
              y1={node.y}
              x2={nodes[(i + 1) % nodes.length].x}
              y2={nodes[(i + 1) % nodes.length].y}
              className={cn("stroke-muted-foreground", categoryColor)}
              strokeWidth="0.5"
            />
          ))}
        </motion.g>
        {nodes.map((node, i) => (
          <SkillNode key={i} {...node} categoryColor={categoryColor} />
        ))}
      </svg>
    </motion.div>
  );
};

export function SkillsSection() {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    return (
        <section id="skills" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">03.</span> My Skills Galaxy
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    A constellation of my technical capabilities.
                </p>
            </div>

            <div 
              className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-12 md:gap-x-16"
              onMouseLeave={() => setHoveredCategory(null)}
            >
                {skillGraphData.map((group, index) => (
                     <div 
                        key={group.category} 
                        onMouseEnter={() => setHoveredCategory(group.category)} 
                        className={cn(
                            "transition-opacity duration-300",
                            hoveredCategory && hoveredCategory !== group.category ? "opacity-30" : "opacity-100"
                        )}
                     >
                        <Constellation 
                            category={group.category} 
                            skills={group.skills} 
                            index={index} 
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
