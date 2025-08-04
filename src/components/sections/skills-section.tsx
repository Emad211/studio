"use client";

import { skills } from "@/lib/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import React, { useMemo } from 'react';

const LAYER_COLORS = [
  "hsl(var(--primary) / 0.8)", // Layer 1
  "hsl(var(--primary) / 0.6)", // Layer 2
  "hsl(var(--primary) / 0.4)", // Layer 3
];

const Node = ({ skill, totalInLayer }: { skill: (typeof skills)[0], totalInLayer: number }) => {
  const yPosition = (100 / (totalInLayer + 1)) * skill.position;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.random() * 1, duration: 0.5, type: 'spring' }}
            className="absolute"
            style={{
              top: `${yPosition}%`,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative group">
              <div
                className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                style={{
                  borderColor: LAYER_COLORS[skill.layer - 1],
                  backgroundColor: LAYER_COLORS[skill.layer - 1].replace('0.8', '0.1').replace('0.6', '0.1').replace('0.4', '0.1'),
                }}
              />
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  boxShadow: `0 0 12px 2px ${LAYER_COLORS[skill.layer - 1]}`,
                  opacity: skill.level / 200 + 0.2,
                }}
              />
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">{skill.name}</p>
          <p className="text-sm text-muted-foreground">Level: {skill.level}%</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Connection = ({ fromNode, toNode, fromTotal, toTotal, fromLayerIndex, toLayerIndex }: any) => {
    const fromY = (100 / (fromTotal + 1)) * fromNode.position;
    const toY = (100 / (toTotal + 1)) * toNode.position;
  
    const pathD = `M 0,${fromY} C 50,${fromY} 50,${toY} 100,${toY}`;
  
    return (
      <svg
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: -1 }}
        preserveAspectRatio="none"
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke={LAYER_COLORS[toLayerIndex]}
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1 + Math.random(), duration: 1, ease: "easeInOut" }}
        />
      </svg>
    );
  };


export function SkillsSection() {
  const layers = useMemo(() => {
    return [
      skills.filter(s => s.layer === 1),
      skills.filter(s => s.layer === 2),
      skills.filter(s => s.layer === 3)
    ];
  }, []);

  return (
    <section id="skills" className="container">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">
          <span className="font-mono text-xl text-secondary">03.</span> My Skills
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          An interactive visualization of my expertise.
        </p>
      </div>

      <div className="mt-12 md:mt-20 h-[500px] w-full max-w-5xl mx-auto flex justify-between items-center relative">
        {/* Render Layers and Nodes */}
        {layers.map((layer, index) => (
          <div key={index} className="w-1/3 h-full relative flex flex-col items-center justify-center">
             <h3 className="absolute top-0 text-muted-foreground font-headline tracking-widest text-sm uppercase">
              {index === 0 && 'Foundation'}
              {index === 1 && 'Specialization'}
              {index === 2 && 'Application'}
            </h3>
            {layer.map(skill => (
              <Node key={skill.name} skill={skill} totalInLayer={layer.length}/>
            ))}
          </div>
        ))}
        
        {/* Render Connections */}
        <div className="absolute inset-0 z-0">
          {layers.slice(0, -1).map((fromLayer, fromIndex) => {
            const toLayer = layers[fromIndex + 1];
            return fromLayer.flatMap(fromNode => 
                toLayer.map(toNode => (
                    <Connection 
                        key={`${fromNode.name}-${toNode.name}`}
                        fromNode={fromNode} 
                        toNode={toNode}
                        fromTotal={fromLayer.length}
                        toTotal={toLayer.length}
                        fromLayerIndex={fromIndex}
                        toLayerIndex={fromIndex + 1}
                    />
                ))
            )
          })}
        </div>
      </div>
    </section>
  );
}
