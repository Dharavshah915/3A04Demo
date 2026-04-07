"use client";
import { useState, useEffect, type ReactNode } from "react";
import {
  Terminal,
  Activity,
  Shield,
  Key,
  Clock,
  Copy,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export default function ApiStatusPage() {
  const [rps, setRps] = useState(12);
  const [latency, setLatency] = useState(42);

  //apijitter
  useEffect(() => {
    const interval = setInterval(() => {
      setRps((prev) =>
        Math.max(8, Math.min(24, prev + (Math.random() - 0.5) * 4)),
      );
      setLatency((prev) =>
        Math.max(38, Math.min(55, prev + (Math.random() - 0.5) * 2)),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const endpoints = [
    {
      method: "GET",
      path: "/v1/sensors",
      desc: "Retrieve current status of all city zones.",
      status: "OPERATIONAL",
    },
    {
      method: "GET",
      path: "/v1/alerts",
      desc: "List active and historical environmental alerts.",
      status: "OPERATIONAL",
    },
    {
      method: "POST",
      path: "/v1/auth/token",
      desc: "Generate developer access token (OIDC).",
      status: "OPERATIONAL",
    },
    {
      method: "GET",
      path: "/v1/health",
      desc: "System-wide health check and heartbeat.",
      status: "OPERATIONAL",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Terminal className="text-green-500" />
            Developer API Hub
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor public data exposure and external developer traffic.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-[0.625rem] font-semibold uppercase tracking-widest">
            <CheckCircle2 size={12} />
            Public Gateway: Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ApiStat
          label="Requests / Sec"
          value={rps.toFixed(1)}
          icon={<Activity size={16} />}
          trend="+2.4%"
        />
        <ApiStat
          label="Avg Latency"
          value={`${latency.toFixed(0)}ms`}
          icon={<Clock size={16} />}
          trend="Stable"
        />
        <ApiStat
          label="Active Keys"
          value="842"
          icon={<Key size={16} />}
          trend="+12"
        />
        <ApiStat
          label="Auth Success"
          value="99.98%"
          icon={<Shield size={16} />}
          trend="Optimal"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] px-2">
            Endpoint Registry
          </h3>
          <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950/50 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Path</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {endpoints.map((ep) => (
                  <tr
                    key={ep.path}
                    className="group hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[0.625rem] font-semibold tracking-widest ${ep.method === "GET" ? "text-blue-500 bg-blue-500/10" : "text-purple-500 bg-purple-500/10"}`}
                      >
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-white group-hover:text-green-400 transition-colors">
                      {ep.path}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {ep.desc}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-green-500">
                        <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[0.625rem] font-semibold uppercase tracking-tight">
                          {ep.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] px-2">
            Quick Integration
          </h3>
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-between">
                Base URL
                <Copy size={12} className="cursor-pointer hover:text-white" />
              </p>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 font-mono text-xs text-green-500 break-all">
                https://api.scemas.smartcity.gov
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-between">
                CURL Request
                <Copy size={12} className="cursor-pointer hover:text-white" />
              </p>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 font-mono text-[0.625rem] text-gray-400 whitespace-pre-wrap leading-relaxed">
                {`curl -X GET "https://api.scemas.smartcity.gov/v1/sensors" \\
-H "Authorization: Bearer \${TOKEN}" \\
-H "Accept: application/json"`}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-2xl text-[0.625rem] font-semibold uppercase tracking-widest transition-all border border-gray-700">
              Open API Docs
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiStat({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  trend: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-8 rounded-xl bg-gray-950 flex items-center justify-center text-gray-400 border border-gray-800">
          {icon}
        </div>
        <span className="text-[0.625rem] font-semibold text-green-500 uppercase tracking-widest">
          {trend}
        </span>
      </div>
      <p className="text-[0.625rem] font-semibold text-gray-500 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-semibold text-white tracking-tight mt-1">
        {value}
      </p>
    </div>
  );
}
