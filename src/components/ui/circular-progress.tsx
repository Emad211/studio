"use client"
import { useEffect, useState } from "react"

type CircularProgressProps = {
  value: number
  size?: number
  strokeWidth?: number
}

export function CircularProgress({ value, size = 100, strokeWidth = 8 }: CircularProgressProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    // Animate progress on mount
    const animation = requestAnimationFrame(() => setProgress(value))
    return () => cancelAnimationFrame(animation)
  }, [value])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-muted/30"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary transition-all duration-1000 ease-out"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-foreground">
        {Math.round(value)}%
      </span>
    </div>
  )
}
