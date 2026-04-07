import type { ReactNode } from "react";
import { Sidebar } from "@/app/components/sidebar";

export default function OperatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface-base text-t-pure font-sans overflow-hidden selection:bg-accent-operator selection:text-white relative">
      <div className="ambient-glow bg-accent-operator/15 w-[600px] h-[650px] top-[-20%] left-[-10%]" />
      <div className="ambient-glow bg-indigo-500/10 w-[500px] h-[500px] bottom-[-10%] right-[-5%]" />

      <Sidebar />

      <main className="flex-1 flex flex-col min-h-screen overflow-auto relative z-10">
        <header className="h-20 border-b border-border-subtle bg-surface-base/60 backdrop-blur-2xl sticky top-0 z-40 flex items-center justify-between px-10 transition-all duration-300">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-t-pure tracking-wide">
              Operator Console
            </h2>
            <div className="h-4 w-px bg-border-highlight" />
            <span className="text-xs text-t-muted font-light tracking-wide">Live Response</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:flex flex-col justify-center">
              <p className="text-sm text-t-pure font-medium tracking-wide">Colin</p>
              <p className="text-[0.65rem] text-accent-operator font-medium tracking-wider uppercase mt-0.5 opacity-80">City Operator</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent-operator/10 border border-accent-operator/20 flex items-center justify-center text-accent-operator text-sm font-medium shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              CO
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 max-w-[1600px] mx-auto w-full animate-smooth-fade">
          {children}
        </div>
      </main>
    </div>
  );
}
