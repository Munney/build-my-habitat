"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Package } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 drop-shadow-2xl">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            The habitat you're looking for doesn't exist. It might have been moved, deleted, or never existed in the first place.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-0.5"
          >
            <Home size={20} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold rounded-xl transition-all"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-slate-400 mb-4 font-medium">Popular Pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/build/betta"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
            >
              <Search size={16} />
              Betta Builder
            </Link>
            <Link
              href="/build/leopard-gecko"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
            >
              <Search size={16} />
              Gecko Builder
            </Link>
            <Link
              href="/browse"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:bg-white/10 rounded-lg transition-all text-sm font-medium"
            >
              <Package size={16} />
              Browse Parts
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

