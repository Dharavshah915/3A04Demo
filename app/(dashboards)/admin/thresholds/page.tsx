"use client";
import React, { useState, useEffect } from "react";
import { useSensors } from "@/app/context/sensor-context";
import {
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Info,
  Search,
  Filter,
  X,
} from "lucide-react";

interface Threshold {
  id: string;
  metric: "aqi" | "temp" | "noise" | "co2" | "humidity";
  value: number;
  condition: "gt" | "lt";
  label: string;
  severity: "warning" | "critical";
}

const INITIAL_THRESHOLDS: Threshold[] = [
  {
    id: "1",
    metric: "aqi",
    value: 100,
    condition: "gt",
    label: "High Air Pollution",
    severity: "warning",
  },
  {
    id: "2",
    metric: "aqi",
    value: 150,
    condition: "gt",
    label: "Hazardous Air Quality",
    severity: "critical",
  },
  {
    id: "3",
    metric: "temp",
    value: 35,
    condition: "gt",
    label: "Heat Wave Warning",
    severity: "warning",
  },
  {
    id: "4",
    metric: "noise",
    value: 85,
    condition: "gt",
    label: "Noise Violation",
    severity: "warning",
  },
];

export default function ThresholdsPage() {
  const { data } = useSensors();
  const [thresholds, setThresholds] = useState<Threshold[]>(INITIAL_THRESHOLDS);
  const [violations, setViolations] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  //new threshold
  const [newRule, setNewRule] = useState<Omit<Threshold, "id">>({
    metric: "aqi",
    value: 100,
    condition: "gt",
    label: "",
    severity: "warning",
  });
  //check for violations
  useEffect(() => {
    const newViolations: Record<string, boolean> = {};

    thresholds.forEach((t) => {
      const isViolating = data.some((zoneData) => {
        const val = zoneData[t.metric as keyof typeof zoneData] as number;
        return t.condition === "gt" ? val > t.value : val < t.value;
      });
      newViolations[t.id] = isViolating;
    });

    setViolations(newViolations);
  }, [data, thresholds]);

  const removeThreshold = (id: string) => {
    setThresholds((prev) => prev.filter((t) => t.id !== id));
  };

  const addThreshold = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    setThresholds((prev) => [...prev, { ...newRule, id }]);
    setIsModalOpen(false);
    setNewRule({
      metric: "aqi",
      value: 100,
      condition: "gt",
      label: "",
      severity: "warning",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            System Thresholds
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure real-time alerting rules for city metrics.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-green-900/20 active:scale-95"
        >
          <Plus size={18} />
          Create New Rule
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">
                New Alerting Rule
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={addThreshold} className="p-6 space-y-4">
              <div>
                <label className="block text-[0.625rem] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Rule Label
                </label>
                <input
                  required
                  value={newRule.label}
                  onChange={(e) =>
                    setNewRule({ ...newRule, label: e.target.value })
                  }
                  type="text"
                  placeholder="e.g., Extreme Heat Warning"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.625rem] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Metric
                  </label>
                  <select
                    value={newRule.metric}
                    onChange={(e) =>
                      setNewRule({ ...newRule, metric: e.target.value as any })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  >
                    <option value="aqi">AQI</option>
                    <option value="temp">Temperature</option>
                    <option value="noise">Noise</option>
                    <option value="co2">CO2</option>
                    <option value="humidity">Humidity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[0.625rem] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Condition
                  </label>
                  <select
                    value={newRule.condition}
                    onChange={(e) =>
                      setNewRule({
                        ...newRule,
                        condition: e.target.value as any,
                      })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  >
                    <option value="gt">Greater Than</option>
                    <option value="lt">Less Than</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[0.625rem] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Value
                  </label>
                  <input
                    required
                    type="number"
                    value={newRule.value}
                    onChange={(e) =>
                      setNewRule({ ...newRule, value: Number(e.target.value) })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[0.625rem] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Severity
                  </label>
                  <select
                    value={newRule.severity}
                    onChange={(e) =>
                      setNewRule({
                        ...newRule,
                        severity: e.target.value as any,
                      })
                    }
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  >
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]"
                >
                  Deploy New Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Search rules..."
            className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-gray-800 text-gray-400 px-4 py-2 rounded-xl text-sm font-medium hover:text-white transition-colors border border-transparent hover:border-gray-700">
            <Filter size={16} />
            Filter
          </button>
          <div className="h-8 w-[1px] bg-gray-800 hidden md:block mx-2" />
          <div className="text-[0.625rem] font-bold text-gray-500 uppercase tracking-widest px-2">
            {thresholds.length} Active Rules
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-950/50 border-b border-gray-800">
              <th className="px-6 py-4 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                Rule Description
              </th>
              <th className="px-6 py-4 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                Metric
              </th>
              <th className="px-6 py-4 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                Condition
              </th>
              <th className="px-6 py-4 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                Status
              </th>
              <th className="px-6 py-4 text-[0.625rem] font-semibold text-gray-500 uppercase tracking-[0.2em] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {thresholds.map((t) => (
              <tr
                key={t.id}
                className="group hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-6 py-5">
                  <div>
                    <p className="text-sm font-bold text-white">{t.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Alert Level:{" "}
                      <span
                        className={
                          t.severity === "critical"
                            ? "text-red-500"
                            : "text-amber-500"
                        }
                      >
                        {t.severity.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 text-[0.625rem] font-bold uppercase tracking-wider border border-gray-700">
                    {t.metric}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">
                      {t.condition === "gt" ? ">" : "<"}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {t.value}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  {violations[t.id] ? (
                    <div className="inline-flex items-center gap-1.5 text-red-500 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full animate-pulse">
                      <AlertTriangle size={14} />
                      <span className="text-[0.625rem] font-semibold uppercase tracking-tight">
                        Active Violation
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-green-500 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={14} />
                      <span className="text-[0.625rem] font-semibold uppercase tracking-tight">
                        Nominal
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
                      <Info size={16} />
                    </button>
                    <button
                      onClick={() => removeThreshold(t.id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
