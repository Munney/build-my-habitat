"use client";

import React, { useMemo, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  Share2,
  Printer,
  ArrowLeft,
  ExternalLink,
  ArrowRight,
  Sun,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ShoppingCart,
  ChevronDown,
  XCircle,
} from "lucide-react";
import config from "../../../data/leopard-gecko.json";
import { analytics, trackEvent } from "../../utils/analytics";
import { buildStorage } from "../../utils/buildStorage";
import { getAsinFromUrl, buildAmazonCartUrl, getConfigIdFromSearchParams } from "../../utils/amazonCart";
import { encodeParamsToSlug } from "../../utils/ratePayload";
import { calculateGeckoHabitatScore } from "../../utils/habitatScore";
import { EmailCaptureInline, EmailCapturePopup, ExitIntentTracker } from "../../components/EmailCapture";
import { SocialShare } from "../../components/SocialShare";
import { CareInstructions } from "../../components/CareInstructions";
import SeoSchemaItemList from "../../components/SeoSchemaItemList";

const AFFILIATE_TAG = "habitatbuilde-20";

const PRINT_STYLES_GECKO = `
  .print-receipt-only { display: none !important; }
  .print-receipt-only-hidden { display: block; }
  @media print {
    .print-receipt-only { display: block !important; }
    .print-receipt-only-hidden { display: none !important; }
    .care-details-print details .care-section-body { display: block !important; }
    .care-details-print details summary { display: list-item !important; }
    @page { size: letter; margin: 0.5in; }
    * { color: black !important; background: white !important; box-shadow: none !important; }
    body { background: white !important; font-size: 10pt !important; line-height: 1.2 !important; }
    nav, footer, .no-print, button { display: none !important; }
    a[href^="http"] { text-decoration: none !important; color: black !important; }
    main { padding: 0 !important; margin: 0 !important; }
    h1, h2, h3, h4 { font-size: 12pt !important; margin: 0.3em 0 !important; page-break-after: avoid; }
    .grid, .flex { display: block !important; }
    .rounded-xl, .rounded-2xl, .rounded-3xl { border-radius: 0 !important; border: 1px solid #ccc !important; padding: 0.5em !important; margin: 0.3em 0 !important; }
    .p-6, .p-8, .p-4 { padding: 0.5em !important; }
    .mb-8, .mb-10, .mb-12 { margin-bottom: 0.5em !important; }
    .mt-4, .mt-6, .mt-8 { margin-top: 0.3em !important; }
    .gap-4, .gap-6, .gap-8 { gap: 0.3em !important; }
    .text-4xl, .text-5xl { font-size: 14pt !important; }
    .text-2xl, .text-3xl { font-size: 12pt !important; }
    .text-lg { font-size: 10pt !important; }
    .text-sm { font-size: 9pt !important; }
    .text-xs { font-size: 8pt !important; }
    .space-y-3 > * + *, .space-y-4 > * + * { margin-top: 0.3em !important; }
    .space-y-6 > * + * { margin-top: 0.5em !important; }
    img { display: none !important; }
    .print-item { page-break-inside: avoid; border-bottom: 1px solid #ddd !important; padding: 0.3em 0 !important; }
    .print-item:last-child { border-bottom: none !important; }
  }
`;

export default function GeckoSummary() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen pt-28 pb-20 px-6">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-white font-medium text-lg">Loading your build...</p>
            <p className="text-slate-400 text-sm">Preparing your habitat configuration</p>
          </div>
        </div>
      </main>
    }>
      <SummaryContent />
    </Suspense>
  );
}

function SummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [buildSaved, setBuildSaved] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [buildName, setBuildName] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const configId = useMemo(() => getConfigIdFromSearchParams(searchParams), [searchParams]);

  const ratePageUrl = useMemo(() => {
    const params = {};
    searchParams.forEach((value, key) => { params[key] = value; });
    const slug = encodeParamsToSlug(params);
    return slug ? `/rate/leopard-gecko/${slug}` : null;
  }, [searchParams]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("print-styles-gecko")) return;
    const style = document.createElement("style");
    style.id = "print-styles-gecko";
    style.textContent = PRINT_STYLES_GECKO;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

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

  const getCategoryBadge = (item, index) => {
    let idx = 0;
    if (index === idx++) return "Essentials";
    if (index === idx++) return "Substrate";
    const heatingCount = (selections.heating || []).length;
    if (index < idx + heatingCount) return "Lighting & Heat";
    idx += heatingCount;
    const hidesCount = (selections.hides || []).length;
    if (index < idx + hidesCount) return "Decor";
    return "Supplements";
  };

  const enclosureSize = selections.enclosure?.size ?? (selections.enclosure?.label?.match(/\d+/)?.[0] || 40);
  const getGeckoItemSubline = (item) => {
    if (!item?.id) return null;
    if (item.id === "thermostat") return "Required — prevents overheating";
    if (item.id?.startsWith("halogen") || item.id?.startsWith("dhp")) return "Primary daytime heat source";
    if (item.id === "humidhide") return "Required for healthy shedding";
    if (item.id?.startsWith("uvb")) return "Supports natural vitamin D3 synthesis";
    if (item.id === "multivitamin") return "Helps prevent nutritional deficiencies";
    return null;
  };

  const total = allItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);
  const totalNumber = useMemo(() => Number(total), [total]);
  const habitatScoreResult = useMemo(() => calculateGeckoHabitatScore(selections), [selections]);

  // Track summary view and check if build is saved
  useEffect(() => {
    analytics.trackSummaryView("leopard-gecko", totalNumber, allItems.length);
    
    // Check if this build is already saved
    const builds = buildStorage.getAllBuilds();
    const currentUrl = window.location.href;
    const savedBuild = Object.values(builds).find(build => build.shareUrl === currentUrl);
    if (savedBuild) {
      setBuildSaved(true);
      setBuildName(savedBuild.name || `Leopard Gecko Build - $${total}`);
    }
  }, [totalNumber, allItems.length]);

  const amazonCartUrl = useMemo(
    () => buildAmazonCartUrl(allItems, AFFILIATE_TAG),
    [allItems]
  );

  const handleSaveClick = () => {
    // Set default name
    setBuildName(`Leopard Gecko Build - $${total}`);
    setShowNameDialog(true);
  };

  const handleSaveBuild = () => {
    const buildData = buildStorage.createBuildData("leopard-gecko", selections, total, allItems, configId);
    buildData.shareUrl = window.location.href;
    buildData.name = buildName.trim() || `Leopard Gecko Build - $${total}`;
    
    const buildId = buildStorage.saveBuild(buildData);
    if (buildId) {
      setBuildSaved(true);
      setShowNameDialog(false);
      trackEvent("build_saved", { species: "leopard-gecko", build_id: buildId });
    }
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6">
      <SeoSchemaItemList items={allItems} listName="Leopard Gecko Habitat Shopping List" species="leopard-gecko" />
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Receipt Format (Print Only) */}
        <div className="print-receipt-only print-receipt">
          <div className="print-receipt-header">
            <h1>{buildName || `Final Gecko Build`}</h1>
            <p>Verified configuration ID: #{configId}</p>
          </div>
          <div className="print-receipt-items">
            {allItems.map((item, i) => (
              <div key={i} className="print-receipt-item">
                <span className="print-receipt-item-name">{item.label}</span>
                <span className="print-receipt-item-price">${(item.price || 0).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="print-receipt-total">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 print-receipt-only-hidden">
          <div>
            <button 
              onClick={() => {
                const params = new URLSearchParams();
                if (searchParams.get("exp")) params.set("exp", searchParams.get("exp"));
                if (searchParams.get("enclosure")) params.set("enclosure", searchParams.get("enclosure"));
                if (searchParams.get("substrate")) params.set("substrate", searchParams.get("substrate"));
                if (searchParams.get("heating")) params.set("heating", searchParams.get("heating"));
                if (searchParams.get("hides")) params.set("hides", searchParams.get("hides"));
                if (searchParams.get("supplements")) params.set("supplements", searchParams.get("supplements"));
                router.push(`/build/leopard-gecko?${params.toString()}`);
              }}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-4 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft size={16} /> Edit Configuration
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3 drop-shadow-xl">
              Final Gecko Build
            </h1>
            <p className="text-slate-300 mt-2 font-medium">
              Verified configuration ID: <span className="font-mono text-emerald-400">#{configId}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center no-print">
             {ratePageUrl && (
               <Link
                 href={ratePageUrl}
                 className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-sm font-bold"
               >
                 <Share2 size={18} /> Rate & share score
               </Link>
             )}
             <SocialShare 
               buildName={buildName || "Leopard Gecko Build"}
               total={parseFloat(total)}
               species="leopard-gecko"
               shareUrl={typeof window !== "undefined" ? window.location.href : ""}
             />
             <button 
                onClick={handleSaveClick}
                disabled={buildSaved}
                className={`p-3 rounded-xl border transition-colors ${
                  buildSaved 
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 cursor-not-allowed" 
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
                title={buildSaved ? "Build saved!" : "Save this build"}
             >
               {buildSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
             </button>
             <button 
                onClick={() => {
                  window.print();
                  analytics.trackPrintClick("leopard-gecko");
                }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                title="Print this build"
             >
                <Printer size={20} />
             </button>
          </div>
        </div>

        {/* 1. Your Habitat Includes — first so users understand what they're buying */}
        <div className="mb-6 p-5 rounded-2xl bg-slate-900/60 border border-white/10 print-receipt-only-hidden">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Your Habitat Includes</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              selections.enclosure ? `${enclosureSize} gallon enclosure` : "Enclosure",
              "Primary heat source + thermostat",
              "UVB lighting",
              "Safe substrate",
              "3 essential hides",
              "Supplements for proper nutrition",
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Price + Buy — CTA block with anchoring and friction reduction */}
        <div className="mb-6 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl text-center relative overflow-hidden print-receipt-only-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
          <p className="text-slate-300 text-sm mb-3 relative z-10">Everything you need — already selected, verified, and compatible.</p>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Complete Habitat Setup</p>
          <div className="relative z-10">
            <div className="flex justify-center items-end gap-1">
              <span className="text-xl text-emerald-500 font-black">$</span>
              <span className="text-5xl font-black text-white tracking-tighter leading-none">{total}</span>
            </div>
            <p className="text-sm font-bold text-slate-300 mt-2 leading-snug">
              Total for a full {enclosureSize} gallon enclosure
            </p>
          </div>
          <div className="mb-4 mt-3 relative z-10" />
          <a
            href={amazonCartUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackAmazonCartClick("leopard-gecko", totalNumber, allItems.length)}
            className="relative z-10 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg border-2 border-emerald-400/30 hover:border-emerald-300/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98] shadow-lg shadow-emerald-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <ShoppingCart size={20} className="drop-shadow-sm shrink-0" />
            Open Complete Gecko Setup Cart on Amazon →
          </a>
          <p className="text-xs text-slate-400 mt-2 relative z-10">Opens a pre-filled Amazon cart with all recommended items.</p>
          <p className="text-xs text-slate-400 relative z-10">Items will open directly in an Amazon cart ready to checkout</p>
          <div className="h-1 relative z-10" />

          {/* Price anchoring — above score to frame price before evaluation */}
          <p className="text-xs text-slate-500 mt-6 max-w-lg mx-auto relative z-10">
            Typical leopard gecko starter setups often cost $550–$700 when purchased separately.
          </p>
          <p className="text-xs text-slate-500 mb-2 max-w-lg mx-auto relative z-10">
            This builder selects compatible equipment to avoid wasted purchases and unsafe combinations.
          </p>

          {/* Habitat Safety Score — real score */}
          <div className="mt-6 relative z-10 max-w-md mx-auto px-5 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 shadow-lg shadow-emerald-900/20 text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-emerald-200 mb-2">
              HABITAT SAFETY SCORE
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-black text-white tracking-tight">{habitatScoreResult.score}</span>
              <span className="text-slate-300 font-bold text-lg">/ {habitatScoreResult.maxScore}</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-300 mt-1">
              {habitatScoreResult.label}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left text-xs">
              {[
                { key: "enclosure", label: "Enclosure size" },
                { key: "heating", label: "Heating + thermostat" },
                { key: "substrate", label: "Substrate" },
                { key: "hides", label: "Essential hides" },
                { key: "supplements", label: "Supplements" },
                { key: "beginnerSafe", label: "Beginner-safe equipment", alwaysPass: true },
              ].map((row) => {
                const passed = row.alwaysPass ?? !!habitatScoreResult.checks.find((c) => c.key === row.key)?.passed;
                return (
                  <div key={row.key} className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 size={16} className={passed ? "text-emerald-400 shrink-0" : "text-amber-400 shrink-0"} />
                    <span className={passed ? "font-bold" : "font-bold text-amber-100"}>{row.label}</span>
                  </div>
                );
              })}
            </div>

            <details className="mt-3 text-left group">
              <summary className="text-xs text-slate-500 cursor-pointer list-none flex items-center justify-center gap-1 [&::-webkit-details-marker]:hidden">
                Why this score? <ChevronDown size={12} className="group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 p-3 rounded-lg bg-slate-900/60 text-xs text-slate-400 space-y-1.5">
                {habitatScoreResult.checks.map((c) => (
                  <p key={c.key}>{c.message}</p>
                ))}
                {habitatScoreResult.missingEssentials?.length > 0 && (
                  <p className="text-amber-400/90 mt-2">Add: {habitatScoreResult.missingEssentials.join(", ")}</p>
                )}
                {habitatScoreResult.warnings?.length > 0 && (
                  <p className="text-slate-500 mt-2">Notes: {habitatScoreResult.warnings.join(" ")}</p>
                )}
              </div>
            </details>
          </div>

          {/* Micro trust signals */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-left relative z-10">
            {["Research-backed recommendations", "Safe temperature gradient", "Proper enclosure size", "Compatible heating equipment", "Essential hides included"].map((line, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>{line}</span>
              </div>
            ))}
          </div>

          {/* Mistakes Avoided */}
          <div className="mt-6 relative z-10 p-4 rounded-2xl bg-slate-800/50 border border-white/10 text-left max-w-md mx-auto">
            <h4 className="text-sm font-bold text-white mb-2">Mistakes This Build Prevents</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Undersized enclosures ($80–$150 wasted)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Missing thermostat ($20–$40 correction)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Unsafe substrate choices ($20+ replacement)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Incomplete hide setup ($30–$60 correction)</li>
            </ul>
            <p className="text-xs font-bold text-emerald-400/90 mt-2">Estimated mistake savings: $100+</p>
          </div>
        </div>

        {/* 3. Email PDF — after price/CTA */} 
        <div className="mb-6 print-receipt-only-hidden">
          <EmailCaptureInline
            onSuccess={(email) => {}}
            leadMagnet="Leopard Gecko Setup Checklist"
          />
        </div>

        {/* Exit Intent Tracker */}
        <ExitIntentTracker 
          onExitIntent={() => {
            if (typeof window !== "undefined" && !sessionStorage.getItem("exitIntentShown")) {
              setShowEmailPopup(true);
              sessionStorage.setItem("exitIntentShown", "true");
            }
          }}
        />

        {/* Email Popup */}
        {showEmailPopup && (
          <EmailCapturePopup
            onClose={() => setShowEmailPopup(false)}
            onSuccess={(email) => {
              console.log("Email captured from popup:", email);
            }}
            leadMagnet="Complete Setup Checklist"
          />
        )}

        <div className="grid gap-8 print-receipt-only-hidden">
            <div className="space-y-6">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-white/5 bg-white/5">
                        <h2 className="font-bold text-white flex items-center gap-2"><Sun size={18} className="text-emerald-400"/> Habitat Components</h2>
                    </div>
                    <div className="divide-y divide-white/5">
                        {allItems.length === 0 ? (
                            <div className="p-10 text-center">
                              <p className="text-slate-500 font-medium mb-4">No items in this build yet.</p>
                              <a
                                href="/build/leopard-gecko"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition"
                              >
                                Start builder <ArrowRight size={16} />
                              </a>
                            </div>
                        ) : (
                        allItems.map((item, i) => {
                            const asin = item.asin || getAsinFromUrl(item.defaultProductUrl);
                            const productLink = asin
                                ? `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`
                                : (item.defaultProductUrl ? (item.defaultProductUrl.includes("?") ? `${item.defaultProductUrl}&tag=${AFFILIATE_TAG}` : `${item.defaultProductUrl}?tag=${AFFILIATE_TAG}`) : "#");
                            const isViewAlternatives = !asin;
                            return (
                                <a
                                  key={i}
                                  href={productLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => analytics.trackAmazonItemClick("leopard-gecko", item.id, asin || undefined, item.price, item.type || item.category)}
                                  className="p-5 flex items-center justify-between group hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg print-item"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-emerald-400 font-black text-sm border-2 border-slate-700/50 group-hover:border-emerald-500/50 group-hover:bg-gradient-to-br group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-300 shadow-sm">{i + 1}</div>
                                        <div>
                                            <p className="font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2 text-base">{item.label} <ExternalLink size={14} className="opacity-0 group-hover:opacity-60 transition-opacity text-emerald-400" /></p>
                                            {getGeckoItemSubline(item) && <p className="text-xs text-slate-500 mt-0.5">{getGeckoItemSubline(item)}</p>}
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2 py-1 rounded-md mt-1.5 inline-block">{isViewAlternatives ? "View alternatives" : getCategoryBadge(item, i)}</span>
                                        </div>
                                    </div>
                                    <div className="font-mono font-black text-emerald-400 text-lg group-hover:text-emerald-300 transition-colors">
                                        ${(item.price || 0).toFixed(2)}
                                    </div>
                                </a>
                            )
                        })
                        )}
                    </div>
                </div>

                {/* Care Instructions */}
                <CareInstructions species="leopard-gecko" />
            </div>
        </div>
      </div>

      {/* Name Build Dialog */}
      {showNameDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Name Your Build</h3>
            <input
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveBuild();
                } else if (e.key === 'Escape') {
                  setShowNameDialog(false);
                }
              }}
              placeholder="Enter build name..."
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveBuild}
                className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowNameDialog(false)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}