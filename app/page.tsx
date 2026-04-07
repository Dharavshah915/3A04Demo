import Link from "next/link";
import { ShieldCheck, Activity, Map, Terminal, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-base text-t-pure font-sans overflow-hidden selection:bg-accent-admin selection:text-white relative">

      <div className="absolute inset-0 z-0">
        <img
          src="/hero-city.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-base/40 via-surface-base/70 to-surface-base" />
      </div>

      <nav className="animate-smooth-fade relative z-50 flex items-center justify-between px-8 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-surface-glass border border-border-subtle flex items-center justify-center">
            <ShieldCheck size={16} className="text-t-pure" strokeWidth={2} />
          </div>
          <span className="text-sm font-medium tracking-wide text-t-pure uppercase">
            SCEMAS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-xs font-medium uppercase tracking-widest text-t-muted hover:text-t-pure transition-colors duration-300"
          >
            Features
          </a>
          <Link
            href="/developer"
            className="text-xs font-medium uppercase tracking-widest text-t-muted hover:text-t-pure transition-colors duration-300"
          >
            API
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-xs font-medium uppercase tracking-widest text-t-pure hover:text-t-muted transition-colors duration-300"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[65vh] px-6 text-center animate-smooth-fade">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-glass border border-border-subtle mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-admin animate-pulse" />
          <span className="text-[0.65rem] uppercase tracking-widest font-medium text-t-muted">
            All Systems Online
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-5 max-w-3xl">
          Smart City Environmental
          <br />
          Monitoring & Alert System
        </h1>

        <p className="text-sm md:text-base text-t-muted leading-relaxed max-w-xl mb-10">
          Real-time air quality, temperature, and noise monitoring
          across Hamilton&apos;s municipal zones — with automated alerts and
          coordinated emergency response.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-t-pure text-surface-base text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Sign In
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
          <Link
            href="/developer"
            className="flex items-center gap-2 px-7 py-3 rounded-xl glass-panel text-sm font-medium tracking-wide hover:text-t-pure text-t-muted transition-colors border-border-subtle"
          >
            API Documentation
          </Link>
        </div>
      </main>

      <section
        id="features"
        className="relative z-10 max-w-[1000px] mx-auto px-6 pb-24 animate-smooth-fade"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon={
              <Activity
                size={18}
                className="text-accent-admin"
                strokeWidth={1.5}
              />
            }
            title="Live Sensor Data"
            description="Air quality, temperature, and noise readings updated in real time from sensors across all city zones."
          />
          <FeatureCard
            icon={
              <Map
                size={18}
                className="text-accent-operator"
                strokeWidth={1.5}
              />
            }
            title="Zone Mapping"
            description="Geographic overview of all monitored districts with per-zone status and historical trends."
          />
          <FeatureCard
            icon={
              <Terminal size={18} className="text-t-pure" strokeWidth={1.5} />
            }
            title="REST API"
            description="Query sensor data, thresholds, and alerts programmatically through authenticated API endpoints."
          />
        </div>
      </section>

      <footer className="relative z-10 border-t border-border-subtle py-8">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-t-faint tracking-wide">
            &copy; 2026 McMaster University &middot; SE3A04
          </p>
          <div className="flex items-center gap-6 text-xs text-t-faint tracking-wide">
            <Link href="/developer" className="hover:text-t-muted transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-panel p-6 flex flex-col items-start gap-3">
      <div className="h-10 w-10 rounded-lg bg-surface-glass border border-border-subtle flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-sm font-semibold tracking-wide text-t-pure mt-1">
        {title}
      </h3>
      <p className="text-sm text-t-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
