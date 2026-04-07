"use client";
import React, { useState } from "react";
import {
  Bell,
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

interface AlertEvent {
  id: string;
  zone: string;
  metric: string;
  value: string;
  threshold: string;
  timestamp: string;
  status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
  severity: "CRITICAL" | "WARNING" | "INFO";
}

const MOCK_ALERTS: AlertEvent[] = [
  {
    id: "AL-1092",
    zone: "Industrial Park",
    metric: "AQI",
    value: "154",
    threshold: "150",
    timestamp: "2026-04-01 14:30:05",
    status: "ACTIVE",
    severity: "CRITICAL",
  },
  {
    id: "AL-1091",
    zone: "Downtown Zone A",
    metric: "Noise",
    value: "88 dB",
    threshold: "85 dB",
    timestamp: "2026-04-01 14:15:22",
    status: "ACKNOWLEDGED",
    severity: "WARNING",
  },
  {
    id: "AL-1090",
    zone: "North District",
    metric: "Temp",
    value: "36.2°C",
    threshold: "35°C",
    timestamp: "2026-04-01 13:45:00",
    status: "RESOLVED",
    severity: "WARNING",
  },
  {
    id: "AL-1089",
    zone: "Harbor Side",
    metric: "CO2",
    value: "910 ppm",
    threshold: "900 ppm",
    timestamp: "2026-04-01 13:10:12",
    status: "RESOLVED",
    severity: "INFO",
  },
  {
    id: "AL-1088",
    zone: "Industrial Park",
    metric: "AQI",
    value: "162",
    threshold: "150",
    timestamp: "2026-04-01 12:30:55",
    status: "RESOLVED",
    severity: "CRITICAL",
  },
];

export default function AlertHistoryPage() {
  const [alerts] = useState<AlertEvent[]>(MOCK_ALERTS);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "ACKNOWLEDGED":
        return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "RESOLVED":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case "CRITICAL":
        return "bg-red-500";
      case "WARNING":
        return "bg-amber-500";
      case "INFO":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <Bell className="text-green-500" />
            Alert Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Full history of system violations and incident responses.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all border border-gray-700">
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <p className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-widest mb-1">
            Active Alerts
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-white">01</span>
            <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
              <AlertCircle size={18} />
            </div>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <p className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-widest mb-1">
            Response Time (Avg)
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-white">4m 12s</span>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <Clock size={18} />
            </div>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <p className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-widest mb-1">
            Resolved (24h)
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-white">12</span>
            <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
              <CheckCircle2 size={18} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950/30">
          <h3 className="text-sm font-bold text-white tracking-tight">
            Recent Incident Logs
          </h3>
          <button className="inline-flex items-center gap-2 text-[0.625rem] font-semibold text-gray-400 uppercase tracking-widest hover:text-white transition-colors">
            <Filter size={14} />
            Filter Status <ChevronDown size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/50 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Zone / Metric</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {alerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="group hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-5 text-xs font-mono text-gray-500">
                    #{alert.id}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${getSeverityStyle(alert.severity)}`}
                      />
                      <div>
                        <p className="text-sm font-bold text-white">
                          {alert.zone}
                        </p>
                        <p className="text-[0.625rem] text-gray-500 font-bold uppercase tracking-widest">
                          {alert.metric} Alert
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">
                        {alert.value}
                      </span>
                      <span className="text-[0.625rem] text-gray-500 font-medium">
                        Threshold: {alert.threshold}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-gray-400 font-medium">
                    {alert.timestamp}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[0.625rem] font-semibold border uppercase tracking-widest ${getStatusStyle(alert.status)}`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-gray-600 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
