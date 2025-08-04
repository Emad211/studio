"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillTree } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Type definition for a skill node
type SkillNode = typeof skillTree[0];

// --- Tree Layout Calculation ---
const useTreeLayout = (nodes: SkillNode[]) => {
    return useMemo(() => {
        const nodesById = new Map(nodes.map(n => [n.id, { ...n, children: [] as string[] }]));
        const roots: string[] = [];

        // Build parent-child relationships
        for (const node of nodes) {
            if (node.parent) {
                nodesById.get(node.parent)?.children.push(node.id);
            } else {
                roots.push(node.id);
            }
        }

        const positions = new Map<string, { x: number; y: number }>();
        const subtreeSizes = new Map<string, number>();

        // Calculate subtree size (number of leaf nodes) for each node
        function calculateSubtreeSize(nodeId: string): number {
            const node = nodesById.get(nodeId)!;
            if (node.children.length === 0) {
                subtreeSizes.set(nodeId, 1);
                return 1;
            }
            const size = node.children.reduce((acc, childId) => acc + calculateSubtreeSize(childId), 0);
            subtreeSizes.set(nodeId, size);
            return size;
        }

        // Position nodes using the calculated sizes
        function positionNodes(nodeId: string, depth = 0, xOffset = 0) {
            const node = nodesById.get(nodeId)!;
            const subtreeSize = subtreeSizes.get(nodeId) || 1;
            
            positions.set(nodeId, { y: depth * 120, x: xOffset + subtreeSize / 2 });

            let childXOffset = xOffset;
            for (const childId of node.children) {
                positionNodes(childId, depth + 1, childXOffset);
                childXOffset += subtreeSizes.get(childId) || 0;
            }
        }
        
        // Process each root to create potentially separate trees
        let totalXOffset = 0;
        for (const rootId of roots) {
            calculateSubtreeSize(rootId);
            positionNodes(rootId, 0, totalXOffset);
            totalXOffset += subtreeSizes.get(rootId) || 0;
        }
        
        const totalWidth = totalXOffset;
        const nodePositions = new Map<string, { x: number, y: number }>();

        for (const [id, pos] of positions.entries()) {
            // Center the tree horizontally
            nodePositions.set(id, {
                x: (pos.x / totalWidth) * 100,
                y: pos.y,
            });
        }
        
        return { nodesById, nodePositions };

    }, [nodes]);
};


// --- Components ---

const Node = ({ node, pos, onHover, isActive }: { node: SkillNode, pos: { x: number, y: number }, onHover: (id: string | null) => void, isActive: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="absolute"
            style={{
                top: `${pos.y}px`,
                left: `${pos.x}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
            }}
            onMouseEnter={() => onHover(node.id)}
            onMouseLeave={() => onHover(null)}
        >
             <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="relative group cursor-pointer">
                            <div className={cn(
                                "w-24 h-24 rounded-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300",
                                isActive ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30 scale-110' : 'bg-card border',
                            )}>
                                 <div className="text-xs font-bold font-headline truncate">{node.name}</div>
                                 <div className="text-[10px] text-muted-foreground mt-1">{node.level}%</div>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-bold">{node.name}</p>
                        <p className="text-sm text-muted-foreground">Mastery: {node.level}%</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </motion.div>
    );
};

const Connection = ({ from, to, isHighlighted }: { from: {x:number, y:number}, to: {x:number, y:number}, isHighlighted: boolean }) => {
    const pathD = `M ${from.x} ${from.y} C ${from.x} ${(from.y + to.y) / 2}, ${to.x} ${(from.y + to.y) / 2}, ${to.x} ${to.y}`;
    
    return (
        <motion.path
            d={pathD}
            fill="none"
            strokeWidth="1.5"
            className={cn(
                "transition-all duration-300",
                isHighlighted ? "stroke-primary/80" : "stroke-border"
            )}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        />
    );
};

export function SkillsSection() {
    const { nodesById, nodePositions } = useTreeLayout(skillTree);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const getAncestors = (nodeId: string | null): Set<string> => {
        const ancestors = new Set<string>();
        if (!nodeId) return ancestors;
        let current = nodesById.get(nodeId);
        while (current) {
            ancestors.add(current.id);
            current = current.parent ? nodesById.get(current.parent) : undefined;
        }
        return ancestors;
    };
    
    const activePath = getAncestors(hoveredId);

    return (
        <section id="skills" className="container">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline text-primary">
                    <span className="font-mono text-xl text-secondary">03.</span> My Skills
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    An interactive tree of my technical expertise.
                </p>
            </div>

            <div className="mt-20 w-full max-w-6xl mx-auto">
                <div ref={containerRef} className="relative" style={{ height: '700px' }}>
                    <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                            <g id="connections">
                            {containerWidth > 0 && Array.from(nodesById.values()).map(node => {
                                if (!node.parent) return null;
                                const parentPos = nodePositions.get(node.parent);
                                const childPos = nodePositions.get(node.id);
                                if (!parentPos || !childPos) return null;
                                
                                const fromAbs = { x: parentPos.x / 100 * containerWidth, y: parentPos.y };
                                const toAbs = { x: childPos.x / 100 * containerWidth, y: childPos.y };

                                return (
                                    <Connection
                                        key={`${node.parent}-${node.id}`}
                                        from={{ x: fromAbs.x, y: fromAbs.y + 48 }}
                                        to={{ x: toAbs.x, y: toAbs.y - 48 }}
                                        isHighlighted={activePath.has(node.id) && activePath.has(node.parent)}
                                    />
                                );
                            })}
                            </g>
                        </defs>
                        <use xlinkHref="#connections" />
                    </svg>

                    {Array.from(nodesById.values()).map(node => {
                        const pos = nodePositions.get(node.id);
                        if (!pos) return null;
                        return <Node key={node.id} node={node} pos={pos} onHover={setHoveredId} isActive={activePath.has(node.id)}/>;
                    })}
                </div>
            </div>
        </section>
    );
}
