"use client";

import React, { useMemo, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2, Share2, Printer, ArrowLeft, ExternalLink, ArrowRight, Sun,
  Bookmark, BookmarkCheck, ShoppingCart, ChevronDown, XCircle,
} from "lucide-react";
import config from "../../../data/crested-gecko.json";
import { analytics, trackEvent } from "../../utils/analytics";
import { buildStorage } from "../../utils/buildStorage";
import { getAsinFromUrl, buildAmazonCartUrl, getConfigIdFromSearchParams } from "../../utils/amazonCart";
import { encodeParamsToSlug } from "../../utils/ratePayload";
import { calculateCrestedGeckoHabitatScore } from "../../utils/habitatScore";
import { EmailCaptureInline, EmailCapturePopup, ExitIntentTracker } from "../../components/EmailCapture";
import { SocialShare } from "../../components/SocialShare";
import { CareInstructions } from "../../components/CareInstructions";
import SeoSchemaItemList from "../../components/SeoSchemaItemList";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";

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

function itemTitle(item) {
  return item?.name || item?.label || "";
}

export default function CrestedGeckoSummary() {
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
    return slug ? `/rate/crested-gecko/${slug}` : null;
  }, [searchParams]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("print-styles-cg")) return;
    const style = document.createElement("style");
    style.id = "print-styles-cg";
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
    const uvb = config.uvb?.find((u) => u.id === searchParams.get("uvb"));
    const lighting = get("lighting", config.lighting);
    const humidity = get("humidity", config.humidity);
    const decor = get("decor", config.decor);
    const supplements = get("supplements", config.supplements);
    return { enclosure, substrate, heating, uvb, lighting, humidity, decor, supplements };
  }, [searchParams]);

  const rawItems = [
    selections.enclosure,
    selections.substrate,
    ...(selections.heating || []),
    selections.uvb,
    ...(selections.lighting || []),
    ...(selections.humidity || []),
    ...(selections.decor || []),
    ...(selections.supplements || []),
  ].filter(Boolean);

  const allItems = rawItems.map((item) => ({
    ...item,
    label: itemTitle(item),
  }));

  const allCategories = rawItems.map((item) => {
    if (item === selections.enclosure) return "Enclosure";
    if (item === selections.substrate) return "Substrate";
    if ((selections.heating || []).includes(item)) return "Heating";
    if (item === selections.uvb) return "UVB";
    if ((selections.lighting || []).includes(item)) return "Lighting";
    if ((selections.humidity || []).includes(item)) return "Humidity";
    if ((selections.decor || []).includes(item)) return "Decor";
    return "Food & Supplements";
  });

  const getCategoryBadge = (item, index) => allCategories[index] ?? "";

  const getItemSubline = (item) => {
    if (!item?.id) return null;
    if (item.id === "thermostat" || item.id === "dimmer") return "Required — never exceed 85°F";
    if (item.id === "halogen-25w" || item.id === "halogen-35w") return "Low-wattage heat — pair with thermostat or dimmer";
    if (item.id === "shadedweller-kit") return "Low-output UVB for crepuscular species";
    if (item.id === "timer") return "12–14 hour day/night cycle";
    if (item.id === "cgd-repashy" || item.id === "cgd-pangea") return "Complete diet — mix fresh every 24–48 hours";
    if (item.id === "calcium-d3") return "Use only if skipping UVB";
    if (item.id === "climbing-vines") return "Fill vertical space at all levels";
    return null;
  };

  const enclosureLabel = selections.enclosure?.dimensions || itemTitle(selections.enclosure) || "tall";
  const total = allItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2);
  const totalNumber = useMemo(() => Number(total), [total]);
  const habitatScoreResult = useMemo(() => calculateCrestedGeckoHabitatScore(selections), [selections]);

  useEffect(() => {
    analytics.trackSummaryView("crested-gecko", totalNumber, allItems.length);
    const builds = buildStorage.getAllBuilds();
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const savedBuild = Object.values(builds).find((b) => b.shareUrl === currentUrl);
    if (savedBuild) {
      setBuildSaved(true);
      setBuildName(savedBuild.name || `Crested Gecko Build - $${total}`);
    }
  }, [totalNumber, allItems.length, total]);

  const amazonCartUrl = useMemo(() => buildAmazonCartUrl(allItems, AFFILIATE_TAG), [allItems]);

  const handleSaveClick = () => {
    setBuildName(`Crested Gecko Build - $${total}`);
    setShowNameDialog(true);
  };

  const handleSaveBuild = () => {
    const buildData = buildStorage.createBuildData("crested-gecko", selections, total, allItems, configId);
    buildData.shareUrl = typeof window !== "undefined" ? window.location.href : "";
    buildData.name = buildName.trim() || `Crested Gecko Build - $${total}`;
    const buildId = buildStorage.saveBuild(buildData);
    if (buildId) {
      setBuildSaved(true);
      setShowNameDialog(false);
      trackEvent("build_saved", { species: "crested-gecko", build_id: buildId });
    }
  };

  const editParams = () => {
    const params = new URLSearchParams();
    ["exp", "enclosure", "substrate", "heating", "uvb", "lighting", "humidity", "decor", "supplements"].forEach((k) => {
      const v = searchParams.get(k);
      if (v) params.set(k, v);
    });
    router.push(`/build/crested-gecko?${params.toString()}`);
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <SeoSchemaItemList items={allItems} listName="Crested Gecko Habitat Shopping List" species="crested-gecko" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="print-receipt-only">
          <h1>{buildName || "Final Crested Gecko Build"}</h1>
          <p>Config ID: #{configId}</p>
          {allItems.map((item, i) => (
            <div key={i} className="print-receipt-item">
              <span>{itemTitle(item)}</span>
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
              Final Crested Gecko Build
            </h1>
            <p className="text-slate-300 mt-2 font-medium">Verified configuration ID: <span className="font-mono text-emerald-400">#{configId}</span></p>
          </div>
          <div className="flex flex-wrap gap-3 items-center no-print">
            {ratePageUrl && (
              <Link href={ratePageUrl} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 text-sm font-bold">
                <Share2 size={18} /> Rate & share score
              </Link>
            )}
            <SocialShare buildName={buildName || "Crested Gecko Build"} total={parseFloat(total)} species="crested-gecko" shareUrl={typeof window !== "undefined" ? window.location.href : ""} />
            <button onClick={handleSaveClick} disabled={buildSaved} className={`p-3 rounded-xl border transition-colors ${buildSaved ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 cursor-not-allowed" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`} title={buildSaved ? "Build saved!" : "Save this build"}>
              {buildSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button onClick={() => { window.print(); analytics.trackPrintClick("crested-gecko"); }} className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10" title="Print">
              <Printer size={20} />
            </button>
          </div>
        </div>

        <div className="mb-6 p-5 rounded-2xl bg-slate-900/60 border border-white/10 print-receipt-only-hidden">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">Your Habitat Includes</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Tall enclosure (vertical climbing space)",
              "Thermostat-controlled heat source",
              "Low-output UVB lighting",
              "Wet/dry humidity cycling setup",
              "Dense hides and foliage at all levels",
              "CGD complete diet",
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
            <p className="text-sm font-bold text-slate-300 mt-2">Total for a {enclosureLabel} setup</p>
          </div>
          <div className="mb-4 mt-3 relative z-10" />
          <a href={amazonCartUrl} target="_blank" rel="noopener noreferrer" onClick={() => analytics.trackAmazonCartClick("crested-gecko", totalNumber, allItems.length)} className="relative z-10 flex items-center justify-center gap-2 w-full min-h-[48px] py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm sm:text-lg border-2 border-emerald-400/30 hover:border-emerald-300/50 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 text-center">
            <ShoppingCart size={20} className="shrink-0" /> <span className="hidden sm:inline">Open Complete Crested Gecko Cart on Amazon</span><span className="sm:hidden">Add to Amazon Cart</span> →
          </a>
          <div className="mt-6 relative z-10 max-w-md mx-auto px-5 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 shadow-lg text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] font-black text-emerald-200 mb-2">HABITAT SAFETY SCORE</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-black text-white tracking-tight">{habitatScoreResult.score}</span>
              <span className="text-slate-300 font-bold text-lg">/ {habitatScoreResult.maxScore}</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-emerald-300 mt-1">{habitatScoreResult.label}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left text-xs">
              {[
                { key: "enclosure", label: "Tall enclosure (18x18x24 min)" },
                { key: "heating", label: "Heat + thermostat/dimmer" },
                { key: "uvb", label: "UVB lighting" },
                { key: "humidity", label: "Wet/dry humidity cycling" },
                { key: "decor", label: "Hides + vines" },
                { key: "diet", label: "CGD complete diet" },
                { key: "substrate", label: "Substrate" },
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
          <p className="text-xs text-slate-400 mt-2 relative z-10">Opens a pre-filled Amazon cart with all recommended items.</p>
          <AffiliateDisclosure className="mt-2 relative z-10 text-left" />

          <p className="text-xs text-slate-500 mt-6 max-w-lg mx-auto relative z-10">Typical crested gecko setups cost $350–$550+ when purchased separately. This builder selects compatible equipment to avoid wasted purchases.</p>

          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-left relative z-10">
            {["Research-backed recommendations", "85°F max heat control", "Tall enclosure only", "Wet/dry humidity cycling", "CGD diet included"].map((line, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" /> <span>{line}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 relative z-10 p-4 rounded-2xl bg-slate-800/50 border border-white/10 text-left max-w-md mx-auto">
            <h4 className="text-sm font-bold text-white mb-2">Mistakes This Build Prevents</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Overheating — #1 killer of crested geckos ($50-200 vet cost or loss of animal)</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Horizontal enclosure — extreme stress and poor health</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> Constant high humidity — respiratory infection and mold</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> No hiding spots — chronic stress and appetite loss</li>
              <li className="flex items-center gap-2"><XCircle size={14} className="text-red-400/80 shrink-0" /> D3 toxicity from over-supplementation</li>
            </ul>
            <p className="text-xs font-bold text-emerald-400/90 mt-2">Estimated mistake savings: $100+</p>
          </div>
        </div>

        <div className="mb-6 print-receipt-only-hidden">
          <EmailCaptureInline onSuccess={() => {}} leadMagnet="Crested Gecko Setup Checklist" />
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
                    <a href="/build/crested-gecko" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition">
                      Start builder <ArrowRight size={16} />
                    </a>
                  </div>
                ) : (
                  allItems.map((item, i) => {
                    const asin = item.asin || getAsinFromUrl(item.defaultProductUrl);
                    const productLink = asin ? `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}` : (item.defaultProductUrl ? (item.defaultProductUrl.includes("?") ? `${item.defaultProductUrl}&tag=${AFFILIATE_TAG}` : `${item.defaultProductUrl}?tag=${AFFILIATE_TAG}`) : "#");
                    const isViewAlternatives = !asin;
                    return (
                      <a key={i} href={productLink} target="_blank" rel="noopener noreferrer" onClick={() => analytics.trackAmazonItemClick("crested-gecko", item.id, asin || undefined, item.price)} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent transition-all duration-300 cursor-pointer rounded-lg print-item min-h-[44px]">
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-emerald-400 font-black text-sm border-2 border-slate-700/50 shrink-0">{i + 1}</div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-200 group-hover:text-white flex items-center gap-2 text-sm sm:text-base break-words">{itemTitle(item)} <ExternalLink size={14} className="opacity-0 group-hover:opacity-60 text-emerald-400 shrink-0" /></p>
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
            <CareInstructions species="crested-gecko" />
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
