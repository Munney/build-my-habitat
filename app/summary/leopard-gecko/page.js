"use client";

import React, { useMemo, Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  Share2, 
  Printer, 
  ArrowLeft, 
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Sun,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import config from "../../../data/leopard-gecko.json";
import { analytics, trackEvent } from "../../utils/analytics";
import { buildStorage } from "../../utils/buildStorage";
import { EmailCaptureInline, EmailCapturePopup, ExitIntentTracker } from "../../components/EmailCapture";
import { PremiumPDFExport } from "../../components/PremiumPDFExport";
import { SocialShare } from "../../components/SocialShare";

// Print styles - Receipt format
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      @page {
        size: letter;
        margin: 0.5in;
      }
      * {
        color: black !important;
        background: white !important;
        box-shadow: none !important;
      }
      body {
        background: white !important;
        font-size: 10pt !important;
        line-height: 1.2 !important;
      }
      nav, footer, .no-print, button { 
        display: none !important; 
      }
      a[href^="http"] {
        text-decoration: none !important;
        color: black !important;
      }
      main {
        padding: 0 !important;
        margin: 0 !important;
      }
      h1, h2, h3, h4 {
        font-size: 12pt !important;
        margin: 0.3em 0 !important;
        page-break-after: avoid;
      }
      .grid, .flex {
        display: block !important;
      }
      .rounded-xl, .rounded-2xl, .rounded-3xl {
        border-radius: 0 !important;
        border: 1px solid #ccc !important;
        padding: 0.5em !important;
        margin: 0.3em 0 !important;
      }
      .p-6, .p-8, .p-4 {
        padding: 0.5em !important;
      }
      .mb-8, .mb-10, .mb-12 {
        margin-bottom: 0.5em !important;
      }
      .mt-4, .mt-6, .mt-8 {
        margin-top: 0.3em !important;
      }
      .gap-4, .gap-6, .gap-8 {
        gap: 0.3em !important;
      }
      .text-4xl, .text-5xl {
        font-size: 14pt !important;
      }
      .text-2xl, .text-3xl {
        font-size: 12pt !important;
      }
      .text-lg {
        font-size: 10pt !important;
      }
      .text-sm {
        font-size: 9pt !important;
      }
      .text-xs {
        font-size: 8pt !important;
      }
      .space-y-3 > * + *, .space-y-4 > * + * {
        margin-top: 0.3em !important;
      }
      .space-y-6 > * + * {
        margin-top: 0.5em !important;
      }
      img {
        display: none !important;
      }
      .print-item {
        page-break-inside: avoid;
        border-bottom: 1px solid #ddd !important;
        padding: 0.3em 0 !important;
      }
      .print-item:last-child {
        border-bottom: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

const AFFILIATE_TAG = "habitatbuilde-20";

function getAsinFromUrl(url) {
  if (!url) return null;
  const regex = /(?:dp|gp\/product)\/([A-Z0-9]{10})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

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

  // Track summary view and check if build is saved
  useEffect(() => {
    analytics.trackSummaryView("leopard-gecko", parseFloat(total), allItems.length);
    
    // Check if this build is already saved
    const builds = buildStorage.getAllBuilds();
    const currentUrl = window.location.href;
    const savedBuild = Object.values(builds).find(build => build.shareUrl === currentUrl);
    if (savedBuild) {
      setBuildSaved(true);
      setBuildName(savedBuild.name || `Leopard Gecko Build - $${total}`);
    }
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


  const handleSaveClick = () => {
    // Set default name
    setBuildName(`Leopard Gecko Build - $${total}`);
    setShowNameDialog(true);
  };

  const handleSaveBuild = () => {
    const buildData = buildStorage.createBuildData("leopard-gecko", selections, total, allItems);
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
      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Receipt Format (Print Only) */}
        <div className="print-receipt-only print-receipt">
          <div className="print-receipt-header">
            <h1>{buildName || `Final Gecko Build`}</h1>
            <p>Verified configuration ID: #{Math.floor(Math.random() * 99999)}</p>
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

          <div className="flex gap-3 no-print">
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

        {/* Email Capture Inline */}
        <div className="mb-8 print-receipt-only-hidden">
          <EmailCaptureInline 
            onSuccess={(email) => {
              console.log("Email captured:", email);
            }}
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

        <div className="grid lg:grid-cols-[1fr,380px] gap-8 print-receipt-only-hidden">
            <div className="space-y-6">
                <div className="relative p-6 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-slate-900/60 border-2 border-emerald-500/30 shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 opacity-100" />
                    <div className="relative flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 border-2 border-emerald-400/30">
                            <ShieldCheck size={24} className="drop-shadow-sm" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-emerald-400 font-black text-lg mb-2 drop-shadow-sm">Vet-Verified Husbandry</h3>
                            <p className="text-emerald-200/80 text-sm leading-relaxed font-medium">
                                This setup provides a safe heat gradient and proper supplementation for a Leopard Gecko.
                            </p>
                        </div>
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
                                <a key={i} href={productLink} target="_blank" rel="noopener noreferrer" className="p-5 flex items-center justify-between group hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-transparent transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg print-item">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-emerald-400 font-black text-sm border-2 border-slate-700/50 group-hover:border-emerald-500/50 group-hover:bg-gradient-to-br group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-300 shadow-sm">{i + 1}</div>
                                        <div>
                                            <p className="font-bold text-slate-200 group-hover:text-white transition-colors flex items-center gap-2 text-base">{item.label} <ExternalLink size={14} className="opacity-0 group-hover:opacity-60 transition-opacity text-emerald-400" /></p>
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2 py-1 rounded-md mt-1.5 inline-block">{item.type || 'Essential'}</span>
                                        </div>
                                    </div>
                                    <div className="font-mono font-black text-emerald-400 text-lg group-hover:text-emerald-300 transition-colors">
                                        ${(item.price || 0).toFixed(2)}
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="lg:sticky lg:top-28 h-fit space-y-6">
              
              {/* Premium PDF Export in Sidebar */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Download size={20} className="text-emerald-400" />
                  Export Your Build
                </h3>
                <PremiumPDFExport
                  buildName={buildName || "Leopard Gecko Build"}
                  items={allItems}
                  total={parseFloat(total)}
                  species="leopard-gecko"
                />
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Professional PDF with setup instructions
                </p>
              </div>
              
                <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Est. Total Cost</p>
                    <div className="text-6xl font-black text-white tracking-tighter mb-8 relative z-10 flex justify-center items-start gap-1">
                        <span className="text-2xl mt-2 text-emerald-500">$</span>{total}
                    </div>
                    <a 
                        href={amazonCartUrl} target="_blank" rel="noopener noreferrer"
                        onClick={() => analytics.trackAmazonCartClick("leopard-gecko", total, allItems.length)}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg border-2 border-emerald-400/30 hover:border-emerald-300/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98] shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                        Buy All on Amazon <ArrowRight size={20} className="drop-shadow-sm" />
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