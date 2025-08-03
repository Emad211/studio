"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NODE_RADIUS = 8;
const LAYER_SPACING = 120;
const NODE_SPACING = 40;

const layers = [
  { count: 4, x: 50 },
  { count: 5, x: 50 + LAYER_SPACING },
  { count: 5, x: 50 + 2 * LAYER_SPACING },
  { count: 3, x: 50 + 3 * LAYER_SPACING },
];

const totalHeight = Math.max(...layers.map(l => l.count)) * NODE_SPACING;

const nodes = layers.flatMap((layer, i) => {
  const layerHeight = (layer.count - 1) * NODE_SPACING;
  const startY = (totalHeight - layerHeight) / 2;
  return Array.from({ length: layer.count }, (_, j) => ({
    id: `l${i}n${j}`,
    x: layer.x,
    y: startY + j * NODE_SPACING,
    layer: i,
  }));
});

const lines = [];
for (let i = 0; i < layers.length - 1; i++) {
  const currentLayerNodes = nodes.filter(n => n.layer === i);
  const nextLayerNodes = nodes.filter(n => n.layer === i + 1);
  for (const n1 of currentLayerNodes) {
    for (const n2 of nextLayerNodes) {
      lines.push({ id: `${n1.id}-${n2.id}`, x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y });
    }
  }
}

const codeSnippets = [
  { text: "model.add(Dense(128))", x: 20, y: 20 },
  { text: "loss='binary_crossentropy'", x: 300, y: 40 },
  { text: "import tensorflow as tf", x: 150, y: 280 },
  { text: "activation='relu'", x: 400, y: 260 },
  { text: "const pulse = () => {}", x: 20, y: 240 },
]

const PulseDot = ({ x1, y1, x2, y2 }: { x1: number, y1: number, x2: number, y2: number }) => {
    const [dur, setDur] = useState(0);
    const [begin, setBegin] = useState(0);

    useEffect(() => {
        setDur(2 + Math.random() * 2);
        setBegin(Math.random() * 2);
    }, []);

    if (dur === 0) return null;

    return (
        <motion.circle
            r="3"
            fill="hsl(var(--primary))"
        >
            <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                path={`M${x1},${y1} L${x2},${y2}`}
                begin={`${begin}s`}
            />
        </motion.circle>
    );
};

const AnimatedNode = ({ node }: { node: typeof nodes[0] }) => {
    const [dur, setDur] = useState(0);

    useEffect(() => {
        setDur(2 + Math.random() * 2);
    }, []);
    
    if (dur === 0) {
      return (
         <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={NODE_RADIUS}
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: node.layer * 0.2 }}
            filter="url(#glow)"
        />
      )
    }

    return (
        <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={NODE_RADIUS}
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: node.layer * 0.2 }}
            filter="url(#glow)"
        >
            <animate
                attributeName="stroke"
                values="hsl(var(--primary));hsl(var(--secondary));hsl(var(--primary))"
                dur={`${dur}s`}
                repeatCount="indefinite"
            />
        </motion.circle>
    );
};

export function NeuralNetworkAnimation() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative aspect-square w-full max-w-lg mx-auto">
       {isClient && codeSnippets.map((snippet, i) => (
         <motion.p
          key={i}
          className="absolute font-code text-xs text-muted-foreground"
          style={{ top: `${snippet.y}px`, left: `${snippet.x}px` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 2 }}
         >
           {snippet.text}
         </motion.p>
       ))}
      <svg viewBox={`0 0 ${50 + 4 * LAYER_SPACING} ${totalHeight}`} className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lines.map((line, i) => (
          <motion.line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--accent))"
            strokeWidth="0.5"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: i * 0.005 }}
          />
        ))}
        
        {isClient && lines.map((line, i) => i % 5 === 0 && <PulseDot key={`pulse-${line.id}`} {...line} />)}

        {nodes.map(node => (
          <AnimatedNode key={node.id} node={node} />
        ))}
      </svg>
    </div>
  );
}
