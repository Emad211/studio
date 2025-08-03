"use client"

import { useState, useEffect } from 'react';

export function ReadingProgress() {
  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      setWidth(progress);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial progress
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-16 left-0 h-1 bg-primary z-50 transition-all duration-75 ease-linear"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}
