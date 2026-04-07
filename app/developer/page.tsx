"use client";

import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { delay, duration: 0.5, ease: "easeOut" as const },
});

export default function DeveloperPortal() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-mono selection:bg-green-500/30">
      <motion.div {...fadeUp(0)} className="border-b border-white/5 bg-[#0d0d0d] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-green-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight text-white uppercase tracking-widest">SCEMAS Dev Portal</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[0.625rem] text-green-500 font-bold uppercase tracking-wider">System Operational</span>
          </div>
          <button className="text-[0.625rem] text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-wider underline underline-offset-4 decoration-white/10 hover:decoration-white/30">
            API Keys
          </button>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 p-8 lg:p-12">
        <main className="space-y-16">
          <section>
            <motion.h1 {...fadeUp(0.1)} className="text-3xl font-bold text-white mb-6 tracking-tight">Public API Documentation v1</motion.h1>
            <motion.p {...fadeUp(0.15)} className="text-gray-400 leading-relaxed max-w-2xl mb-12">
              SCEMAS provides a robust, read-only REST interface for third-party developers to access non-sensitive environmental metrics across all city zones.
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden mb-16 shadow-2xl">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">System Status</h3>
                <div className="text-[0.625rem] text-gray-500 font-bold uppercase tracking-tighter">Jan 2026 - Apr 2026</div>
              </div>
              <div className="p-6 space-y-8">
                <StatusGrid name="Telemetry Ingestion" uptime="99.98%" incidents={[{ idx: 23, type: 'warning' }, { idx: 51, type: 'warning' }]} delay={0.3} />
                <StatusGrid name="Alert Engine" uptime="99.91%" incidents={[{ idx: 14, type: 'warning' }, { idx: 37, type: 'down' }]} delay={0.35} />
                <StatusGrid name="Public REST API" uptime="100%" incidents={[]} delay={0.4} />
                <StatusGrid name="Zone Aggregator" uptime="99.95%" incidents={[{ idx: 45, type: 'warning' }]} delay={0.45} />
              </div>
              <div className="p-4 bg-white/5 flex justify-center border-t border-white/5">
                <button className="text-[0.625rem] font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  View Incident History
                </button>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[0.625rem] text-gray-500 font-bold uppercase mb-1">Rate Limit</div>
                <div className="text-white text-sm">100 requests / minute</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[0.625rem] text-gray-500 font-bold uppercase mb-1">Format</div>
                <div className="text-white text-sm">JSON (UTF-8)</div>
              </div>
            </motion.div>
          </section>

          <section className="space-y-12">
            <motion.h2 {...fadeUp(0.55)} className="text-lg font-bold text-white flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Core Endpoints
            </motion.h2>

            <motion.div {...fadeUp(0.6)}>
              <EndpointRow
                method="GET"
                path="/api/v1/zones"
                description="Retrieve a list of all predefined city monitoring zones including their unique IDs and metadata."
              />
            </motion.div>

            <motion.div {...fadeUp(0.65)}>
              <EndpointRow
                method="GET"
                path="/api/v1/metrics/:zone_id"
                description="Get latest high-frequency environmental data (AQI, Temp, PM2.5) for a specific zone."
              />
            </motion.div>

            <motion.div {...fadeUp(0.7)}>
              <EndpointRow
                method="GET"
                path="/api/v1/alerts/active"
                description="Fetch all currently active environmental alerts and their corresponding safety classifications."
              />
            </motion.div>
          </section>
        </main>

        <aside className="lg:sticky lg:top-32 h-fit space-y-6">
          <motion.div {...fadeUp(0.4)} className="rounded-2xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/5">
              <span className="text-[0.625rem] font-bold text-gray-400 uppercase tracking-widest">Example Request</span>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/20" />
              </div>
            </div>
            <div className="p-6">
              <pre className="text-xs leading-relaxed overflow-x-auto text-green-400">
{`curl -X GET "https://api.scemas.city/v1/metrics/downtown-a" \\
     -H "Authorization: Bearer dev_scemas_v1_...8k9j" \\
     -H "Accept: application/json"`}
              </pre>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="rounded-2xl bg-[#141414] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="text-[0.625rem] font-bold text-gray-400 uppercase tracking-widest">Example Response</div>
            <pre className="text-xs leading-relaxed text-blue-400">
{`{
  "zone": "Downtown A",
  "timestamp": "2026-04-01T14:32:01Z",
  "metrics": {
    "aqi": 42.4,
    "pm2_5": 12.1,
    "temp_c": 19.5,
    "co2_ppm": 412
  }
}`}
            </pre>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}

function EndpointRow({ method, path, description }: { method: string; path: string; description: string }) {
  return (
    <div className="group border-l-2 border-white/5 hover:border-green-500 pl-6 transition-all space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-[0.625rem] font-semibold px-2 py-0.5 rounded bg-green-500 text-black uppercase tracking-tighter leading-none">
          {method}
        </span>
        <code className="text-white font-bold text-sm select-all">{path}</code>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed max-w-xl group-hover:text-gray-400 transition-colors">
        {description}
      </p>
    </div>
  );
}

function StatusGrid({ name, uptime, incidents, delay }: { name: string; uptime: string; incidents: { idx: number; type: 'warning' | 'down' }[]; delay: number }) {
  const incidentMap = new Map(incidents.map(i => [i.idx, i.type]));

  return (
    <motion.div {...fadeUp(delay)} className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-[0.625rem] font-bold text-gray-300 uppercase tracking-wider">{name}</span>
        </div>
        <span className="text-[0.625rem] font-bold text-gray-500 tracking-tighter">{uptime} uptime</span>
      </div>
      <div className="flex gap-[2px] h-8">
        {Array.from({ length: 60 }).map((_, i) => {
          const incident = incidentMap.get(i);
          return (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: delay + i * 0.008, duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "bottom" }}
              className={`flex-1 rounded-sm transition-all hover:scale-y-125 hover:opacity-100 ${
                incident === 'down' ? 'bg-red-500' : incident === 'warning' ? 'bg-amber-500' : 'bg-green-500/40'
              }`}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
