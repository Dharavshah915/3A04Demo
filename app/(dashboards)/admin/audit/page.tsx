"use client";
import React from "react";
import {
  ClipboardList,
  User,
  Shield,
  RefreshCw,
  Search,
  ChevronRight,
} from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: "SECURITY" | "ALERT" | "SYSTEM" | "CONFIG";
  details: string;
}

const MOCK_LOGS: AuditEntry[] = [
  {
    id: "1",
    timestamp: "2026-04-01 14:30:22",
    user: "c_administrator",
    action: "LOGIN_SUCCESS",
    category: "SECURITY",
    details: "Admin session started from 192.168.1.42",
  },
  {
    id: "2",
    timestamp: "2026-04-01 14:35:10",
    user: "c_administrator",
    action: "THRESHOLD_UPDATE",
    category: "CONFIG",
    details: "AQI Critical threshold changed from 140 to 150",
  },
  {
    id: "3",
    timestamp: "2026-04-01 14:40:05",
    user: "SYSTEM",
    action: "ALERT_TRIGGERED",
    category: "ALERT",
    details: "Industrial Park AQI exceeded 150 (Value: 154.2)",
  },
  {
    id: "4",
    timestamp: "2026-04-01 14:42:15",
    user: "j_operator",
    action: "ALERT_ACKNOWLEDGED",
    category: "ALERT",
    details: "Alert ID #442 acknowledged by operator",
  },
  {
    id: "5",
    timestamp: "2026-04-01 14:45:00",
    user: "SYSTEM",
    action: "SENSOR_HEARTBEAT_FAILURE",
    category: "SYSTEM",
    details: "Sensor node #Z4-99 (Harbor Side) unresponsive",
  },
];

export default function AuditLogsPage() {
  const logs = MOCK_LOGS;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "SECURITY":
        return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      case "ALERT":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "CONFIG":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <ClipboardList className="text-green-500" />
            System Audit Logs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Immutable record of all administrative and system actions.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all border border-gray-700">
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by user or action..."
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
          </div>
          <div className="flex gap-2">
            <span className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-[0.2em] bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
              Retention: 90 Days
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/50 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-5 text-xs font-mono text-gray-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                        {log.user === "SYSTEM" ? (
                          <Shield size={12} className="text-blue-500" />
                        ) : (
                          <User size={12} className="text-gray-400" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-white tracking-tight">
                        {log.user}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-0.5 rounded text-[0.625rem] font-semibold border uppercase tracking-widest ${getCategoryColor(log.category)}`}
                    >
                      {log.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-300">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs text-gray-500 max-w-md truncate">
                      {log.details}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-950/50 border-t border-gray-800 flex justify-center">
          <button className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-1">
            View Full History <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
