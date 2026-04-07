"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface DataCardProps {
  label: string;
  value: number;
  unit: string;
  status?: "good" | "warning" | "critical";
  decimals?: number;
}

export const DataCard = ({
  label,
  value,
  unit,
  status = "good",
  decimals = 1,
  compact = false,
}: DataCardProps & { compact?: boolean }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral");

  useEffect(() => {
    if (value > prevValue) setTrend("up");
    else if (value < prevValue) setTrend("down");
    else setTrend("neutral");

    const timer = setTimeout(() => setPrevValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const statusConfig = {
    good: {
      color: "text-emerald-400", //do not change colour this is good
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      indicator: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]",
    },
    warning: {
      color: "text-yellow-400", //or this
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
      indicator: "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
    },
    critical: {
      color: "text-red-400 animate-pulse", //and this all are final
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      indicator: "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.5)]",
    },
  };

  const currentStatus = statusConfig[status];

  if (compact) {
    return (
      <div className="glass-panel p-4 flex flex-col justify-between group h-full">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[0.6rem] uppercase tracking-widest text-t-muted font-medium truncate">
            {label}
          </span>
          <div
            className={`h-1.5 w-1.5 rounded-full ${currentStatus.indicator}`}
          />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-light text-t-pure tabular-nums tracking-tight">
            {value.toFixed(decimals)}
          </span>
          <span className="text-[0.6rem] font-medium text-t-faint uppercase">
            {unit}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 flex flex-col justify-between group h-full">
      <div className="flex justify-between items-start mb-6">
        <span className="text-label text-t-muted group-hover:text-t-pure transition-colors">
          {label}
        </span>
        <div
          className={`px-2.5 py-1 rounded-full text-[0.6rem] font-medium tracking-widest uppercase border ${currentStatus.color} ${currentStatus.bg} ${currentStatus.border}`}
        >
          {status}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <motion.span
          key={value}
          initial={{ opacity: 0.5, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-value"
        >
          {value.toFixed(decimals)}
        </motion.span>
        <span className="text-sm font-medium text-t-faint">{unit}</span>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div
            className={`h-6 w-6 rounded-full flex items-center justify-center ${currentStatus.bg}`}
          >
            {trend === "up" && (
              <TrendingUp
                size={12}
                className={currentStatus.color}
                strokeWidth={2.5}
              />
            )}
            {trend === "down" && (
              <TrendingDown
                size={12}
                className={currentStatus.color}
                strokeWidth={2.5}
              />
            )}
            {trend === "neutral" && (
              <Minus size={12} className="text-t-faint" strokeWidth={2.5} />
            )}
          </div>
          <span
            className={`text-[0.65rem] uppercase tracking-widest font-medium ${trend === "neutral" ? "text-t-faint" : currentStatus.color}`}
          >
            {trend === "neutral" ? "Stable" : trend}
          </span>
        </div>
        <div className="h-1.5 w-16 bg-surface-glass rounded-full overflow-hidden border border-border-subtle">
          <motion.div
            className={`h-full rounded-full ${currentStatus.indicator}`}
            animate={{ width: `${Math.min(100, (value / 200) * 100)}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          />
        </div>
      </div>
    </div>
  );
};
