import { Sidebar } from "@/app/components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface-base text-t-pure font-sans overflow-hidden selection:bg-accent-admin selection:text-white relative">
      <div className="ambient-glow bg-accent-admin/20 w-[600px] h-[650px] top-[-20%] left-[-10%]" />
      <div className="ambient-glow bg-blue-500/10 w-[500px] h-[500px] bottom-[-10%] right-[-5%]" />

      <Sidebar />

      <main className="flex-1 flex flex-col min-h-screen overflow-auto relative z-10">
        <header className="h-20 border-b border-border-subtle bg-surface-base/60 backdrop-blur-2xl sticky top-0 z-40 flex items-center justify-between px-10 transition-all duration-300">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-t-pure tracking-wide">
              Admin Portal
            </h2>
            <div className="h-4 w-px bg-border-highlight" />
            <span className="text-xs text-t-muted font-light tracking-wide">
              System Overview
            </span>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:flex flex-col justify-center">
              <p className="text-sm text-t-pure font-medium tracking-wide">
                Colin
              </p>
              <p className="text-[0.65rem] text-accent-admin font-medium tracking-wider uppercase mt-0.5 opacity-80">
                Administrator
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent-admin/10 border border-accent-admin/20 flex items-center justify-center text-accent-admin text-sm font-medium shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              CA
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
