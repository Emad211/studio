"use client"

import { motion } from "framer-motion"
import { skillGraph } from "@/lib/data"
import React, { useState, useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"

const categoryColors: { [key: string]: string } = {
  'Language': 'text-chart-1',
  'AI/ML': 'text-chart-2',
  'AI Framework': 'text-chart-3',
  'Data Science': 'text-chart-4',
  'Research': 'text-chart-5',
  'Web Dev': 'text-chart-1',
  'Database': 'text-chart-2',
  'Tools': 'text-chart-3',
};

const SIMULATION_STRENGTH = -30;

const Node = React.memo(({ node, onMouseEnter, onMouseLeave, isHighlighted, isDimmed }: any) => (
  <g
    onMouseEnter={() => onMouseEnter(node)}
    onMouseLeave={onMouseLeave}
    className="cursor-pointer group"
  >
    <motion.circle
      cx={node.x}
      cy={node.y}
      r={8}
      className={cn(
        "transition-all duration-300",
        isHighlighted ? 'stroke-2' : 'stroke-1',
        isDimmed ? "opacity-20" : "opacity-100",
        categoryColors[node.category]?.replace('text-', 'stroke-') || 'stroke-foreground'
      )}
      fill="hsl(var(--background))"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: Math.random() * 0.5 }}
    />
    <text
      x={node.x}
      y={node.y - 12}
      className={cn(
        "text-xs fill-muted-foreground transition-opacity duration-300",
        isHighlighted ? "opacity-100 font-semibold fill-foreground" : "opacity-0 group-hover:opacity-100"
      )}
      textAnchor="middle"
    >
      {node.name}
    </text>
  </g>
));
Node.displayName = 'Node';

const Link = React.memo(({ link, isHighlighted, isDimmed }: any) => (
  <motion.line
    x1={link.source.x}
    y1={link.source.y}
    x2={link.target.x}
    y2={link.target.y}
    className={cn(
      "stroke-muted-foreground/30 transition-all duration-300",
      isHighlighted && "stroke-primary/80",
      isDimmed && "opacity-10"
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  />
));
Link.displayName = 'Link';


export function SkillsSection() {
    const [positions, setPositions] = useState<any>({});
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        let newPositions = Object.fromEntries(skillGraph.nodes.map(node => [node.id, { x: width / 2 + (Math.random() - 0.5) * 500, y: height / 2 + (Math.random() - 0.5) * 500 }]));

        const simulationSteps = 120;
        for (let i = 0; i < simulationSteps; i++) {
            const forces: any = {};

            // Repulsion force
            for (const node1 of skillGraph.nodes) {
                forces[node1.id] = { fx: 0, fy: 0 };
                for (const node2 of skillGraph.nodes) {
                    if (node1.id === node2.id) continue;
                    const dx = newPositions[node1.id].x - newPositions[node2.id].x;
                    const dy = newPositions[node1.id].y - newPositions[node2.id].y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = SIMULATION_STRENGTH / (distance * distance);
                    forces[node1.id].fx += (dx / distance) * force;
                    forces[node1.id].fy += (dy / distance) * force;
                }
            }

            // Attraction force
            for (const link of skillGraph.links) {
                const sourceNode = newPositions[link.source];
                const targetNode = newPositions[link.target];
                const dx = targetNode.x - sourceNode.x;
                const dy = targetNode.y - sourceNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const force = 0.03 * distance;
                forces[link.source].fx += (dx / distance) * force;
                forces[link.source].fy += (dy / distance) * force;
                forces[link.target].fx -= (dx / distance) * force;
                forces[link.target].fy -= (dy / distance) * force;
            }

            // Update positions
            for (const node of skillGraph.nodes) {
                newPositions[node.id].x -= forces[node.id].fx;
                newPositions[node.id].y -= forces[node.id].fy;
                
                // Contain within bounds
                newPositions[node.id].x = Math.max(10, Math.min(width - 10, newPositions[node.id].x));
                newPositions[node.id].y = Math.max(10, Math.min(height - 10, newPositions[node.id].y));
            }
        }
        setPositions(newPositions);
    }, []);

    const neighboringNodes = useMemo(() => {
        if (!hoveredNode) return new Set();
        const neighbors = new Set<string>([hoveredNode]);
        skillGraph.links.forEach(link => {
            if (link.source === hoveredNode) neighbors.add(link.target);
            if (link.target === hoveredNode) neighbors.add(link.source);
        });
        return neighbors;
    }, [hoveredNode]);

    const isGraphReady = Object.keys(positions).length === skillGraph.nodes.length;
    
    return (
        <section id="skills" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">03.</span> My Skills Galaxy
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    An interconnected graph of my technical capabilities.
                </p>
            </div>
            <div ref={containerRef} className="relative w-full h-[600px] mt-8 border rounded-lg bg-card/30">
                {isGraphReady && (
                     <svg width="100%" height="100%">
                         {skillGraph.links.map((link: any, i) => {
                             const sourcePos = positions[link.source];
                             const targetPos = positions[link.target];
                             const isHighlighted = hoveredNode && (link.source === hoveredNode || link.target === hoveredNode);
                             return (
                                 <Link 
                                     key={i} 
                                     link={{ ...link, source: sourcePos, target: targetPos }} 
                                     isHighlighted={isHighlighted}
                                     isDimmed={hoveredNode && !isHighlighted}
                                 />
                             )
                         })}
                         {skillGraph.nodes.map(node => {
                            const isHighlighted = neighboringNodes.has(node.id);
                            return (
                                <Node 
                                    key={node.id} 
                                    node={{...node, ...positions[node.id]}}
                                    onMouseEnter={n => setHoveredNode(n.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                    isHighlighted={isHighlighted}
                                    isDimmed={hoveredNode && !isHighlighted}
                                />
                            )
                        })}
                     </svg>
                )}
            </div>
             <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
                {Object.entries(categoryColors).map(([category, colorClass]) => (
                    <div key={category} className="flex items-center gap-2 text-xs">
                        <span className={cn("h-3 w-3 rounded-full", colorClass.replace('text-','bg-'))} />
                        <span className="text-muted-foreground">{category}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
