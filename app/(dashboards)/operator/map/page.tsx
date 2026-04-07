"use client";
import { SensorMap } from "@/app/components/sensor-map";
import { useSensors } from "@/app/context/sensor-context";
import {
  Map as MapIcon,
  Navigation,
  Info,
  Wind,
  Droplets,
  Thermometer,
} from "lucide-react";

export default function CityMapPage() {
  const { data } = useSensors();

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <MapIcon className="text-blue-500" />
            Geospatial Monitoring
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time sensor node health across city districts.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <Navigation size={14} className="text-blue-500" />
            <span className="text-[0.625rem] font-bold text-gray-400 uppercase tracking-wider">
              4 Active Zones
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1">
        <div className="xl:col-span-2">
          <SensorMap />
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] px-2">
            Zone Status Detail
          </h3>
          <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {data.map((zone) => (
              <div
                key={zone.zone}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-bold text-white">{zone.zone}</h4>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[0.625rem] font-semibold border ${zone.aqi > 100 ? "text-red-500 bg-red-500/10 border-red-500/20" : "text-blue-500 bg-blue-500/10 border-blue-500/20"}`}
                  >
                    {zone.aqi > 100 ? "ALERT" : "NOMINAL"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer size={14} className="text-amber-500" />
                    <div>
                      <p className="text-[0.625rem] text-gray-500 font-bold uppercase tracking-tighter">
                        Temp
                      </p>
                      <p className="text-xs font-bold text-white">
                        {zone.temp.toFixed(1)}°C
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets size={14} className="text-blue-500" />
                    <div>
                      <p className="text-[0.625rem] text-gray-500 font-bold uppercase tracking-tighter">
                        Humidity
                      </p>
                      <p className="text-xs font-bold text-white">
                        {zone.humidity.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind size={14} className="text-blue-500" />
                    <div>
                      <p className="text-[0.625rem] text-gray-500 font-bold uppercase tracking-tighter">
                        AQI
                      </p>
                      <p className="text-xs font-bold text-white">
                        {zone.aqi.toFixed(0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3.5 w-3.5 rounded flex items-center justify-center bg-gray-800 border border-gray-700 text-[0.625rem] font-bold text-gray-400">
                      CO2
                    </div>
                    <div>
                      <p className="text-[0.625rem] text-gray-500 font-bold uppercase tracking-tighter">
                        Levels
                      </p>
                      <p className="text-xs font-bold text-white">
                        {zone.co2.toFixed(0)} ppm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
