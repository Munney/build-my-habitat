"use client";

import React, { useMemo, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2, Share2, Printer, ArrowLeft, ExternalLink, ArrowRight, Sun,
  Copy, Check, Bookmark, BookmarkCheck, ShoppingCart, ChevronDown, XCircle,
} from "lucide-react";
import config from "../../../data/bearded-dragon.json";
import { analytics, trackEvent } from "../../utils/analytics";
import { buildStorage } from "../../utils/buildStorage";
import { getAsinFromUrl, buildAmazonCartUrl, getConfigIdFromSearchParams } from "../../utils/amazonCart";
import { encodeParamsToSlug } from "../../utils/ratePayload";
import { calculateBeardedDragonHabitatScore } from "../../utils/habitatScore";
import { EmailCaptureInline, EmailCapturePopup, ExitIntentTracker } from "../../components/EmailCapture";
import { SocialShare } from "../../components/SocialShare";
import { CareInstructions } from "../../components/CareInstructions";
import SeoSchemaItemList from "../../components/SeoSchemaItemList";

const AFFILIATE_TAG = "habitatbuilde-20";

const PRINT_STYLES = `
  .print-receipt-only { display: none !important; }
  .print-receipt-only-hidden { display: block; }
  @media print {
    .print-receipt-only { display: block !important; }
    .print-receipt-only-hidden { display: none !important; }
    nav, footer, .no-print, button { display: none !important; }
    * { color: black !important; background: white !important; }
  }
`;

