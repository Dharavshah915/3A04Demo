"use client";
import React from "react";
import { useSensors } from "@/app/context/sensor-context";
import { motion } from "framer-motion";
//little dots for traffic
function TrafficDot({
  pathId,
  duration,
  offset,
  color = "#94a3b8",
}: {
  pathId: string;
  duration: number;
  offset: number;
  color?: string;
}) {
  return (
    <motion.circle
      r="2"
      fill={color}
      opacity="0.6"
      initial={{ offsetDistance: `${offset}%` }}
      animate={{ offsetDistance: ["0%", "100%"] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay: (offset / 100) * duration,
      }}
    >
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${(offset / 100) * duration}s`}
      >
        <mpath xlinkHref={`#${pathId}`} />
      </animateMotion>
    </motion.circle>
  );
}

const CityMapBase = () => {
  return (
    <svg
      viewBox="0 0 800 600"
      className="absolute inset-0 w-full h-full opacity-[0.95] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="urban-density"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="16" height="16" fill="#1f2937" />
          <rect
            x="1"
            y="1"
            width="4"
            height="4"
            rx="1"
            fill="#374151"
            opacity="0.4"
          />
          <rect
            x="8"
            y="2"
            width="5"
            height="3"
            rx="1"
            fill="#1f2937"
            opacity="0.6"
          />
          <rect
            x="2"
            y="9"
            width="3"
            height="5"
            rx="1"
            fill="#4b5563"
            opacity="0.3"
          />
          <rect
            x="10"
            y="10"
            width="4"
            height="4"
            rx="1"
            fill="#374151"
            opacity="0.5"
          />
        </pattern>

        <filter id="sat-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0.2" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </defs>

      <rect width="800" height="600" fill="#111827" />

      <path
        d="M-50,350 Q150,380 200,650 L-50,650 Z"
        fill="#365314"
        opacity="0.7"
      />
      <path
        d="M-20,400 Q120,420 160,650 L-20,650 Z"
        fill="#1a2e05"
        opacity="0.5"
      />

      <ellipse cx="460" cy="340" rx="30" ry="20" fill="#365314" opacity="0.4" />

      <rect x="0" y="0" width="800" height="600" fill="url(#urban-density)" />

      <path
        d="M600,-50 C650,200 720,350 750,650 L850,650 L850,-50 Z"
        fill="#0f172a"
      />
      <path
        d="M600,-50 C650,200 720,350 750,650"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
        opacity="0.2"
      />

      <g fill="none" strokeLinecap="round">
        <path
          id="road-hw-ew"
          d="M-50,500 C200,450 400,350 850,250"
          stroke="#334155"
          strokeWidth="10"
        />
        <path
          d="M-50,500 C200,450 400,350 850,250"
          stroke="#1e293b"
          strokeWidth="6"
        />
        <path
          d="M-50,500 C200,450 400,350 850,250"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeDasharray="2 6"
          opacity="0.2"
        />

        <path
          id="road-hw-ns"
          d="M300,-50 C350,250 250,450 150,650"
          stroke="#334155"
          strokeWidth="8"
        />
        <path
          d="M300,-50 C350,250 250,450 150,650"
          stroke="#1e293b"
          strokeWidth="4"
        />

        <path
          id="road-sec-1"
          d="M50,100 C180,120 350,180 500,280"
          stroke="#2d3748"
          strokeWidth="4"
        />
        <path
          d="M50,100 C180,120 350,180 500,280"
          stroke="#1e293b"
          strokeWidth="2"
        />

        <path
          id="road-sec-2"
          d="M500,50 C480,200 520,350 650,450"
          stroke="#2d3748"
          strokeWidth="4"
        />
        <path
          d="M500,50 C480,200 520,350 650,450"
          stroke="#1e293b"
          strokeWidth="2"
        />

        <path
          id="road-sec-3"
          d="M100,250 C250,230 400,260 550,350"
          stroke="#2d3748"
          strokeWidth="4"
        />
        <path
          d="M100,250 C250,230 400,260 550,350"
          stroke="#1e293b"
          strokeWidth="2"
        />

        <path
          id="road-min-1"
          d="M200,50 L220,550"
          stroke="#1e293b"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          id="road-min-2"
          d="M450,80 L430,520"
          stroke="#1e293b"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          id="road-min-3"
          d="M50,350 L750,200"
          stroke="#1e293b"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          id="road-min-4"
          d="M100,180 L600,160"
          stroke="#1e293b"
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          id="road-min-5"
          d="M80,480 L550,430"
          stroke="#1e293b"
          strokeWidth="2"
          opacity="0.5"
        />

        <path
          id="road-harbor"
          d="M580,100 C590,250 610,380 620,550"
          stroke="#2d3748"
          strokeWidth="3"
        />
      </g>

      <rect
        x="50"
        y="80"
        width="60"
        height="40"
        rx="4"
        fill="#334155"
        opacity="0.4"
      />
      <rect
        x="340"
        y="120"
        width="40"
        height="30"
        rx="3"
        fill="#334155"
        opacity="0.3"
      />
      <circle cx="700" cy="150" r="30" fill="#334155" opacity="0.4" />
      <rect
        x="250"
        y="500"
        width="80"
        height="30"
        rx="2"
        fill="#334155"
        opacity="0.4"
      />
      <rect
        x="400"
        y="380"
        width="35"
        height="45"
        rx="3"
        fill="#334155"
        opacity="0.3"
      />
      <rect
        x="520"
        y="260"
        width="25"
        height="35"
        rx="2"
        fill="#334155"
        opacity="0.25"
      />
      <rect
        x="140"
        y="320"
        width="50"
        height="25"
        rx="3"
        fill="#334155"
        opacity="0.3"
      />

      <g>
        <TrafficDot pathId="road-hw-ew" duration={8} offset={0} />
        <TrafficDot pathId="road-hw-ew" duration={8} offset={25} />
        <TrafficDot pathId="road-hw-ew" duration={8} offset={50} />
        <TrafficDot pathId="road-hw-ew" duration={8} offset={75} />
        <TrafficDot
          pathId="road-hw-ew"
          duration={10}
          offset={12}
          color="#fbbf24"
        />
        <TrafficDot
          pathId="road-hw-ew"
          duration={10}
          offset={60}
          color="#fbbf24"
        />

        <TrafficDot pathId="road-hw-ns" duration={9} offset={0} />
        <TrafficDot pathId="road-hw-ns" duration={9} offset={33} />
        <TrafficDot pathId="road-hw-ns" duration={9} offset={66} />
        <TrafficDot
          pathId="road-hw-ns"
          duration={11}
          offset={15}
          color="#fbbf24"
        />

        <TrafficDot pathId="road-sec-1" duration={12} offset={0} />
        <TrafficDot pathId="road-sec-1" duration={12} offset={45} />
        <TrafficDot pathId="road-sec-2" duration={11} offset={10} />
        <TrafficDot pathId="road-sec-2" duration={11} offset={55} />
        <TrafficDot pathId="road-sec-3" duration={13} offset={20} />
        <TrafficDot pathId="road-sec-3" duration={13} offset={70} />

        <TrafficDot pathId="road-min-1" duration={14} offset={30} />
        <TrafficDot pathId="road-min-2" duration={15} offset={10} />
        <TrafficDot pathId="road-min-3" duration={13} offset={40} />
        <TrafficDot pathId="road-min-4" duration={16} offset={20} />
        <TrafficDot pathId="road-min-5" duration={14} offset={50} />

        <TrafficDot pathId="road-harbor" duration={12} offset={0} />
        <TrafficDot pathId="road-harbor" duration={12} offset={50} />
      </g>

      <rect
        width="800"
        height="600"
        filter="url(#sat-texture)"
        opacity="0.1"
        pointerEvents="none"
      />
    </svg>
  );
};

