"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const ZONES = [
  "Downtown Zone A",
  "North District",
  "Harbor Side",
  "Industrial Park",
];

export interface SensorData {
  zone: string;
  aqi: number;
  temp: number;
  humidity: number;
  noise: number;
  uv: number;
  wind: number;
  co2: number;

  aqiAvg5m: number;
  aqiMax1h: number;
}

const generateInitialData = (): SensorData[] =>
  ZONES.map((zone) => {
    const baseAqi = 40 + Math.random() * 20;
    return {
      zone,
      aqi: baseAqi,
      temp: 22 + Math.random() * 5,
      humidity: 50 + Math.random() * 10,
      noise: 55 + Math.random() * 5,
      uv: 3 + Math.random() * 2,
      wind: 15 + Math.random() * 10,
      co2: 400 + Math.random() * 50,
      aqiAvg5m: baseAqi + (Math.random() - 0.5) * 5,
      aqiMax1h: baseAqi + 15,
    };
  });

interface SensorContextType {
  data: SensorData[];
  triggerPollutionSpike: () => void;
  stopPollutionSpike: () => void;
  isSpiking: boolean;
}

const SensorContext = createContext<SensorContextType | null>(null);

export const SensorProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<SensorData[]>(generateInitialData());
  const [isSpiking, setIsSpiking] = useState(false);
  const spikeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopPollutionSpike = () => {
    if (spikeTimeoutRef.current) {
      clearTimeout(spikeTimeoutRef.current);
      spikeTimeoutRef.current = null;
    }
    setIsSpiking(false);

    setData((prev) =>
      prev.map((s, index) => {
        //immediate reseting
        if (index === 3) {
          ///industrial park
          const normalAqi = 40 + Math.random() * 20;
          return { ...s, aqi: normalAqi };
        }
        return s;
      }),
    );
  };
  //auro resetting
  const triggerPollutionSpike = () => {
    if (spikeTimeoutRef.current) clearTimeout(spikeTimeoutRef.current);
    setIsSpiking(true);

    spikeTimeoutRef.current = setTimeout(() => {
      setIsSpiking(false);
      spikeTimeoutRef.current = null;
    }, 30000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((s, index) => {
          const isSpikeZone = isSpiking && index === 3;
          const baseAqiChange = (Math.random() - 0.5) * 4;
          const newAqi = isSpikeZone
            ? 185 + Math.random() * 15
            : Math.max(0, Math.min(95, s.aqi + baseAqiChange));

          return {
            ...s,
            aqi: newAqi,
            temp: isSpikeZone
              ? s.temp
              : Math.max(
                  15,
                  Math.min(34, s.temp + (Math.random() - 0.5) * 0.4),
                ),
            noise: isSpikeZone
              ? s.noise
              : Math.max(40, Math.min(80, s.noise + (Math.random() - 0.5) * 2)),
            co2: isSpikeZone
              ? s.co2
              : Math.max(
                  400,
                  Math.min(750, s.co2 + (Math.random() - 0.5) * 10),
                ),
            humidity: Math.max(
              0,
              Math.min(100, s.humidity + (Math.random() - 0.5) * 2),
            ),
            uv: Math.max(0, Math.min(11, s.uv + (Math.random() - 0.5) * 0.5)),
            wind: Math.max(0, Math.min(60, s.wind + (Math.random() - 0.5) * 3)),
            aqiAvg5m: s.aqiAvg5m * 0.95 + newAqi * 0.05,
            aqiMax1h: Math.max(s.aqiMax1h, newAqi),
          };
        }),
      );
    }, 500);
    return () => clearInterval(interval);
  }, [isSpiking]);

  return (
    <SensorContext.Provider
      value={{ data, triggerPollutionSpike, stopPollutionSpike, isSpiking }}
    >
      {children}
    </SensorContext.Provider>
  );
};

export const useSensors = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error("sensor context not there");
  }
  return context;
};
