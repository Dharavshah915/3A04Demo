"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSensors } from "@/app/context/sensor-context";
import { DataCard } from "@/app/components/data-card";
import { MetricGauge } from "@/app/components/metric-gauge";
import { TrendChart } from "@/app/components/trend-chart";
import { SensorMap } from "@/app/components/sensor-map";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldAlert,
  Cpu,
  Database,
  Zap,
  Send,
  X,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Wifi,
  Lock,
} from "lucide-react";

export default function AdminOverview() {
  const { data, triggerPollutionSpike, stopPollutionSpike, isSpiking } =
    useSensors();
  const [history, setHistory] = useState<any[]>([]);
  const [irNotified, setIrNotified] = useState(false);
  const [isIrModalOpen, setIsIrModalOpen] = useState(false);
  const [irMessage, setIrMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleToggleSimulation = () => {
    if (isSpiking) {
      stopPollutionSpike();
      setIrNotified(false);
      setIrMessage("");
      setShowSuccessToast(false);
    } else {
      triggerPollutionSpike();
    }
  };

  const openIrModal = () => {
    if (!isSpiking && activeAlertsCount === 0) return;
    if (irNotified) return;
    setIsIrModalOpen(true);
  };

  const confirmDispatchIR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!irMessage.trim()) return;
    setIrNotified(true);
    setIsIrModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  const activeAlertsCount = useMemo(() => {
    return data.filter(
      (zone) => zone.aqi > 150 || zone.temp > 35 || zone.noise > 85,
    ).length;
  }, [data]);

  const avgAqi = data.reduce((acc, curr) => acc + curr.aqi, 0) / data.length;
  const avgTemp = data.reduce((acc, curr) => acc + curr.temp, 0) / data.length;
  const avgCo2 = data.reduce((acc, curr) => acc + curr.co2, 0) / data.length;
  const avgNoise =
    data.reduce((acc, curr) => acc + curr.noise, 0) / data.length;

  useEffect(() => {
    const newEntry = {
      time: new Date().toLocaleTimeString(),
      aqi: avgAqi,
      temp: avgTemp,
      co2: avgCo2,
    };
    setHistory((prev) => [...prev, newEntry].slice(-20));
  }, [avgAqi, avgTemp, avgCo2]);

  return (
    <div className="space-y-8 relative animate-smooth-fade">
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md"
          >
            <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-2xl backdrop-blur-2xl p-5 flex items-start gap-5">
              <div className="h-10 w-10 rounded-2xl bg-accent-admin/10 border border-accent-admin/20 flex items-center justify-center text-accent-admin shrink-0">
                <Wifi size={20} strokeWidth={1.5} />
              </div>
              <div className="flex-1 pt-0.5">
                <h4 className="text-sm font-semibold tracking-wide text-t-pure">
                  Transmission Secure
                </h4>
                <p className="text-[0.8rem] text-t-muted font-light mt-1">
                  Incident Response team mobilized.
                </p>
              </div>
              <Lock size={16} strokeWidth={1.5} className="text-t-muted mt-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isIrModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] shadow-2xl backdrop-blur-2xl"
            >
              <div className="p-8 border-b border-border-subtle flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <ShieldAlert
                      size={20}
                      className="text-red-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-medium text-t-pure tracking-wide">
                    Dispatch Protocol
                  </h3>
                </div>
                <button
                  onClick={() => setIsIrModalOpen(false)}
                  className="text-t-muted hover:text-t-pure transition-colors"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              <form onSubmit={confirmDispatchIR} className="p-8 space-y-8">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 flex gap-5 items-start">
                  <AlertCircle
                    className="text-red-400 mt-0.5"
                    size={20}
                    strokeWidth={1.5}
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-red-400 tracking-wide">
                      Critical Breach
                    </p>
                    <p className="text-sm text-t-muted font-light leading-relaxed">
                      Provide a brief situation report for the Incidence
                      Response Team.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-label text-t-muted flex items-center gap-2 ml-1">
                    <MessageSquare size={14} strokeWidth={2} />
                    Situation Report
                  </label>
                  <textarea
                    autoFocus
                    value={irMessage}
                    onChange={(e) => setIrMessage(e.target.value)}
                    placeholder="Enter instructions..."
                    className="w-full bg-surface-glass border border-border-subtle rounded-2xl p-5 text-sm text-t-pure focus:outline-none focus:border-accent-admin focus:bg-white/5 min-h-[120px] placeholder:text-t-faint resize-none transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsIrModalOpen(false)}
                    className="flex-1 bg-surface-glass hover:bg-white/5 text-t-pure py-4 rounded-2xl text-[0.85rem] font-medium tracking-wide transition-colors border border-border-subtle"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-accent-admin hover:bg-emerald-400 text-surface-base py-4 rounded-2xl text-[0.85rem] font-semibold tracking-wide transition-colors flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                  >
                    <Send size={18} strokeWidth={2} />
                    Confirm Dispatch
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 space-y-8">
          <SensorMap />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TrendChart
              data={history}
              dataKey="aqi"
              label="Air Quality Index"
              unit="AQI"
              color="#10b981"
            />
            <TrendChart
              data={history}
              dataKey="temp"
              label="Temperature"
              unit="°C"
              color="#fbbf24"
            />
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-3 pb-6 border-b border-border-subtle">
            <SidebarStat
              icon={<Cpu />}
              label="Sensors"
              value="142"
              total="145"
              color="accent-admin"
            />
            <SidebarStat
              icon={<Activity />}
              label="Load"
              value="12%"
              color="info"
            />
            <SidebarStat
              icon={
                <ShieldAlert
                  className={
                    activeAlertsCount > 0 || isSpiking ? "animate-pulse" : ""
                  }
                />
              }
              label="Alerts"
              value={activeAlertsCount.toString()}
              color={
                activeAlertsCount > 0 || isSpiking ? "critical" : "warning"
              }
            />
            <SidebarStat
              icon={<Database />}
              label="Uptime"
              value="99.9%"
              color="accent-admin"
            />
          </div>

          <div className="flex flex-col gap-3 pb-6 border-b border-border-subtle">
            <button
              onClick={openIrModal}
              className={`w-full py-3 rounded-xl text-[0.7rem] uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                (activeAlertsCount > 0 || isSpiking) && !irNotified
                  ? "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_20px_rgba(239,68,68,0.2)]"
                  : "bg-surface-glass text-t-muted border border-border-subtle"
              }`}
            >
              {irNotified ? <CheckCircle2 size={14} /> : <Send size={14} />}
              {irNotified ? "Dispatched" : "Dispatch IR Team"}
            </button>
            <button
              onClick={handleToggleSimulation}
              className={`w-full py-3 rounded-xl text-[0.7rem] uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 border ${
                isSpiking
                  ? "bg-red-500/10 text-red-500 border-red-500/30"
                  : "bg-surface-glass text-t-pure border-border-subtle hover:bg-white/5"
              }`}
            >
              <Zap
                size={14}
                className={isSpiking ? "text-red-500" : "text-t-muted"}
              />
              {isSpiking ? "End Sim" : "Run Simulation"}
            </button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6 px-1">
              <h3 className="text-[0.6rem] uppercase tracking-[0.15em] font-bold text-t-muted">
                Live Gauges
              </h3>
            </div>
            <div className="space-y-6">
              <MetricGauge label="Air Quality" unit="AQI" value={avgAqi} />
              <MetricGauge
                label="Temperature"
                unit="°C"
                value={avgTemp}
                max={50}
                color="warning"
              />
              <MetricGauge
                label="Carbon Dioxide"
                unit="PPM"
                value={avgCo2}
                max={1000}
                color="info"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle">
            <div className="grid grid-cols-2 gap-3">
              <DataCard
                label="AQI"
                value={avgAqi}
                unit="AQI"
                status={avgAqi > 100 ? "warning" : "good"}
                compact
              />
              <DataCard
                label="Noise"
                value={avgNoise}
                unit="dB"
                status={avgNoise > 80 ? "warning" : "good"}
                compact
              />
              <DataCard
                label="Temp"
                value={avgTemp}
                unit="°C"
                status={avgTemp > 30 ? "warning" : "good"}
                compact
              />
              <DataCard
                label="CO2"
                value={avgCo2}
                unit="ppm"
                status={avgCo2 > 800 ? "warning" : "good"}
                compact
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarStat({
  icon,
  label,
  value,
  total,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  total?: string;
  color: "accent-admin" | "warning" | "critical" | "info";
}) {
  const iconColor =
    color === "accent-admin"
      ? "text-accent-admin"
      : color === "warning"
        ? "text-yellow-400"
        : color === "critical"
          ? "text-red-500"
          : "text-blue-400";

  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
      <div className="flex items-center gap-2 opacity-60">
        {React.cloneElement(icon as any, {
          size: 12,
          strokeWidth: 2,
          className: iconColor,
        })}
        <span className="text-[0.55rem] uppercase tracking-wider font-bold text-t-muted">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className="text-lg font-light text-t-pure leading-none">
          {value}
        </span>
        {total && (
          <span className="text-[0.6rem] font-medium text-t-faint">
            /{total}
          </span>
        )}
      </div>
    </div>
  );
}
