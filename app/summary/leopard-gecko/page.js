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
  Sun
} from "lucide-react";
import config from "../../../data/leopard-gecko.json";
import { analytics } from "../../utils/analytics";

const AFFILIATE_TAG = "habitatbuilde-20";

function getAsinFromUrl(url) {
  if (!url) return null;
  const regex = /(?:dp|gp\/product)\/([A-Z0-9]{10})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function GeckoSummary() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-white">Loading Build...</div>}>
      <SummaryContent />
    </Suspense>
  );
}

function SummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selections = useMemo(() => {
    const get = (key, list) => {
        const raw = searchParams.get(key);
        if (!raw) return [];
        const ids = raw.split(",");
        return (list || []).filter(item => ids.includes(item.id));
    };

    const enclosure = config.enclosures?.find(e => e.id === searchParams.get("enclosure"));
    const substrate = config.substrates?.find(s => s.id === searchParams.get("substrate"));
    
    const heating = get("heating", config.heating);
    const hides = get("hides", config.hides);
    const supplements = get("supplements", config.supplements);

    return { enclosure, substrate, heating, hides, supplements };
  }, [searchParams]);

  const allItems = [
    selections.enclosure,
    selections.substrate,
    ...selections.heating,
    ...selections.hides,
    ...selections.supplements
  ].filter(Boolean);

  // 👇 FIX: Total price with toFixed(2)
  const total = allItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);

  // Track summary view
  useEffect(() => {
    analytics.trackSummaryView("leopard-gecko", parseFloat(total), allItems.length);
  }, [total, allItems.length]);

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
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-4 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft size={16} /> Edit Configuration
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3 drop-shadow-xl">
              Final Gecko Build
            </h1>
            <p className="text-slate-300 mt-2 font-medium">
              Verified configuration ID: <span className="font-mono text-emerald-400">#{Math.floor(Math.random() * 99999)}</span>
            </p>
          </div>

          <div className="flex gap-3">
             <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"><Share2 size={20} /></button>
             <button onClick={() => window.print()} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"><Printer size={20} /></button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-8">
            <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4">
                    <div className="p-3 bg-emerald-500 text-slate-950 rounded-xl shadow-lg shadow-emerald-900/20"><ShieldCheck size={24} /></div>
                    <div>
                        <h3 className="text-emerald-400 font-bold text-lg">Vet-Verified Husbandry</h3>
                        <p className="text-emerald-200/70 text-sm leading-relaxed mt-1">This setup provides a safe heat gradient and proper supplementation for a Leopard Gecko.</p>
                    </div>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 bg-white/5">
                        <h2 className="font-bold text-white flex items-center gap-2"><Sun size={18} className="text-emerald-400"/> Habitat Components</h2>
                    </div>
                    <div className="divide-y divide-white/5">
                        {allItems.map((item, i) => {
                            const productLink = (item.asin || getAsinFromUrl(item.defaultProductUrl))
                                ? `https://www.amazon.com/dp/${item.asin || getAsinFromUrl(item.defaultProductUrl)}?tag=${AFFILIATE_TAG}` : "#";
                            return (
                                <a key={i} href={productLink} target="_blank" rel="noopener noreferrer" className="p-5 flex items-center justify-between group hover:bg-emerald-500/5 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500 font-bold text-xs border border-white/5 group-hover:border-emerald-500/30 transition-colors">{i + 1}</div>
                                        <div>
                                            <p className="font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2">{item.label} <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" /></p>
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 border border-slate-700 px-1.5 py-0.5 rounded mt-1 inline-block">{item.type || 'Essential'}</span>
                                        </div>
                                    </div>
                                    <div className="font-mono font-bold text-emerald-400 text-lg">
                                        {/* 👇 FIX: Individual price with toFixed(2) */}
                                        ${(item.price || 0).toFixed(2)}
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="lg:sticky lg:top-28 h-fit space-y-6">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Est. Total Cost</p>
                    <div className="text-6xl font-black text-white tracking-tighter mb-8 relative z-10 flex justify-center items-start gap-1">
                        <span className="text-2xl mt-2 text-emerald-500">$</span>{total}
                    </div>
                    <a 
                        href={amazonCartUrl} target="_blank" rel="noopener noreferrer"
                        onClick={() => analytics.trackAmazonCartClick("leopard-gecko", total, allItems.length)}
                        className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                    >
                        Buy All on Amazon <ArrowRight size={20} />
                    </a>
                    <p className="text-xs text-slate-500 mt-4 relative z-10 px-4">*Clicking this will auto-fill your Amazon Cart.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                    <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">Setup Tips</h4>
                    <ul className="space-y-3 text-sm text-slate-300 font-medium">
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Place 3 hides: Hot, Cool, and Moist.</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> Connect your heat source to a thermostat.</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}