export const SensorMap = () => {
  const { data } = useSensors();

  const zoneCoords: Record<string, { x: number; y: number }> = {
    "North District": { x: 350, y: 160 },
    "Downtown Zone A": { x: 420, y: 300 },
    "Industrial Park": { x: 150, y: 480 },
    "Harbor Side": { x: 620, y: 450 },
  };

  return (
    <div className="glass-panel p-8 relative overflow-hidden h-[600px] group transition-all duration-500">
      <div className="flex justify-between items-start mb-6 relative z-20 pointer-events-none">
        <div className="flex items-center gap-5">
          <div className="h-12 w-12 rounded-2xl bg-surface-glass border border-border-highlight flex items-center justify-center shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="text-t-pure"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.8" />
                <circle cx="12" cy="12" r="4" strokeOpacity="0.5" />
              </svg>
            </motion.div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-t-pure tracking-wide">
              High-Resolution City Grid
            </h3>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              <p className="text-[0.65rem] text-t-muted uppercase tracking-widest font-medium">
                Sat-Link Established
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-glass border border-border-subtle rounded-2xl px-4 py-2 flex items-center gap-3 backdrop-blur-xl">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-[0.65rem] font-medium text-t-pure uppercase tracking-widest">
            Global Sync
          </span>
        </div>
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center -mt-6">
        <CityMapBase />

        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 w-full h-full drop-shadow-2xl pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {data.map((zone) => {
            const coords = zoneCoords[zone.zone] || { x: 0, y: 0 };
            const isCritical =
              zone.aqi > 150 || zone.temp > 35 || zone.noise > 85;
            const isWarning = zone.aqi > 100 && !isCritical;
            const nodeColor = isCritical
              ? "#ef4444"
              : isWarning
                ? "#fbbf24"
                : "#10b981";

            return (
              <g
                key={zone.zone}
                className="group cursor-pointer pointer-events-auto"
              >
                <motion.circle
                  cx={coords.x}
                  cy={coords.y}
                  r="45"
                  fill="none"
                  stroke={nodeColor}
                  strokeWidth="1"
                  initial={{ scale: 0.5, opacity: 0.6 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeOut",
                  }}
                />

                <g stroke={nodeColor} strokeWidth="1" opacity="0.6">
                  <line
                    x1={coords.x - 20}
                    y1={coords.y}
                    x2={coords.x + 20}
                    y2={coords.y}
                  />
                  <line
                    x1={coords.x}
                    y1={coords.y - 20}
                    x2={coords.x}
                    y2={coords.y + 20}
                  />
                  <circle cx={coords.x} cy={coords.y} r="10" fill="none" />
                </g>

                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="6"
                  fill={nodeColor}
                  filter="url(#node-glow)"
                  className={isCritical ? "animate-pulse" : ""}
                />

                <g className="transition-opacity duration-300">
                  <rect
                    x={coords.x + 12}
                    y={coords.y - 65}
                    width="110"
                    height="42"
                    rx="10"
                    fill="rgba(5, 5, 5, 0.95)"
                    stroke={nodeColor}
                    strokeOpacity="0.2"
                    strokeWidth="1"
                    style={{ backdropFilter: "blur(16px)" }}
                  />
                  <text
                    x={coords.x + 67}
                    y={coords.y - 48}
                    fill="#ffffff"
                    fontSize="10"
                    fontFamily="var(--font-geist-sans)"
                    fontWeight="600"
                    textAnchor="middle"
                    letterSpacing="0.05em"
                  >
                    {zone.zone.split(" ")[0].toUpperCase()}
                  </text>
                  <text
                    x={coords.x + 67}
                    y={coords.y - 34}
                    fill={nodeColor}
                    fontSize="8"
                    fontFamily="var(--font-geist-sans)"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    AQI {Math.round(zone.aqi)} • T {Math.round(zone.temp)}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="absolute bottom-8 right-8 z-20 flex gap-4 pointer-events-none">
        <div className="bg-surface-glass border border-border-subtle rounded-2xl px-5 py-3 backdrop-blur-xl flex flex-col items-end shadow-2xl">
          <span className="text-[0.6rem] text-t-muted uppercase tracking-widest font-medium mb-1">
            Grid Coverage
          </span>
          <span className="text-xl font-light text-t-pure tabular-nums leading-none">
            100%
          </span>
        </div>
        <div className="bg-surface-glass border border-border-subtle rounded-2xl px-5 py-3 backdrop-blur-xl flex flex-col items-end shadow-2xl">
          <span className="text-[0.6rem] text-t-muted uppercase tracking-widest font-medium mb-1">
            Avg Response
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-light text-t-pure tabular-nums leading-none">
              42
            </span>
            <span className="text-[0.65rem] text-t-muted font-medium">ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