export default function BeardedDragonSummary() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-white font-medium text-lg mt-4">Loading your build...</p>
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
    return slug ? `/rate/bearded-dragon/${slug}` : null;
  }, [searchParams]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("print-styles-bd")) return;
    const style = document.createElement("style");
    style.id = "print-styles-bd";
    style.textContent = PRINT_STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const get = (key, list) => {
    const raw = searchParams.get(key);
    if (!raw) return [];
    return (list || []).filter((item) => raw.split(",").includes(item.id));
  };

  const selections = useMemo(() => {
    const enclosure = config.enclosures?.find((e) => e.id === searchParams.get("enclosure"));
    const substrate = config.substrates?.find((s) => s.id === searchParams.get("substrate"));
    const heating = get("heating", config.heating);
    const lighting = get("lighting", config.lighting);
    const hides = get("hides", config.hides);
    const decor = get("decor", config.decor);
    const supplements = get("supplements", config.supplements);
    const feeding = get("feeding", config.feeding);
    return { enclosure, substrate, heating, lighting, hides, decor, supplements, feeding };
  }, [searchParams]);

  const rawItems = [
    selections.enclosure,
    selections.substrate,
    ...(selections.heating || []),
    ...(selections.lighting || []),
    ...(selections.hides || []),
    ...(selections.decor || []),
    ...(selections.supplements || []),
    ...(selections.feeding || []),
  ].filter(Boolean);

  const allItems = rawItems.flatMap((item) =>
    item.bundle && Array.isArray(item.bundle) ? item.bundle : [item]
  );
  const allCategories = rawItems.flatMap((item) => {
    const count = item.bundle && Array.isArray(item.bundle) ? item.bundle.length : 1;
    const cat =
      item === selections.enclosure
        ? "Enclosure"
        : item === selections.substrate
          ? "Substrate"
          : (selections.heating || []).includes(item)
            ? "Heating"
            : (selections.lighting || []).includes(item)
              ? "UVB"
              : (selections.hides || []).includes(item)
                ? "Hides"
                : (selections.decor || []).includes(item)
                  ? "Decor"
                  : (selections.supplements || []).includes(item)
                    ? "Supplements"
                    : "Feeding";
    return Array(count).fill(cat);
  });

  const getCategoryBadge = (item, index) => allCategories[index] ?? "";

  const getItemSubline = (item) => {
    if (!item?.id) return null;
    if (item.id === "thermostat") return "Required — prevents overheating";
    if (item.id?.startsWith("halogen") || item.id?.startsWith("che_")) return "Basking heat source";
    if (item.id?.startsWith("uvb_t5")) return "Required for calcium metabolism";
    if (item.id === "basking_platform") return "Basking platform for heat/UVB access";
    if (item.id === "multivitamin") return "Prevents nutritional deficiencies";
    return null;
  };

  const enclosureSize = selections.enclosure?.size ?? 120;
  const total = allItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);
  const totalNumber = useMemo(() => Number(total), [total]);
  const habitatScoreResult = useMemo(() => calculateBeardedDragonHabitatScore(selections), [selections]);

  useEffect(() => {
    analytics.trackSummaryView("bearded-dragon", totalNumber, allItems.length);
    const builds = buildStorage.getAllBuilds();
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const savedBuild = Object.values(builds).find((b) => b.shareUrl === currentUrl);
    if (savedBuild) {
      setBuildSaved(true);
      setBuildName(savedBuild.name || `Bearded Dragon Build - $${total}`);
    }
  }, [totalNumber, allItems.length, total]);

  const amazonCartUrl = useMemo(() => buildAmazonCartUrl(allItems, AFFILIATE_TAG), [allItems]);

  const handleSaveClick = () => {
    setBuildName(`Bearded Dragon Build - $${total}`);
    setShowNameDialog(true);
  };

  const handleSaveBuild = () => {
    const buildData = buildStorage.createBuildData("bearded-dragon", selections, total, allItems, configId);
    buildData.shareUrl = typeof window !== "undefined" ? window.location.href : "";
    buildData.name = buildName.trim() || `Bearded Dragon Build - $${total}`;
    const buildId = buildStorage.saveBuild(buildData);
    if (buildId) {
      setBuildSaved(true);
      setShowNameDialog(false);
      trackEvent("build_saved", { species: "bearded-dragon", build_id: buildId });
    }
  };

  const editParams = () => {
    const params = new URLSearchParams();
    ["exp", "enclosure", "substrate", "heating", "lighting", "hides", "decor", "supplements", "feeding"].forEach((k) => {
      const v = searchParams.get(k);
      if (v) params.set(k, v);
    });
    router.push(`/build/bearded-dragon?${params.toString()}`);
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <SeoSchemaItemList items={allItems} listName="Bearded Dragon Habitat Shopping List" species="bearded-dragon" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="print-receipt-only">
          <h1>{buildName || "Final Bearded Dragon Build"}</h1>
          <p>Config ID: #{configId}</p>
          {allItems.map((item, i) => (
            <div key={i} className="print-receipt-item">
              <span>{item.label}</span>
              <span>${(item.price || 0).toFixed(2)}</span>
            </div>
          ))}
          <div className="print-receipt-total">Total: ${total}</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 print-receipt-only-hidden">
          <div>
            <button onClick={editParams} className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-4 text-xs font-bold uppercase tracking-wider">
              <ArrowLeft size={16} /> Edit Configuration
            </button>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3 break-words">
              Final Bearded Dragon Build
            </h1>
            <p className="text-slate-300 mt-2 font-medium">Verified configuration ID: <span className="font-mono text-emerald-400">#{configId}</span></p>
          </div>
          <div className="flex flex-wrap gap-3 items-center no-print">
            {ratePageUrl && (
              <Link href={ratePageUrl} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 text-sm font-bold">
                <Share2 size={18} /> Rate & share score
              </Link>
            )}
            <SocialShare buildName={buildName || "Bearded Dragon Build"} total={parseFloat(total)} species="bearded-dragon" shareUrl={typeof window !== "undefined" ? window.location.href : ""} />
            <button onClick={handleSaveClick} disabled={buildSaved} className={`p-3 rounded-xl border transition-colors ${buildSaved ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 cursor-not-allowed" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`} title={buildSaved ? "Build saved!" : "Save this build"}>
              {buildSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button onClick={() => { window.print(); analytics.trackPrintClick("bearded-dragon"); }} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10" title="Print">
              <Printer size={20} />
            </button>
          </div>
        </div>

        <div className="mb-6 p-5 rounded-2xl bg-slate-900/60 border border-white/10 print-receipt-only-hidden">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Your Habitat Includes</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              selections.enclosure ? `${enclosureSize} gal equivalent enclosure` : "Enclosure",
              "Basking heat + thermostat",
              "T5 UVB lighting",
              "Safe substrate",
              "2+ hides",
              "Supplements",
            ].map((label, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl text-center relative overflow-hidden print-receipt-only-hidden">
          <p className="text-slate-300 text-sm mb-3 relative z-10">Everything you need — verified and compatible.</p>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Complete Habitat Setup</p>
          <div className="relative z-10">
            <div className="flex justify-center items-end gap-1">
              <span className="text-xl text-emerald-500 font-black">$</span>
              <span className="text-5xl font-black text-white tracking-tighter leading-none">{total}</span>
            </div>
            <p className="text-sm font-bold text-slate-300 mt-2">Total for a full {enclosureSize} gallon equivalent setup</p>
          </div>
          <div className="mb-4 mt-3 relative z-10" />
          <a href={amazonCartUrl} target="_blank" rel="noopener noreferrer" onClick={() => analytics.trackAmazonCartClick("bearded-dragon", totalNumber, allItems.length)} className="relative z-10 flex items-center justify-center gap-2 w-full min-h-[48px] py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm sm:text-lg border-2 border-emerald-400/30 hover:border-emerald-300/50 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 text-center">
            <ShoppingCart size={20} className="shrink-0" /> <span className="hidden sm:inline">Open Complete Bearded Dragon Cart on Amazon</span><span className="sm:hidden">Add to Amazon Cart</span> →
          </a>
          <p className="text-xs text-slate-400 mt-2 relative z-10">Opens a pre-filled Amazon cart with all recommended items.</p>

          <p className="text-xs text-slate-500 mt-6 max-w-lg mx-auto relative z-10">Typical bearded dragon setups cost $500–$700+. This builder selects compatible equipment to avoid wasted purchases.</p>

          <div className="mt-6 relative z-10 max-w-md mx-auto px-5 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 shadow-lg text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-emerald-200 mb-2">HABITAT SAFETY SCORE</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-black text-white tracking-tight">{habitatScoreResult.score}</span>
              <span className="text-slate-300 font-bold text-lg">/ {habitatScoreResult.maxScore}</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-300 mt-1">{habitatScoreResult.label}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left text-xs">
              {[
                { key: "enclosure", label: "Enclosure size (120 gal min)" },
                { key: "uvb", label: "UVB lighting" },
                { key: "heating", label: "Basking + thermostat" },
                { key: "substrate", label: "Substrate" },
                { key: "hides", label: "2+ hides" },
                { key: "enrichment", label: "Enrichment" },
                { key: "supplements", label: "Supplements" },
              ].map((row) => {
                const passed = !!habitatScoreResult.checks.find((c) => c.key === row.key)?.passed;
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

          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-left relative z-10">
            {["Research-backed recommendations", "UVB required", "Thermostat required", "Proper enclosure size", "Safe substrate"].map((line, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> <span>{line}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 relative z-10 p-4 rounded-2xl bg-slate-800/50 border border-white/10 text-left max-w-md mx-auto">
            <h4 className="text-sm font-bold text-white mb-2">Mistakes This Build Prevents</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Undersized enclosures (under 120 gal)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> No UVB (metabolic bone disease risk)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Basking without thermostat (burns/overheating)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Unsafe substrate (impaction risk)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Too few hides (stress)</li>
            </ul>
            <p className="text-xs font-bold text-emerald-400/90 mt-2">Estimated mistake savings: $100+</p>
          </div>
        </div>

        <div className="mb-6 print-receipt-only-hidden">
          <EmailCaptureInline onSuccess={() => {}} leadMagnet="Bearded Dragon Setup Checklist" />
        </div>
        <ExitIntentTracker onExitIntent={() => { if (typeof window !== "undefined" && !sessionStorage.getItem("exitIntentShown")) { setShowEmailPopup(true); sessionStorage.setItem("exitIntentShown", "true"); } }} />
        {showEmailPopup && <EmailCapturePopup onClose={() => setShowEmailPopup(false)} onSuccess={() => {}} leadMagnet="Complete Setup Checklist" />}

        <div className="grid gap-8 print-receipt-only-hidden">
          <div className="space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/5 bg-white/5">
                <h2 className="font-bold text-white flex items-center gap-2"><Sun size={18} className="text-emerald-400" /> Habitat Components</h2>
              </div>
              <div className="divide-y divide-white/5">
                {allItems.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-slate-500 font-medium mb-4">No items in this build yet.</p>
                    <a href="/build/bearded-dragon" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition">
                      Start builder <ArrowRight size={16} />
                    </a>
                  </div>
                ) : (
                  allItems.map((item, i) => {
                    const asin = item.asin || getAsinFromUrl(item.defaultProductUrl);
                    const productLink = asin ? `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}` : (item.defaultProductUrl ? (item.defaultProductUrl.includes("?") ? `${item.defaultProductUrl}&tag=${AFFILIATE_TAG}` : `${item.defaultProductUrl}?tag=${AFFILIATE_TAG}`) : "#");
                    const isViewAlternatives = !asin;
                    return (
                      <a key={i} href={productLink} target="_blank" rel="noopener noreferrer" onClick={() => analytics.trackAmazonItemClick("bearded-dragon", item.id, asin || undefined, item.price)} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent transition-all duration-300 cursor-pointer rounded-lg print-item min-h-[44px]">
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-emerald-400 font-black text-sm border-2 border-slate-700/50 shrink-0">{i + 1}</div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-200 group-hover:text-white flex items-center gap-2 text-sm sm:text-base break-words">{item.label} <ExternalLink size={14} className="opacity-0 group-hover:opacity-60 text-emerald-400 shrink-0" /></p>
                            {getItemSubline(item) && <p className="text-xs text-slate-500 mt-0.5">{getItemSubline(item)}</p>}
                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2 py-1 rounded-md mt-1.5 inline-block">{isViewAlternatives ? "View alternatives" : getCategoryBadge(item, i)}</span>
                          </div>
                        </div>
                        <div className="font-mono font-black text-emerald-400 text-base sm:text-lg shrink-0">${(item.price || 0).toFixed(2)}</div>
                      </a>
                    );
                  })
                )}
              </div>
            </div>
            <CareInstructions species="bearded-dragon" />
          </div>
        </div>
      </div>

      {showNameDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Name Your Build</h3>
            <input type="text" value={buildName} onChange={(e) => setBuildName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSaveBuild(); else if (e.key === "Escape") setShowNameDialog(false); }} placeholder="Enter build name..." className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 mb-4" autoFocus />
            <div className="flex gap-3">
              <button onClick={handleSaveBuild} className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors">Save</button>
              <button onClick={() => setShowNameDialog(false)} className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
