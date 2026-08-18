import Link from "next/link";
import { Github, Twitter, ArrowLeft } from "lucide-react";

export default function Footer({ variant = "full" }) {
  // Minimal footer for guides and builder flows
  if (variant === "minimal") {
    return (
      <footer className="w-full border-t border-white/10 bg-[#020617]/80 backdrop-blur-md text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-xs">
            <span>&copy; {new Date().getFullYear()} BuildMyHabitat</span>
            <span className="hidden md:inline">•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden md:inline">•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <span className="hidden md:inline">•</span>
            <Link href="/about" className="hover:text-white transition-colors">The Standard</Link>
            <span className="hidden md:inline">•</span>
            <span className="opacity-70">Not a veterinary service.</span>
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
          <h3 className="text-lg font-black text-white tracking-tight">BuildMyHabitat</h3>
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
            <li><Link href="/build/bearded-dragon" className="hover:text-emerald-400 transition-colors">Bearded Dragon Build</Link></li>
            <li><Link href="/build/ball-python" className="hover:text-amber-400 transition-colors">Ball Python Build</Link></li>
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
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Socials / Credits */}
        <div className="space-y-4">
          <h4 className="font-bold text-white">Connect</h4>
          <div className="flex gap-4">
            <a href="https://twitter.com/buildmyhabitat" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://reddit.com/r/reptiles" target="_blank" rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
              <Github size={18} />
            </a>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Questions? <a href="mailto:buildmyhabitat@gmail.com" className="hover:text-white transition-colors underline">buildmyhabitat@gmail.com</a>
          </p>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6 text-center text-xs opacity-60">
        &copy; 2026 BuildMyHabitat · Made with ❤️ for pets · Not a veterinary service.
      </div>
    </footer>
  );
}