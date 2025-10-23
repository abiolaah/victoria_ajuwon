"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  percentage: number;
  title: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  titleClassName?: string;
  percentageClassName?: string;
}

export function CircularProgress({
  percentage,
  title,
  size = 120,
  strokeWidth = 8,
  className,
  titleClassName,
  percentageClassName,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />

          {/* Progress circle with gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" /> {/* Purple */}
              <stop offset="100%" stopColor="#4f46e5" /> {/* Indigo */}
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn("text-white font-bold text-2xl", percentageClassName)}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className={cn("text-white font-bold mt-3 text-center", titleClassName)}
      >
        {title}
      </h3>
    </div>
  );
}
