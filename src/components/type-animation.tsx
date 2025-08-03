"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BLINKING_CURSOR_VARIANTS = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export function TypeAnimation({ sequence, className }: { sequence: string[], className?: string }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = sequence[roleIndex];
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.substring(0, prev.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % sequence.length);
        }
      } else {
        if (displayedText.length < currentRole.length) {
          setDisplayedText((prev) => currentRole.substring(0, prev.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timeoutId = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, roleIndex, sequence]);

  return (
    <span className={cn(
      "bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary",
      className
    )}>
      {displayedText}
      <motion.span
        variants={BLINKING_CURSOR_VARIANTS}
        initial="initial"
        animate="animate"
        className="ml-1 inline-block h-[2.5rem] w-[3px] translate-y-1 bg-current"
      />
    </span>
  );
}
