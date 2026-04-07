"use client";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface TrendChartProps {
  data: any[];
  dataKey: string;
  label: string;
  unit: string;
  color?: string;
}

export const TrendChart = ({
  data,
  dataKey,
  label,
  unit,
  color = "#10b981",
}: TrendChartProps) => {
  return (
    <div className="glass-panel p-8 h-[320px] flex flex-col relative overflow-hidden group">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <h3 className="text-label text-t-muted group-hover:text-t-pure transition-colors">
            {label}
          </h3>
        </div>
        <span className="text-[0.65rem] text-t-faint tracking-widest font-medium">
          {unit}
        </span>
      </div>

      <div className="flex-1 w-full relative z-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`gradient-${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.15} />
                <stop offset="100%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border-subtle)"
            />
            <XAxis hide dataKey="time" />
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface-base)",
                border: "1px solid var(--color-border-highlight)",
                borderRadius: "1rem",
                fontSize: "12px",
                padding: "12px",
                boxShadow: "0 8px 32px -4px rgba(0,0,0,0.4)",
                backdropFilter: "blur(16px)",
              }}
              itemStyle={{ color: "var(--color-t-pure)", fontWeight: 500 }}
              labelStyle={{
                color: "var(--color-t-muted)",
                marginBottom: "8px",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
              cursor={{
                stroke: "var(--color-t-faint)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${dataKey})`}
              isAnimationActive={false}
              activeDot={{
                r: 4,
                strokeWidth: 2,
                stroke: "var(--color-surface-base)",
                fill: color,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
