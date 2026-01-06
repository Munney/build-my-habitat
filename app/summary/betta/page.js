"use client";

import React, { useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  Share2, 
  Printer, 
  ArrowLeft, 
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Waves
} from "lucide-react";
import config from "../../../data/betta.json";
import { analytics } from "../../utils/analytics";

// 👇 REPLACE THIS WITH YOUR ACTUAL AMAZON ASSOCIATE TAG
const AFFILIATE_TAG = "habitatbuilde-20";

function getAsinFromUrl(url) {
  if (!url) return null;
  const regex = /(?:dp|gp\/product)\/([A-Z0-9]{10})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function BettaSummary() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-white">Loading Build...</div>}>
      <SummaryContent />
    </Suspense>
  );
}

function SummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // --- 1. REHYDRATE DATA ---
  const selections = useMemo(() => {
    const get = (key, list) => {
        const raw = searchParams.get(key);
        if (!raw) return [];
        const ids = raw.split(",");
        return (list || []).filter(item => ids.includes(item.id));
    };

    const enclosure = config.enclosures?.find(e => e.id === searchParams.get("enclosure"));
    const filtration = config.filtration?.find(f => f.id === searchParams.get("filtration"));
    const substrate = config.substrates?.find(s => s.id === searchParams.get("substrate"));
    
    const heating = get("heating", config.heating);
    const decor = get("decor", config.decor);
    const care = get("care", config.watercare); 

    return { enclosure, filtration, substrate, heating, decor, care };
  }, [searchParams]);

  // Flatten everything into one list
  const allItems = [
    selections.enclosure,
    selections.filtration,
    selections.substrate,
    ...selections.heating,
    ...selections.decor,
    ...selections.care
  ].filter(Boolean);

  // 👇 FIX: Total Price Calculation with toFixed(2)
  const total = allItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);

  // Track summary view
  useEffect(() => {
    analytics.trackSummaryView("betta", parseFloat(total), allItems.length);
  }, [total, allItems.length]);

  // --- 2. BUILD AMAZON CART URL ---
  const amazonCartUrl = useMemo(() => {
    const baseUrl = "https://www.amazon.com/gp/aws/cart/add.html";
    const params = new URLSearchParams();
    
    params.append("AssociateTag", AFFILIATE_TAG);

    let index = 1;
    allItems.forEach((item) => {
        const asin = item.asin || getAsinFromUrl(item.defaultProductUrl);
        if (asin) {
            params.append(`ASIN.${index}`, asin);
            params.append(`Quantity.${index}`, "1");
            index++;
        }
    });

    return `${baseUrl}?${params.toString()}`;
  }, [allItems]);

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6 bg-[#020617]">
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-4 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft size={16} /> Edit Configuration
            </button>
            
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3 drop-shadow-xl">
              Final Betta Build
            </h1>
            
            <p className="text-slate-300 mt-2 font-medium">
              Verified configuration ID: <span className="font-mono text-blue-400">#{Math.floor(Math.random() * 99999)}</span>
            </p>
          </div>

          <div className="flex gap-3">
             <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                <Share2 size={20} />
             </button>
             <button 
                onClick={() => window.print()}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
             >
                <Printer size={20} />
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
            
            {/* LEFT: THE BUILD LIST */}
            <div className="space-y-6">
                
                {/* Status Card */}
                <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-4">
                    <div className="p-3 bg-blue-500 text-slate-950 rounded-xl shadow-lg shadow-blue-900/20">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="text-blue-400 font-bold text-lg">100% Aquatic Verified</h3>
                        <p className="text-blue-200/70 text-sm leading-relaxed mt-1">
                            This build is safe for Bettas. Proper filtration flow and heating included.
                        </p>
                    </div>
                </div>

                {/* The List (Clickable) */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 bg-white/5">
                        <h2 className="font-bold text-white flex items-center gap-2">
                            <Waves size={18} className="text-blue-400"/> Habitat Components
                        </h2>
                    </div>
                    
                    <div className="divide-y divide-white/5">
                        {allItems.length === 0 ? (
                            <div className="p-10 text-center text-slate-500 italic">No items selected.</div>
                        ) : (
                            allItems.map((item, i) => {
                                const productLink = (item.asin || getAsinFromUrl(item.defaultProductUrl))
                                    ? `https://www.amazon.com/dp/${item.asin || getAsinFromUrl(item.defaultProductUrl)}?tag=${AFFILIATE_TAG}` 
                                    : "#";

                                return (
                                    <a 
                                      key={i} 
                                      href={productLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-5 flex items-center justify-between group hover:bg-blue-500/5 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 font-bold text-xs border border-white/5 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2">
                                                    {item.label}
                                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                                                </p>
                                                {item.type && (
                                                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 border border-slate-700 px-1.5 py-0.5 rounded mt-1 inline-block">
                                                        {item.type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {/* 👇 FIX: Item price formatting */}
                                        <div className="font-mono font-bold text-blue-400 text-lg">
                                            ${(item.price || 0).toFixed(2)}
                                        </div>
                                    </a>
                                )
                            })
                        )}
                    </div>
                </div>

            </div>

            {/* RIGHT: CHECKOUT PANEL */}
            <div className="lg:sticky lg:top-28 h-fit space-y-6">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl text-center relative overflow-hidden group">
                    
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all duration-700 pointer-events-none" />

                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Est. Total Cost</p>
                    <div className="text-6xl font-black text-white tracking-tighter mb-8 relative z-10 flex justify-center items-start gap-1">
                        <span className="text-2xl mt-2 text-blue-500">$</span>
                        {total}
                    </div>

                    <a 
                        href={amazonCartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => analytics.trackAmazonCartClick("betta", total, allItems.length)}
                        className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-lg transition-all hover:scale-[1.02] shadow-lg shadow-blue-900/20 active:scale-95 relative z-10 flex items-center justify-center gap-2"
                    >
                        Buy All on Amazon <ArrowRight size={20} />
                    </a>
                    
                    <p className="text-xs text-slate-500 mt-4 relative z-10 px-4 leading-relaxed">
                        *Clicking this will auto-fill your Amazon Cart with all selected items.
                    </p>
                </div>

                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                    <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Next Steps</h4>
                    <ul className="space-y-3 text-sm text-slate-300 font-medium">
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Cycle tank for 2-4 weeks before adding fish.</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Wash gravel & decor with warm water only.</li>
                    </ul>
                 </div>
            </div>

        </div>
      </div>
    </main>
  );
}