"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  User,
  HardHat,
  ChevronRight,
  Globe,
  Lock,
  Cpu,
  Mail,
  Key,
  Activity,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/components/ui/utils";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setStep(2);
    }
  };

  const handleLogin = (role: string) => {
    router.push(`/${role}`);
  };

  const roles = [
    {
      id: "admin",
      title: "System Administrator",
      subtitle: "Infrastructure, rules & threshold overrides",
      icon: ShieldCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "operator",
      title: "City Operator",
      subtitle: "Real-time telemetry & emergency response",
      icon: HardHat,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "user",
      title: "Public User",
      subtitle: "Citizen-facing metrics & safety guidance",
      icon: User,
      color: "text-[#0ba558]",
      bgColor: "bg-[#0ba558]/10",
    },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f172a] px-6 font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.2),transparent)]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.15]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="city-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#334155"
                strokeWidth="0.5"
              />
              <circle cx="0" cy="0" r="1" fill="#475569" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#city-grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "z-10 w-full transition-all duration-500",
          step === 1 ? "max-w-[460px]" : "max-w-[640px]",
        )}
      >
        <div className="overflow-hidden rounded-3xl border border-slate-700/40 bg-slate-900/80 shadow-2xl shadow-black backdrop-blur-2xl">
          <div className="bg-gradient-to-b from-slate-800/50 to-transparent border-b border-slate-700/40 p-10 text-center relative">
            <motion.div
              whileHover={{ rotate: 5 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-xl shadow-blue-500/10"
            >
              <Shield size={32} />
            </motion.div>
            <h1 className="text-2xl font-semibold tracking-tight text-white uppercase italic">
              3PAS{" "}
              <span className="font-light text-blue-400 not-italic">
                Secure
              </span>
            </h1>
          </div>

          <div className="p-8 md:p-10 min-h-[440px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-blue-500/5 border border-blue-500/10 p-3 mb-2">
                    <Activity size={14} className="text-blue-400" />
                    <p className="text-[0.6875rem] text-blue-200/70 leading-tight">
                      3PAS is now managing all city environmental monitoring
                      credentials.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[0.625rem] font-semibold uppercase tracking-widest text-slate-500 ml-1">
                        Operator ID
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200">
                          <Mail size={16} />
                        </div>
                        <input
                          type="text"
                          required
                          value={credentials.username}
                          onChange={(e) =>
                            setCredentials((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-blue-500 focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/15 placeholder:text-slate-600"
                          placeholder="ID NUMBER / EMAIL"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between px-1">
                        <label className="text-[0.625rem] font-semibold uppercase tracking-widest text-slate-500">
                          Access Key
                        </label>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200">
                          <Key size={16} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={credentials.password}
                          onChange={(e) =>
                            setCredentials((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-slate-700 bg-slate-800/50 py-3.5 pl-11 pr-12 text-sm text-white outline-none transition-all focus:border-blue-500 focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/15 placeholder:text-slate-600"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-300 transition-colors duration-200 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition-all duration-200 hover:bg-blue-500 active:scale-[0.98] uppercase tracking-widest cursor-pointer"
                  >
                    Authorize Session
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <button
                      onClick={() => setStep(1)}
                      className="mb-4 text-[0.625rem] font-semibold uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors duration-200 cursor-pointer"
                    >
                      ← RE-AUTHENTICATE
                    </button>
                    <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-slate-500">
                      Verified as{" "}
                      <span className="text-blue-400">
                        {credentials.username}
                      </span>
                    </p>
                    <h2 className="text-lg font-bold text-white uppercase tracking-tight mt-1">
                      Select Interface
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {roles.map((role, idx) => (
                      <motion.button
                        key={role.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: idx * 0.08,
                          type: "spring",
                          stiffness: 250,
                          damping: 20,
                        }}
                        onClick={() => handleLogin(role.id)}
                        className="group relative flex flex-col items-center gap-4 rounded-2xl border border-slate-700/40 bg-slate-800/40 px-5 py-7 transition-all duration-200 hover:border-blue-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/5 active:scale-[0.97] cursor-pointer"
                      >
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg",
                            role.bgColor,
                            role.color,
                          )}
                        >
                          <role.icon size={26} />
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <span className="text-[0.6875rem] font-bold text-white uppercase tracking-wide group-hover:text-blue-400 transition-colors duration-200 leading-tight">
                            {role.title}
                          </span>
                          <span className="text-[0.6875rem] text-slate-500 mt-1.5 leading-snug">
                            {role.subtitle}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto pt-8 flex flex-col items-center gap-5">
              <div className="h-px w-full bg-slate-800" />
              <div className="flex items-center gap-6 text-[0.625rem] font-semibold uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Lock size={12} className="text-[#0ba558]" />
                  <span>SECURE_LINK</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={12} />
                  <span>NET_SSO</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-blue-500" />
                  <span>3PAS_GATEWAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-3 grayscale opacity-40">
            <div className="h-6 w-6 rounded bg-white flex items-center justify-center p-1">
              <Cpu size={16} className="text-slate-900" />
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-slate-400">
              City of Hamilton
            </p>
          </div>
          <p className="text-[0.625rem] font-semibold text-slate-500 uppercase tracking-widest text-center max-w-[300px] leading-relaxed">
            Authorized Personnel Only // Hamilton Municipal Directive 3A04-8
          </p>
        </div>
      </motion.div>
    </div>
  );
}
