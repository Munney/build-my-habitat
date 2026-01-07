"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hammer, BookOpen, Package, Info, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // LOGIC: Check which page is active
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/" || pathname.startsWith("/build");
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navLinks = [
    { name: "Builder", href: "/", icon: <Hammer size={18} /> },
    { name: "Research", href: "/research", icon: <BookOpen size={18} /> },
    { name: "Browse Parts", href: "/browse", icon: <Package size={18} /> },
    { name: "FAQ", href: "/faq", icon: <Info size={18} /> },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-28 w-full border-b border-white/10 bg-[#020617]/80 backdrop-blur-md">
      <div className="mx-auto flex h-full w-full items-center justify-between px-8 md:px-12 lg:px-16">
        
        {/* LOGO (Restored your large styling) */}
        <Link
          href="/"
          className="select-none py-2 pr-4 text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          HabitatBuilder
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            
            return (
              <Link
                key={link.href}
                href={link.href}
                // 👇 DYNAMIC STYLING:
                // If Active: Uses your original "bg-white/10" and "border-white/10"
                // If Inactive: Uses your original "text-slate-300" and "hover:bg-white/5"
                className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors border ${
                  active
                    ? "bg-white/10 text-white border-white/10 shadow-lg shadow-white/5"
                    : "text-slate-300 border-transparent hover:text-emerald-400 hover:bg-white/5"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className="text-emerald-400" />}
        </button>

      </div>

      {/* MOBILE DROPDOWN (Matches your theme) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-28 left-0 w-full bg-[#020617] border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl">
           {navLinks.map((link) => {
             const active = isActive(link.href);
             return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-4 rounded-xl font-bold border ${
                      active
                      ? 'bg-white/10 text-white border-white/10' 
                      : 'text-slate-300 border-transparent hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
             );
           })}
        </div>
      )}
    </nav>
  );
}