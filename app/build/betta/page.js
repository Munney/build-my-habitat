"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShoppingCart,
  ArrowRight,
  Target,
  Thermometer,
  Box,
  Droplets,
  Waves,
  Sprout,
  ShieldCheck,
  Unlock
} from "lucide-react";
// 👇 Verify this path matches your folder structure
import config from "../../../data/betta.json";

// Data Imports
const ENCLOSURES = config.enclosures || [];
const FILTRATION = config.filtration || [];
const HEATING = config.heating || [];
const SUBSTRATES = config.substrates || [];
const DECOR = config.decor || [];
const WATERCARE = config.watercare || [];

function toggle(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export default function BettaBuilder() {
  const router = useRouter();

  // --- STATE ---
  const [experience, setExperience] = useState(null); 
  const [enclosureId, setEnclosureId] = useState(null);
  const [filtrationId, setFiltrationId] = useState(null);
  const [substrateId, setSubstrateId] = useState(null);

  const [heatingIds, setHeatingIds] = useState([]);
  const [decorIds, setDecorIds] = useState([]);
  const [careIds, setCareIds] = useState([]);

  // --- FILTERING LOGIC ---
  const filteredEnclosures = useMemo(() => {
    if (experience === "beginner") {
        return ENCLOSURES.filter(e => e.type !== "unsafe");
    }
    return ENCLOSURES;
  }, [experience]);

  // --- SELECTION LOGIC ---
  const selectedEnclosure = ENCLOSURES.find((e) => e.id === enclosureId);
  const selectedFiltration = FILTRATION.find((f) => f.id === filtrationId);
  const selectedSubstrate = SUBSTRATES.find((s) => s.id === substrateId);

  const pickMany = (items, ids) => items.filter((i) => ids.includes(i.id));
  const selectedHeating = pickMany(HEATING, heatingIds);
  const selectedDecor = pickMany(DECOR, decorIds);
  const selectedCare = pickMany(WATERCARE, careIds);

  const allSelectedItems = useMemo(() => {
    return [
      selectedEnclosure,
      selectedFiltration,
      selectedSubstrate,
      ...selectedHeating,
      ...selectedDecor,
      ...selectedCare,
    ].filter(Boolean);
  }, [selectedEnclosure, selectedFiltration, selectedSubstrate, selectedHeating, selectedDecor, selectedCare]);

  const totalPrice = allSelectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // --- PROGRESS CALCULATION ---
  const progress = useMemo(() => {
    let score = 0;
    const totalSteps = 6; 
    
    if (enclosureId) score++;
    if (filtrationId) score++;
    if (heatingIds.length > 0) score++;
    if (substrateId) score++;
    if (decorIds.length > 0) score++;
    if (careIds.length > 0) score++;

    return Math.round((score / totalSteps) * 100);
  }, [enclosureId, filtrationId, heatingIds, substrateId, decorIds, careIds]);

  // --- COMPATIBILITY CHECKS ---
  const checks = useMemo(() => {
    const messages = [];

    // 1. Tank Size Logic
    if (selectedEnclosure) {
      if (selectedEnclosure.size < 5) {
        messages.push({ level: "error", text: "Bowls/Tanks under 5g are unstable and cruel." });
      } else if (selectedEnclosure.size === 5) {
        messages.push({ level: "ok", text: "5 Gallons is the minimum safe size." });
      } else if (selectedEnclosure.size >= 10) {
        messages.push({ level: "ok", text: "10+ Gallons is excellent for stability." });
      }
    } else {
        messages.push({ level: "warning", text: "Select a tank size." });
    }

    // 2. Filtration Logic
    if (!selectedFiltration) {
        messages.push({ level: "error", text: "A filter is required for the nitrogen cycle." });
    } else if (selectedFiltration.flow === "high") {
        messages.push({ level: "warning", text: "Bettas hate strong flow. Baffle this filter." });
    } else if (selectedFiltration.flow === "low") {
        messages.push({ level: "ok", text: "Sponge filters are perfect for Bettas." });
    }

    // 3. Heating Logic
    const hasHeater = heatingIds.some(id => id === "50w" || id === "100w");
    if (!hasHeater) {
       messages.push({ level: "error", text: "Bettas are tropical! A heater is mandatory." });
    }
    if (!heatingIds.includes("thermometer")) {
       messages.push({ level: "warning", text: "Don't forget a thermometer to check temp." });
    }

    // 4. Decor Logic
    const hasPlastic = decorIds.includes("plastic");
    const hasLive = decorIds.includes("live_easy");

    if (hasPlastic) {
        messages.push({ level: "error", text: "Plastic plants tear Betta fins. Use Silk or Live." });
    }
    if (hasLive) {
        messages.push({ level: "ok", text: "Live plants help clean the water!" });
    }
    if (selectedSubstrate?.id === "aquasoil" && !hasLive) {
        messages.push({ level: "warning", text: "Active Soil is meant for live plants." });
    }

    return messages;
  }, [selectedEnclosure, selectedFiltration, heatingIds, decorIds, selectedSubstrate]);

  function goToSummary() {
    if (allSelectedItems.length === 0) return;
    const params = new URLSearchParams({
      exp: experience || "beginner",
      enclosure: enclosureId || "",
      filtration: filtrationId || "",
      substrate: substrateId || "",
      heating: heatingIds.join(","),
      decor: decorIds.join(","),
      care: careIds.join(","),
    });
    router.push(`/summary/betta?${params.toString()}`);
  }

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6">
      
      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-4 text-sm font-bold uppercase tracking-wider"
                >
                    <ChevronLeft size={16} /> Back to Hub
                </button>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
                    Betta Fish <span className="text-blue-500">Configurator</span>
                </h1>
                <p className="text-slate-300 mt-2 max-w-2xl text-lg font-medium">
                    Design a planted paradise. We'll ensure flow and temp are safe.
                </p>
            </div>

            {/* Progress Radial */}
            <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
                <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Build Status</p>
                    <p className="text-xl font-black text-white">{progress}% Ready</p>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-4 border-slate-700">
                    <div 
                        className="absolute inset-0 rounded-full border-4 border-blue-500 transition-all duration-700 ease-out"
                        style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                    />
                    <Target size={20} className={`transition-colors duration-500 ${progress === 100 ? "text-blue-400" : "text-slate-500"}`} />
                </div>
            </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,360px] xl:grid-cols-[1fr,400px]">
          
          {/* --- LEFT: BUILDER --- */}
          <div className="space-y-10">
            
            {/* 1. Experience Level */}
            <Section title="1. Keeper Level" icon={<Target className={experience ? "text-blue-400" : "text-slate-400"} />}>
              <div className="grid grid-cols-2 gap-4">
                
                {/* BEGINNER BUTTON */}
                <button
                    onClick={() => setExperience("beginner")}
                    className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 group text-left ${
                      experience === "beginner"
                        ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
                        : "border-slate-700/50 bg-slate-900/40 hover:border-blue-500/50 hover:bg-slate-800/60"
                    }`}
                  >
                    <p className="font-bold text-lg text-white capitalize flex justify-between items-center gap-2">
                        Beginner
                        {experience === "beginner" ? <CheckCircle2 size={20} className="text-blue-400" /> : <ShieldCheck size={20} className="text-slate-500"/>}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider leading-relaxed">
                      Hides Bowls & Unsafe options. Focuses on success.
                    </p>
                </button>

                {/* EXPERIENCED BUTTON */}
                <button
                    onClick={() => setExperience("experienced")}
                    className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 group text-left ${
                      experience === "experienced"
                        ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]"
                        : "border-slate-700/50 bg-slate-900/40 hover:border-blue-500/50 hover:bg-slate-800/60"
                    }`}
                  >
                    <p className="font-bold text-lg text-white capitalize flex justify-between items-center gap-2">
                        Experienced
                        {experience === "experienced" ? <CheckCircle2 size={20} className="text-blue-400" /> : <Unlock size={20} className="text-slate-500"/>}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider leading-relaxed">
                      Unlocks everything (even Bowls, for education).
                    </p>
                </button>

              </div>
            </Section>

            {/* 2. Enclosure */}
            <Section title="2. Tank Size" icon={<Box className={enclosureId ? "text-blue-400" : "text-slate-400"} />}>
              
              {!experience && (
                  <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs rounded-xl flex items-center gap-2">
                      <AlertTriangle size={16} /> Select an Experience Level above to verify safe tank sizes.
                  </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredEnclosures.map((e) => (
                  <SelectionCard
                    key={e.id}
                    active={enclosureId === e.id}
                    label={e.label}
                    price={e.price}
                    sublabel={e.size + " Gallons"}
                    onClick={() => setEnclosureId(e.id)}
                    type="radio"
                    colorClass="blue"
                  />
                ))}
              </div>
            </Section>

            {/* 3. Filtration */}
            <Section title="3. Filtration" icon={<Waves className={filtrationId ? "text-blue-400" : "text-slate-400"} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FILTRATION.map((f) => (
                  <SelectionCard
                    key={f.id}
                    active={filtrationId === f.id}
                    label={f.label}
                    price={f.price}
                    sublabel={`Flow: ${f.flow}`}
                    onClick={() => setFiltrationId(f.id)}
                    type="radio"
                    colorClass="blue"
                  />
                ))}
              </div>
            </Section>

            {/* 4. Heating */}
            <Section title="4. Temperature" icon={<Thermometer className={heatingIds.length ? "text-blue-400" : "text-slate-400"} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {HEATING.map((h) => (
                  <SelectionCard
                    key={h.id}
                    active={heatingIds.includes(h.id)}
                    label={h.label}
                    price={h.price}
                    onClick={() => setHeatingIds((ids) => toggle(ids, h.id))}
                    type="checkbox"
                    colorClass="blue"
                  />
                ))}
              </div>
            </Section>

            {/* 5. Substrate */}
            <Section title="5. Substrate" icon={<Droplets className={substrateId ? "text-blue-400" : "text-slate-400"} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUBSTRATES.map((s) => (
                  <SelectionCard
                    key={s.id}
                    active={substrateId === s.id}
                    label={s.label}
                    price={s.price}
                    sublabel={s.type}
                    onClick={() => setSubstrateId(s.id)}
                    type="radio"
                    colorClass="blue"
                  />
                ))}
              </div>
            </Section>

            {/* 6. Decor & Plants */}
            <Section title="6. Plants & Decor" icon={<Sprout className={decorIds.length ? "text-blue-400" : "text-slate-400"} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DECOR.map((d) => (
                  <SelectionCard
                    key={d.id}
                    active={decorIds.includes(d.id)}
                    label={d.label}
                    price={d.price}
                    onClick={() => setDecorIds((ids) => toggle(ids, d.id))}
                    type="checkbox"
                    colorClass="blue"
                  />
                ))}
              </div>
            </Section>

             {/* 7. Water Care */}
             <Section title="7. Water Prep" icon={<Droplets className={careIds.length ? "text-blue-400" : "text-slate-400"} />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WATERCARE.map((w) => (
                  <SelectionCard
                    key={w.id}
                    active={careIds.includes(w.id)}
                    label={w.label}
                    price={w.price}
                    onClick={() => setCareIds((ids) => toggle(ids, w.id))}
                    type="checkbox"
                    colorClass="blue"
                  />
                ))}
              </div>
            </Section>

          </div>

          {/* --- RIGHT: HUD SIDEBAR --- */}
          <aside className="lg:sticky lg:top-28 h-fit space-y-6">
            
            {/* Inventory HUD */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-white">
                  <ShoppingCart size={18} className="text-blue-400" /> Inventory
                </h3>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                    {allSelectedItems.length} ITEMS
                </span>
              </div>

              <div className="p-5">
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {allSelectedItems.length === 0 ? (
                    <div className="text-center py-8 opacity-50">
                        <div className="mx-auto w-10 h-10 border-2 border-dashed border-slate-500 rounded-lg mb-2 flex items-center justify-center">
                            <ShoppingCart size={16} className="text-slate-500" />
                        </div>
                        <p className="text-sm text-slate-400">Select items to build</p>
                    </div>
                  ) : (
                    allSelectedItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm group">
                            <span className="text-slate-300 group-hover:text-white transition-colors">
                                {item.label}
                            </span>
                            <span className="font-mono text-blue-400 opacity-80 group-hover:opacity-100">
                                {/* 👇 FIX: Individual item price */}
                                ${(item.price || 0).toFixed(2)}
                            </span>
                        </div>
                    ))
                  )}
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Estimate</span>
                    {/* 👇 FIX: Total price */}
                    <span className="text-3xl font-black text-white tracking-tight">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={goToSummary}
                  disabled={allSelectedItems.length === 0}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    allSelectedItems.length === 0 
                        ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                        : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-900/40 active:scale-95"
                  }`}
                >
                  Generate List <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Compatibility Monitor */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                 <AlertTriangle size={14} /> System Checks
              </h3>

              <div className="space-y-3">
                {allSelectedItems.length === 0 ? (
                      <p className="text-slate-500 text-xs italic">Waiting for input...</p>
                ) : checks.length === 0 ? (
                    <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-200 text-xs flex gap-2">
                        <CheckCircle2 size={16} /> All systems nominal.
                    </div>
                ) : (
                    checks.map((c, i) => (
                    <div
                        key={i}
                        className={`flex gap-3 p-3 rounded-xl border text-xs font-medium leading-relaxed ${
                        c.level === "error"
                            ? "bg-red-500/10 border-red-500/20 text-red-200"
                            : c.level === "warning"
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-200"
                            : "bg-blue-500/10 border-blue-500/20 text-blue-200"
                        }`}
                    >
                        <div className="shrink-0 mt-0.5">
                            {c.level === "error" && <XCircle size={14} />}
                            {c.level === "warning" && <AlertTriangle size={14} />}
                            {c.level === "ok" && <CheckCircle2 size={14} />}
                        </div>
                        {c.text}
                    </div>
                    ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ---------- UI COMPONENTS (Adapted for Blue Theme) ---------- */

function Section({ title, icon, children }) {
    return (
        <section className="bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    {icon}
                </div>
                {title}
            </h2>
            {children}
        </section>
    );
}

function SelectionCard({ active, label, sublabel, price, onClick, type }) {
  return (
    <div
      onClick={onClick}
      className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
        active
          ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] scale-[1.02]"
          : "border-slate-700/50 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
              active 
                ? "bg-blue-500 border-blue-500 shadow-sm shadow-blue-500/50" 
                : "bg-slate-800/50 border-slate-600 group-hover:border-slate-500"
            }`}
          >
            {active && <CheckCircle2 size={14} className="text-slate-950" />}
          </div>

          <div>
            <div className={`font-bold text-base transition-colors ${active ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
              {label}
            </div>
            {sublabel && (
              <div className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">{sublabel}</div>
            )}
          </div>
        </div>

        {/* 👇 FIX: Card price */}
        <span className={`font-mono text-sm font-bold ${active ? "text-blue-400" : "text-slate-500"}`}>
          ${(price || 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}