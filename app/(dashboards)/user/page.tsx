"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useSensors } from "@/app/context/sensor-context";
import {
  Thermometer,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Volume2,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Shield,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function useNow() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function CitizenPortal() {
  const { data } = useSensors();
  const now = useNow();

  //demo transitions: idle -> spike -> notif
  const [demoState, setDemoState] = useState<
    "idle" | "alert_active" | "advisory_active"
  >("idle");

  const handleTriggerSpike = () => {
    setDemoState("alert_active");
    //transition to notifs after some time
    setTimeout(() => {
      setDemoState((current) =>
        current === "alert_active" ? "advisory_active" : current,
      );
    }, 5000);
  };
  const handleShowAdvisories = () => setDemoState("advisory_active");
  const resetDemo = () => setDemoState("idle");

  const avgAqi = useMemo(
    () => data.reduce((a, c) => a + c.aqi, 0) / data.length,
    [data],
  );
  const worstZone = useMemo(
    () => data.reduce((a, c) => (c.aqi > a.aqi ? c : a), data[0]),
    [data],
  );
  const bestZone = useMemo(
    () => data.reduce((a, c) => (c.aqi < a.aqi ? c : a), data[0]),
    [data],
  );
  const isSafe = avgAqi < 100 && demoState === "idle";
  const isEmergency = demoState === "advisory_active";

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8] text-slate-800 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] rounded-full bg-indigo-200/20 blur-[100px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-sky-100/30 blur-[120px]" />
        <motion.div //spike transition
          className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-transparent to-orange-100/20"
          initial={false}
          animate={{ opacity: demoState === "alert_active" ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-red-200/25 via-transparent to-rose-100/15"
          initial={false}
          animate={{ opacity: isEmergency ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />
      </div>
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm relative z-20">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <ShieldCheck className="text-white" size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 tracking-tight">
              SCEMAS City Monitor
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-[0.6875rem] text-slate-400">
                Environmental Safety Portal
              </p>
              <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-100/50">
                <MapPin size={10} className="text-blue-500" />
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  Industrial District
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-[0.6875rem] text-slate-400">
            <Clock size={12} />
            <span className="tabular-nums">
              {now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isSafe ? "safe" : isEmergency ? "emergency" : "elevated"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                isEmergency
                  ? "bg-red-500/10 border-red-500/20"
                  : isSafe
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-amber-500/10 border-amber-500/20"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full animate-pulse ${
                  isEmergency
                    ? "bg-red-500"
                    : isSafe
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isEmergency
                    ? "text-red-600"
                    : isSafe
                      ? "text-emerald-600"
                      : "text-amber-600"
                }`}
              >
                {isEmergency ? "Emergency" : isSafe ? "All Clear" : "Elevated"}
              </span>
            </motion.div>
          </AnimatePresence>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
          >
            Sign Out
          </Link>
        </div>
      </header>
      {/* emergency notif */}
      <AnimatePresence>
        {isEmergency && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="overflow-hidden relative z-10"
          >
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, -8, 8, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <AlertTriangle size={20} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">
                    Environmental Advisory Active
                  </p>
                  <p className="text-red-100 text-xs mt-0.5">
                    Multiple zones affected. Follow zone-specific instructions
                    below.
                  </p>
                </div>
                <span className="text-red-200 text-xs tabular-nums hidden sm:block">
                  Issued{" "}
                  {now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full pb-20 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <SummaryCard
            label="City AQI"
            value={Math.round(avgAqi).toString()}
            sub={avgAqi < 50 ? "Good" : avgAqi < 100 ? "Moderate" : "Unhealthy"}
            color={avgAqi < 50 ? "emerald" : avgAqi < 100 ? "amber" : "red"}
            icon={<Wind size={14} />}
          />
          <SummaryCard
            label="Worst Zone"
            value={worstZone?.zone.split(" ")[0]}
            sub={`AQI ${Math.round(worstZone?.aqi ?? 0)}`}
            color={
              worstZone?.aqi > 100
                ? "red"
                : worstZone?.aqi > 50
                  ? "amber"
                  : "emerald"
            }
            icon={<TrendingUp size={14} />}
          />
          <SummaryCard
            label="Best Zone"
            value={bestZone?.zone.split(" ")[0]}
            sub={`AQI ${Math.round(bestZone?.aqi ?? 0)}`}
            color="emerald"
            icon={<TrendingDown size={14} />}
          />
          <SummaryCard
            label="Zones Monitored"
            value={data.length.toString()}
            sub="All sensors online"
            color="blue"
            icon={<Activity size={14} />}
          />
        </div>

        <div className="mb-4 flex items-center gap-3">
          <MapPin size={15} className="text-blue-500" />
          <h2 className="text-[0.8125rem] font-semibold text-slate-700">
            Zone Details
          </h2>
          <div className="flex-1 h-px bg-slate-200/60 ml-2" />
          <span className="text-[0.6875rem] text-slate-400">
            Updated just now
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* zone based cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((zone, i) => {
              const aqiLabel =
                zone.aqi < 50
                  ? "Good"
                  : zone.aqi < 100
                    ? "Moderate"
                    : zone.aqi < 150
                      ? "Unhealthy"
                      : "Hazardous";
              const isUserLocation = zone.zone === "Industrial Park";

              const statusColors =
                zone.aqi < 50
                  ? {
                      bg: "bg-emerald-50",
                      text: "text-emerald-700",
                      border: "border-emerald-200/50",
                      dot: "bg-emerald-500",
                    }
                  : zone.aqi < 100
                    ? {
                        bg: "bg-amber-50",
                        text: "text-amber-700",
                        border: "border-amber-200/50",
                        dot: "bg-amber-500",
                      }
                    : zone.aqi < 150
                      ? {
                          bg: "bg-orange-50",
                          text: "text-orange-700",
                          border: "border-orange-200/50",
                          dot: "bg-orange-500",
                        }
                      : {
                          bg: "bg-red-50",
                          text: "text-red-700",
                          border: "border-red-200/50",
                          dot: "bg-red-500",
                        };

              const aqiBg =
                zone.aqi < 50
                  ? "from-emerald-500 to-emerald-600"
                  : zone.aqi < 100
                    ? "from-amber-400 to-amber-500"
                    : zone.aqi < 150
                      ? "from-orange-500 to-orange-600"
                      : "from-red-500 to-red-600";

              const trend = zone.aqi - zone.aqiAvg5m;
              const TrendIcon =
                trend > 3 ? TrendingUp : trend < -3 ? TrendingDown : Minus;
              const trendColor =
                trend > 3
                  ? "text-red-500"
                  : trend < -3
                    ? "text-emerald-500"
                    : "text-slate-300";

              return (
                <motion.div
                  key={zone.zone}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.07,
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                  }}
                  className={`bg-white rounded-2xl border ${isUserLocation ? "border-blue-300 ring-2 ring-blue-500/10" : "border-slate-200/80"} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group`}
                >
                  <div
                    className={`px-5 py-4 flex items-center justify-between border-b ${isUserLocation ? "bg-blue-50/30 border-blue-100/50" : "border-slate-50"}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                          {zone.zone}
                        </h3>
                        {isUserLocation && (
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500 text-[8px] font-black text-white uppercase tracking-tighter shadow-sm shadow-blue-500/20">
                            <MapPin size={8} fill="currentColor" />
                            YOU
                          </div>
                        )}
                        <div
                          className={`p-1 rounded-md bg-slate-50 border border-slate-100`}
                        >
                          <TrendIcon size={12} className={trendColor} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div
                          className={`h-1 w-1 rounded-full ${statusColors.dot} animate-pulse`}
                        />
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Live Updates
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-2.5 py-1 rounded-lg border shadow-sm flex items-center gap-2 ${statusColors.bg} ${statusColors.border}`}
                    >
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${statusColors.text}`}
                      >
                        {aqiLabel}
                      </span>
                    </div>
                  </div>

                  <div className="px-5 py-5 grid grid-cols-3 gap-3">
                    <MetricPill
                      icon={<Wind size={13} />}
                      value={`${Math.round(zone.aqi)}`}
                      label="AQI"
                      color={
                        zone.aqi < 50
                          ? "text-emerald-600"
                          : zone.aqi < 100
                            ? "text-amber-600"
                            : zone.aqi < 150
                              ? "text-orange-600"
                              : "text-red-600"
                      }
                    />
                    <MetricPill
                      icon={<Thermometer size={13} />}
                      value={`${Math.round(zone.temp)}°`}
                      label="Temp"
                      color={
                        zone.temp > 32
                          ? "text-orange-600"
                          : zone.temp < 10
                            ? "text-blue-600"
                            : "text-slate-800"
                      }
                    />
                    <MetricPill
                      icon={<Volume2 size={13} />}
                      value={`${Math.round(zone.noise)}`}
                      label="dB"
                      color={
                        zone.noise > 75 ? "text-orange-600" : "text-slate-800"
                      }
                    />
                  </div>

                  <div className="px-5 pb-3">
                    <div className="flex items-center justify-between text-[0.625rem] text-slate-400 mb-1">
                      <span>1h peak: {Math.round(zone.aqiMax1h)}</span>
                      <span>5m avg: {Math.round(zone.aqiAvg5m)}</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${aqiBg}`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (zone.aqi / 200) * 100)}%`,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={15} className="text-blue-500" />
                <h3 className="text-sm font-semibold text-slate-900">Alerts</h3>
                {demoState !== "idle" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 rounded-full bg-red-500 animate-pulse ml-auto"
                  />
                )}
              </div>

              <AnimatePresence mode="wait">
                {isEmergency ? (
                  <motion.div
                    key="advisory"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2.5"
                  >
                    {[
                      {
                        zone: "Industrial Park",
                        msg: "Evacuate immediately. Proceed east to North District evacuation center at 140 Ridge Ave. N95 masks required — distribution station at Harbor Side Community Hall.",
                        severity: "critical" as const,
                        delay: 0.05,
                      },
                      {
                        zone: "Downtown Zone A",
                        msg: "Shelter in place until further notice. Seal all windows and shut off HVAC intake. Avoid travel toward Industrial Park. If outdoors, proceed to nearest indoor facility.",
                        severity: "warning" as const,
                        delay: 0.15,
                      },
                      {
                        zone: "North District",
                        msg: "No action required. Wind patterns shifting NNW — monitor updates for possible reclassification. Evacuation center at 140 Ridge Ave is open for Industrial Park residents.",
                        severity: "info" as const,
                        delay: 0.25,
                      },
                    ].map((alert) => (
                      <motion.div
                        key={alert.zone}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: alert.delay,
                          type: "spring",
                          stiffness: 220,
                          damping: 20,
                        }}
                      >
                        <AlertCard
                          zone={alert.zone}
                          msg={alert.msg}
                          severity={alert.severity}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : demoState === "alert_active" ? (
                  <motion.div
                    key="alert"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                      }}
                      className="flex items-center gap-2.5 px-3.5 py-3 bg-amber-50 border border-amber-200/80 rounded-xl"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <AlertTriangle size={15} className="text-amber-500" />
                      </motion.div>
                      <div>
                        <p className="text-xs font-semibold text-amber-800">
                          Spike Detected
                        </p>
                        <p className="text-[0.6875rem] text-amber-600/80 mt-0.5">
                          Industrial Park
                        </p>
                      </div>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs text-slate-500 leading-relaxed px-1"
                    >
                      Elevated AQI levels detected. System is automatically
                      preparing zone-specific advisories...
                    </motion.p>
                    <div className="relative h-1 bg-amber-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5.0, ease: "linear" }}
                        className="h-full bg-amber-500"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-11 w-11 rounded-full bg-emerald-50 flex items-center justify-center mb-3"
                    >
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    </motion.div>
                    <span className="text-sm font-medium text-slate-600">
                      All Clear
                    </span>
                    <span className="text-xs text-slate-400 mt-1 mb-5">
                      No active alerts
                    </span>
                    <div className="w-full space-y-2.5 pt-4 border-t border-slate-100">
                      <p className="text-[0.6875rem] font-medium text-slate-500 px-1">
                        Safety Tips
                      </p>
                      {[
                        "Check air quality before outdoor exercise",
                        "Keep windows closed when AQI exceeds 100",
                        "N95 masks recommended above AQI 150",
                      ].map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 px-1">
                          <Shield
                            size={10}
                            className="text-blue-400 mt-0.5 shrink-0"
                          />
                          <span className="text-[0.6875rem] text-slate-400 leading-snug">
                            {tip}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 px-6 py-2.5 flex justify-between items-center z-[100] shadow-lg shadow-black/5">
        <div className="flex items-center gap-6">
          <span className="text-[0.6875rem] font-medium text-slate-400 uppercase tracking-widest">
            Demo Control
          </span>{" "}
          {/* arrow like -> will nto work, i am using -{">"} */}
          {demoState === "idle" && (
            <button
              onClick={handleTriggerSpike}
              className="text-[0.6875rem] font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors px-2 py-1"
            >
              1. Trigger Spike -{">"}
            </button>
          )}
          {demoState === "alert_active" && (
            <button
              onClick={handleShowAdvisories}
              className="text-[0.6875rem] font-bold text-amber-600 hover:text-amber-700 cursor-pointer transition-colors px-2 py-1"
            >
              2. Issue Advisories -{">"}
            </button>
          )}
          {demoState === "advisory_active" && (
            <button
              onClick={resetDemo}
              className="text-[0.6875rem] font-bold text-red-500 hover:text-red-600 cursor-pointer transition-colors px-2 py-1"
            >
              Reset Simulation
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
            SCEMAS v1.0
          </span>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  color: "emerald" | "amber" | "red" | "blue";
  icon: React.ReactNode;
}) {
  const accents = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-3.5 ${accents[color]}`}
    >
      <div className="flex items-center gap-1.5 mb-2 opacity-70">
        {icon}
        <span className="text-[0.6875rem] font-medium">{label}</span>
      </div>
      <p className="text-lg font-bold leading-none">{value}</p>
      <p className="text-[0.6875rem] opacity-60 mt-1">{sub}</p>
    </motion.div>
  );
}

function MetricPill({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center py-2.5 px-2 bg-slate-50/80 rounded-xl">
      <span className="text-slate-400 mb-1.5">{icon}</span>
      <span className={`text-sm font-semibold tabular-nums ${color}`}>
        {value}
      </span>
      <span className="text-[0.625rem] text-slate-400 mt-0.5">{label}</span>
    </div>
  );
}

function AlertCard({
  zone,
  msg,
  severity,
}: {
  zone: string;
  msg: string;
  severity: "critical" | "warning" | "info";
}) {
  const config = {
    critical: {
      bg: "bg-red-50",
      border: "border-red-200/80",
      title: "text-red-700",
      icon: "text-red-400",
      badge: "bg-red-100 text-red-600",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200/80",
      title: "text-amber-700",
      icon: "text-amber-400",
      badge: "bg-amber-100 text-amber-600",
    },
    info: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      title: "text-slate-600",
      icon: "text-slate-400",
      badge: "bg-slate-100 text-slate-500",
    },
  };
  const c = config[severity];
  const badgeLabel =
    severity === "critical"
      ? "Urgent"
      : severity === "warning"
        ? "Warning"
        : "Monitor";

  return (
    <div className={`p-3.5 rounded-xl border ${c.bg} ${c.border}`}>
      <div className="flex items-center justify-between mb-1.5">
        <h4 className={`text-xs font-semibold ${c.title}`}>{zone}</h4>
        <span
          className={`text-[0.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${c.badge}`}
        >
          {badgeLabel}
        </span>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{msg}</p>
    </div>
  );
}
