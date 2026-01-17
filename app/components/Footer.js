import Link from "next/link";
import { Github, Twitter, Heart, ArrowLeft } from "lucide-react";

export default function Footer({ variant = "full" }) {
  // Minimal footer for guides and builder flows
  if (variant === "minimal") {
    return (
      <footer className="w-full border-t border-white/10 bg-[#020617]/80 backdrop-blur-md text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-xs">
            <span>&copy; {new Date().getFullYear()} HabitatBuilder</span>
            <span className="hidden md:inline">•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden md:inline">•</span>
            <Link href="/about" className="hover:text-white transition-colors">The Standard</Link>
            <span className="hidden md:inline">•</span>
            <span className="opacity-70">Not professional veterinary advice.</span>
          </div>
        </div>
      </footer>
    );
  }

  // Full footer for homepage and top-level pages
  return (
    <footer className="w-full border-t border-white/10 bg-[#020617]/80 backdrop-blur-md text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white tracking-tight">HabitatBuilder</h3>
          <p className="leading-relaxed opacity-80">
            Helping keepers design safe, enriching environments for their animals using modern husbandry standards.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-bold text-white">Explore</h4>
          <ul className="space-y-2">
            <li><Link href="/build/leopard-gecko" className="hover:text-emerald-400 transition-colors">Leopard Gecko Build</Link></li>
            <li><Link href="/build/betta" className="hover:text-sky-400 transition-colors">Betta Fish Build</Link></li>
            <li><Link href="/browse" className="hover:text-white transition-colors">Part Browser</Link></li>
          </ul>
        </div>

        {/* Company/Research */}
        <div className="space-y-4">
          <h4 className="font-bold text-white">Learn</h4>
          <ul className="space-y-2">
            <li><Link href="/research" className="hover:text-white transition-colors">Research Articles</Link></li>
            <li><Link href="/care-sheets" className="hover:text-white transition-colors">Care Sheets</Link></li>
            <li><Link href="/common-mistakes" className="hover:text-white transition-colors">Common Mistakes</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">The Standard</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Socials / Credits */}
        <div className="space-y-4">
          <h4 className="font-bold text-white">Connect</h4>
          <div className="flex gap-4">
            <span className="p-2 bg-white/5 rounded-full text-slate-500"><Twitter size={18} /></span>
            <span className="p-2 bg-white/5 rounded-full text-slate-500"><Github size={18} /></span>
          </div>
          <p className="flex items-center gap-1 text-xs mt-4">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> for pets.
          </p>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6 text-center text-xs opacity-60">
        &copy; {new Date().getFullYear()} HabitatBuilder. Not professional veterinary advice.
      </div>
    </footer>
  );
}