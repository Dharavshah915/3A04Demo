"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useSensors } from '@/app/context/sensor-context';
import { DataCard } from '@/app/components/data-card';
import { MetricGauge } from '@/app/components/metric-gauge';
import { TrendChart } from '@/app/components/trend-chart';
import { SensorMap } from '@/app/components/sensor-map';
import { Activity, ShieldAlert, Cpu, Database } from 'lucide-react';

export default function OperatorOverview() {
  const { data, isSpiking } = useSensors();
  const [history, setHistory] = useState<any[]>([]);

  const activeAlertsCount = useMemo(() => {
    return data.filter(zone =>
      zone.aqi > 150 || zone.temp > 35 || zone.noise > 85
    ).length;
  }, [data]);

  const avgAqi = data.reduce((acc, curr) => acc + curr.aqi, 0) / data.length;
  const avgTemp = data.reduce((acc, curr) => acc + curr.temp, 0) / data.length;
  const avgCo2 = data.reduce((acc, curr) => acc + curr.co2, 0) / data.length;
  const avgNoise = data.reduce((acc, curr) => acc + curr.noise, 0) / data.length;

  useEffect(() => {
    setHistory(prev => {
      const newEntry = {
        time: new Date().toLocaleTimeString(),
        aqi: avgAqi,
        temp: avgTemp,
        co2: avgCo2
      };
      return [...prev, newEntry].slice(-20);
    });
  }, [avgAqi, avgTemp, avgCo2]);

  return (
    <div className="space-y-8 animate-smooth-fade">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 space-y-8">
          <SensorMap />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TrendChart data={history} dataKey="aqi" label="Air Quality Index" unit="AQI" color="#3b82f6" />
            <TrendChart data={history} dataKey="temp" label="Temperature" unit="°C" color="#fbbf24" />
          </div>
        </div>

        <div className="glass-panel p-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-3 pb-6 border-b border-border-subtle">
            <SidebarStat icon={<Cpu />} label="Sensors" value="142" total="145" color="accent-operator" />
            <SidebarStat icon={<Activity />} label="Load" value="12%" color="accent-operator" />
            <SidebarStat
              icon={<ShieldAlert className={activeAlertsCount > 0 ? "animate-pulse" : ""} />}
              label="Alerts"
              value={activeAlertsCount.toString()}
              color={activeAlertsCount > 0 ? "critical" : "warning"}
            />
            <SidebarStat icon={<Database />} label="Uptime" value="99.9%" color="accent-operator" />
          </div>

          {isSpiking && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-[0.65rem] font-bold text-red-500 tracking-widest uppercase">Simulation Active</span>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-6 px-1">
               <h3 className="text-[0.6rem] uppercase tracking-[0.15em] font-bold text-t-muted">Live Telemetry</h3>
               <span className="text-[0.5rem] text-accent-operator uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded bg-accent-operator/10 border border-accent-operator/20">Synced</span>
            </div>
            <div className="space-y-6">
              <MetricGauge label="Air Quality" unit="AQI" value={avgAqi} color="info" />
              <MetricGauge label="Temperature" unit="°C" value={avgTemp} max={50} color="info" />
              <MetricGauge label="Carbon Dioxide" unit="PPM" value={avgCo2} max={1000} color="info" />
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle">
            <div className="grid grid-cols-2 gap-3">
              <DataCard label="AQI" value={avgAqi} unit="AQI" status={avgAqi > 100 ? 'warning' : 'good'} compact />
              <DataCard label="Noise" value={avgNoise} unit="dB" status={avgNoise > 80 ? 'warning' : 'good'} compact />
              <DataCard label="Temp" value={avgTemp} unit="°C" status={avgTemp > 30 ? 'warning' : 'good'} compact />
              <DataCard label="CO2" value={avgCo2} unit="ppm" status={avgCo2 > 800 ? 'warning' : 'good'} compact />
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex items-center gap-2 px-1">
             <div className="h-1 w-1 rounded-full bg-t-muted/30" />
             <span className="text-[0.55rem] text-t-faint uppercase tracking-widest font-medium">Window: 500ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarStat({ icon, label, value, total, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  total?: string;
  color: 'accent-operator' | 'warning' | 'critical';
}) {
  const iconColor = color === 'accent-operator' ? 'text-accent-operator' : color === 'warning' ? 'text-yellow-400' : 'text-red-500';

  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
      <div className="flex items-center gap-2 opacity-60">
        {React.cloneElement(icon as any, { size: 12, strokeWidth: 2, className: iconColor })}
        <span className="text-[0.55rem] uppercase tracking-wider font-bold text-t-muted">{label}</span>
      </div>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className="text-lg font-light text-t-pure leading-none">{value}</span>
        {total && <span className="text-[0.6rem] font-medium text-t-faint">/{total}</span>}
      </div>
    </div>
  );
}
