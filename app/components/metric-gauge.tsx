"use client";
import React from "react";
import { motion } from "framer-motion";

interface MetricGaugeProps {
  value: number;
  min?: number;
  max?: number;
  label: string;
  unit: string;
  color?: "accent-admin" | "warning" | "critical" | "info";
}

export const MetricGauge = ({
  value,
  min = 0,
  max = 200,
  label,
  unit,
  color = "accent-admin",
}: MetricGaugeProps) => {
  const percentage = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100),
  );

  const getColorHex = (val: number) => {
    //get color hex
    if (color === "info") {
      //info color
      if (val < max * 0.4) return "#3b82f6";
      if (val < max * 0.7) return "#fbbf24";
      return "#ef4444";
    }
    if (color === "warning") {
      //warning color
      if (val < max * 0.4) return "#fbbf24";
      if (val < max * 0.7) return "#fbbf24";
      return "#ef4444";
    }
    if (val < max * 0.4) return "#10b981"; //good color
    if (val < max * 0.7) return "#fbbf24";
    return "#ef4444";
  };

  const activeColor = getColorHex(value); //get active color

  const radius = 45; //change this to change the size of the gauge 50 is also good
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-18 overflow-hidden mb-1">
        <svg
          className="absolute top-0 left-0 w-full h-36 -rotate-180"
          viewBox="0 0 110 110"
        >
          <defs>
            <filter id="gauge-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/*this is for background*/}
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="var(--color-border-subtle)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset="0"
          />

          {/*this is for the actual gauge*/}
          <motion.circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke={activeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ type: "spring", stiffness: 45, damping: 15 }}
            filter="url(#gauge-glow)"
          />
        </svg>

        {/*value text*/}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-2xl font-light tracking-tight tabular-nums text-t-pure leading-none">
            {Math.round(value)}
          </span>
        </div>
      </div>

      <div className="text-center mt-1">
        <div className="flex items-center justify-center gap-1.5">
          <p className="text-[0.55rem] uppercase tracking-widest font-medium text-t-muted">
            {label}
          </p>
          <span className="text-[0.5rem] text-t-faint font-medium px-1 rounded bg-surface-glass border border-border-subtle uppercase">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};
