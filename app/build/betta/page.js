"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { analytics } from "../../utils/analytics";
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
  Unlock,
  ChevronDown,
  AlertCircle
} from "lucide-react";
// 👇 Verify this path matches your folder structure
import config from "../../../data/betta.json";
import ProductTooltip from "../../components/ProductTooltip";

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

// Group products by base name to identify variants
function groupVariants(products) {
  const variantGroups = new Map();
  const standalone = [];
  
  products.forEach(product => {
    const label = product.label;
    
    // Pattern 1: "Natural Gravel - Light (2lbs)" or "Natural Gravel - Dark (5lbs)"
    const pattern1 = /^(.+?)\s+-\s+(Light|Dark|Beige|Black|White)\s+\((.+?)\)$/i;
    // Pattern 2: "Aquarium Sand Beige (2lbs)" or "Aquarium Sand Black (2lbs)"
    const pattern2 = /^(.+?)\s+(Beige|Black|White|Light|Dark)\s+\((.+?)\)$/i;
    // Pattern 3: "Natural Driftwood 3 pcs (6-10 inches) Large" or "Natural Driftwood 4 pcs (4-6 inches) Small"
    const pattern3 = /^(.+?)\s+(\d+)\s+pcs\s+\((.+?)\)\s+(Large|Small)$/i;
    
    let match = label.match(pattern1) || label.match(pattern2) || label.match(pattern3);
    
    if (match) {
      let baseName, color, size;
      
      if (pattern3.test(label)) {
        // Driftwood pattern: "Natural Driftwood 3 pcs (6-10) Large"
        baseName = match[1].trim();
        // For driftwood, the full variant description is the size
        size = `${match[2]} pcs (${match[3]}) ${match[4]}`;
        color = null; // No color for driftwood
      } else if (pattern1.test(label) || pattern2.test(label)) {
        // Gravel/Sand pattern
        baseName = match[1].trim();
        color = match[2].trim();
        size = match[3].trim();
      }
      
      if (!variantGroups.has(baseName)) {
        variantGroups.set(baseName, {
          baseName,
          baseLabel: baseName,
          variants: []
        });
      }
      
      variantGroups.get(baseName).variants.push({
        ...product,
        color: color || null,
        size
      });
    } else {
      // Check if this is a standalone product or if other products are variants of it
      const firstWord = product.label.split(' ')[0];
      const hasVariants = products.some(p => 
        p.id !== product.id && 
        p.label.toLowerCase().startsWith(firstWord.toLowerCase() + ' ')
      );
      
      if (!hasVariants) {
        standalone.push(product);
      }
    }
  });
  
  return { groups: Array.from(variantGroups.values()), standalone };
}

export default function BettaBuilder() {
  const router = useRouter();

  // Track builder start
  useEffect(() => {
    analytics.trackBuilderStart("betta");
  }, []);

  // --- STATE ---
  const [experience, setExperience] = useState(null); 
  const [enclosureId, setEnclosureId] = useState(null);
  const [filtrationId, setFiltrationId] = useState(null);
  const [substrateId, setSubstrateId] = useState(null);
  const [substrateVariants, setSubstrateVariants] = useState({}); // { baseName: { color, size } }

  const [heaterId, setHeaterId] = useState(null); // Single heater selection (50w or 100w)
  const [hasThermometer, setHasThermometer] = useState(false); // Thermometer is separate
  const [decorIds, setDecorIds] = useState([]);
  const [decorVariants, setDecorVariants] = useState({}); // For driftwood variants
  const [careIds, setCareIds] = useState([]);

  // --- FILTERING LOGIC ---
  const filteredEnclosures = useMemo(() => {
    if (experience === "beginner") {
        return ENCLOSURES.filter(e => e.type !== "unsafe");
    }
    return ENCLOSURES;
  }, [experience]);

  // Filter out unsafe decor (plastic plants) - research shows they tear fins
  const filteredDecor = useMemo(() => {
    return DECOR.filter(d => d.id !== "plastic");
  }, []);

  // --- SELECTION LOGIC ---
  const selectedEnclosure = ENCLOSURES.find((e) => e.id === enclosureId);
  const selectedFiltration = FILTRATION.find((f) => f.id === filtrationId);
  
  // Handle substrate selection (including variants)
  const selectedSubstrate = useMemo(() => {
    if (!substrateId) return null;
    
    // First try to find by direct ID match
    const directMatch = SUBSTRATES.find((s) => s.id === substrateId);
    if (directMatch) return directMatch;
    
    // If not found, check variant groups
    const { groups } = groupVariants(SUBSTRATES);
    for (const group of groups) {
      const variant = group.variants.find(v => v.id === substrateId);
      if (variant) return variant;
    }
    
    return null;
  }, [substrateId]);

  const pickMany = (items, ids) => items.filter((i) => ids.includes(i.id));
  // Combine heater and thermometer for selected items
  const selectedHeating = useMemo(() => {
    const items = [];
    if (heaterId) {
      const heater = HEATING.find(h => h.id === heaterId);
      if (heater) items.push(heater);
    }
    if (hasThermometer) {
      const thermometer = HEATING.find(h => h.id === "thermometer");
      if (thermometer) items.push(thermometer);
    }
    return items;
  }, [heaterId, hasThermometer]);
  
  // Handle decor selection (including variants)
  const selectedDecor = useMemo(() => {
    return decorIds.map(id => {
      const directMatch = filteredDecor.find(d => d.id === id);
      if (directMatch) return directMatch;
      
      // Check variant groups
      const { groups } = groupVariants(filteredDecor);
      for (const group of groups) {
        const variant = group.variants.find(v => v.id === id);
        if (variant) return variant;
      }
      return null;
    }).filter(Boolean);
  }, [decorIds, filteredDecor]);
  
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
    if (heaterId || hasThermometer) score++;
    if (substrateId) score++;
    if (decorIds.length > 0) score++;
    if (careIds.length > 0) score++;

    return Math.round((score / totalSteps) * 100);
  }, [enclosureId, filtrationId, heaterId, hasThermometer, substrateId, decorIds, careIds]);

  // --- COMPATIBILITY CHECKS ---
  const checks = useMemo(() => {
    const messages = [];
    const criticalErrors = [];

    // 1. Tank Size Logic - Based on research: minimum 5 gallons (19L) required
    if (selectedEnclosure) {
      if (selectedEnclosure.size < 5) {
        const errorMsg = "Research shows tanks under 5 gallons cause stress and abnormal behavior. Minimum 5 gallons required.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
      } else if (selectedEnclosure.size === 5) {
        messages.push({ level: "ok", text: "5 Gallons meets minimum research requirements (19L)." });
      } else if (selectedEnclosure.size >= 10) {
        messages.push({ level: "ok", text: "10+ Gallons allows full expression of natural behaviors (research-backed)." });
      }
    } else {
        messages.push({ level: "warning", text: "Select a tank size." });
    }

    // 2. Filtration Logic - REQUIRED for nitrogen cycle
    if (!selectedFiltration) {
        const errorMsg = "Filter is REQUIRED. Without it, toxic ammonia will kill your fish. Nitrogen cycle cannot occur without filtration.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
    } else if (selectedFiltration.flow === "high") {
        messages.push({ level: "warning", text: "Bettas hate strong flow. Baffle this filter or choose a sponge filter." });
    } else if (selectedFiltration.flow === "low") {
        messages.push({ level: "ok", text: "Sponge filters are perfect for Bettas." });
    }

    // 3. Heating Logic - REQUIRED (tropical fish)
    if (!heaterId) {
       const errorMsg = "Heater is REQUIRED. Bettas are tropical fish and need 78-80°F. Without heat, they become stressed and susceptible to disease.";
       messages.push({ level: "error", text: errorMsg });
       criticalErrors.push(errorMsg);
    }
    if (!hasThermometer) {
       const errorMsg = "Thermometer REQUIRED. Critical for monitoring temperature. Bettas need 78-80°F - too cold weakens their immune system.";
       messages.push({ level: "error", text: errorMsg });
       criticalErrors.push(errorMsg);
    }

    // 4. Decor Logic - Plastic plants are dangerous
    const hasPlastic = decorIds.includes("plastic");
    const hasLive = decorIds.includes("live_easy");

    if (hasPlastic) {
        const errorMsg = "Plastic plants tear Betta fins and can cause infections. Remove plastic plants and use silk or live plants only.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
    }
    if (hasLive) {
        messages.push({ level: "ok", text: "Live plants help clean the water and provide enrichment!" });
    }
    if (selectedSubstrate?.id === "aquasoil" && !hasLive) {
        messages.push({ level: "warning", text: "Active Soil is meant for live plants." });
    }
    
    // Check for at least one substrate
    if (!selectedSubstrate) {
      const errorMsg = "At least one substrate REQUIRED. Choose a safe substrate for your betta's tank floor.";
      messages.push({ level: "error", text: errorMsg });
      criticalErrors.push(errorMsg);
    }

    return { messages, criticalErrors };
  }, [selectedEnclosure, selectedFiltration, heaterId, hasThermometer, decorIds, selectedSubstrate]);

  function goToSummary() {
    if (allSelectedItems.length === 0) return;
    
    // Block if there are critical errors
    if (checks.criticalErrors.length > 0) {
      // Track validation errors
      checks.criticalErrors.forEach(error => {
        analytics.trackValidationError("betta", "critical", error);
      });
      // Scroll to the first error message
      const firstError = document.querySelector('.bg-red-500\\/10');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Track builder completion
    const totalPrice = allSelectedItems.reduce((sum, item) => sum + (item.price || 0), 0);
    analytics.trackBuilderComplete("betta", totalPrice, allSelectedItems.length);
    
    const params = new URLSearchParams({
      exp: experience || "beginner",
      enclosure: enclosureId || "",
      filtration: filtrationId || "",
      substrate: substrateId || "",
      heating: heaterId ? (hasThermometer ? `${heaterId},thermometer` : heaterId) : (hasThermometer ? "thermometer" : ""),
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
            <Section 
              title="2. Tank Size" 
              icon={<Box className={enclosureId ? "text-blue-400" : "text-slate-400"} />}
              description="Choose the right size tank. Minimum 5 gallons required for bettas. Larger tanks provide better water stability and enrichment."
            >
              {!experience && (
                  <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs rounded-xl flex items-center gap-2">
                      <AlertTriangle size={16} /> Select an Experience Level above to verify safe tank sizes.
                  </div>
              )}
              {!enclosureId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20">
                  <AlertCircle size={20} className="text-amber-400 shrink-0" />
                  <p className="text-amber-100 font-medium text-base">One tank selection is required.</p>
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
                    productId={e.id}
                    isRequired={false}
                  />
                ))}
              </div>
            </Section>

            {/* 3. Filtration */}
            <Section 
              title="3. Filtration" 
              icon={<Waves className={filtrationId ? "text-blue-400" : "text-slate-400"} />}
              description="Filters are essential for the nitrogen cycle. They remove toxic ammonia and provide biological filtration. Sponge filters are ideal for bettas."
            >
              {!filtrationId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20">
                  <AlertCircle size={20} className="text-amber-400 shrink-0" />
                  <p className="text-amber-100 font-medium text-base">One filter selection is required.</p>
                </div>
              )}
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
                    productId={f.id}
                    isRequired={false}
                  />
                ))}
              </div>
            </Section>

            {/* 4. Heating */}
            <Section 
              title="4. Temperature" 
              icon={<Thermometer className={heaterId || hasThermometer ? "text-blue-400" : "text-slate-400"} />}
              description="Bettas are tropical fish and need 78-80°F. A heater is required. A thermometer helps monitor temperature."
            >
              {!heaterId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20">
                  <AlertCircle size={20} className="text-amber-400 shrink-0" />
                  <p className="text-amber-100 font-medium text-base">A heater (50W or 100W) is required.</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {HEATING.map((h) => {
                  const isHeater = h.id === "50w" || h.id === "100w";
                  const isThermometer = h.id === "thermometer";
                  const isActive = isHeater ? heaterId === h.id : (isThermometer ? hasThermometer : false);
                  
                  // Only thermometer is required (not heaters)
                  const isRequired = isThermometer && !hasThermometer;
                  
                  return (
                    <SelectionCard
                      key={h.id}
                      active={isActive}
                      label={h.label}
                      price={h.price}
                      onClick={() => {
                        if (isHeater) {
                          // Single selection for heaters - toggle if same, otherwise select new one
                          setHeaterId(heaterId === h.id ? null : h.id);
                        } else if (isThermometer) {
                          // Toggle thermometer
                          setHasThermometer(!hasThermometer);
                        }
                      }}
                      type={isHeater ? "radio" : "checkbox"}
                      colorClass="blue"
                      productId={h.id}
                      isRequired={isRequired}
                    />
                  );
                })}
              </div>
            </Section>

            {/* 5. Substrate */}
            <Section 
              title="5. Substrate" 
              icon={<Droplets className={substrateId ? "text-blue-400" : "text-slate-400"} />}
              description="Choose a safe substrate. Gravel and sand are popular choices. Active plant soil is best for live plants. Bare bottom is easiest to clean."
            >
              {!substrateId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20">
                  <AlertCircle size={20} className="text-amber-400 shrink-0" />
                  <p className="text-amber-100 font-medium text-base">At least one substrate selection is required.</p>
                </div>
              )}
              <SubstrateSection
                substrates={SUBSTRATES}
                selectedId={substrateId}
                selectedVariants={substrateVariants}
                onSelect={(id) => setSubstrateId(id)}
                onVariantSelect={(baseName, color, size, variantId) => {
                  setSubstrateVariants(prev => ({
                    ...prev,
                    [baseName]: { color, size }
                  }));
                  setSubstrateId(variantId);
                }}
              />
            </Section>

            {/* 6. Decor & Plants */}
            <Section 
              title="6. Plants & Decor" 
              icon={<Sprout className={decorIds.length ? "text-blue-400" : "text-slate-400"} />}
              description="Plants provide hiding spots and enrichment. Live plants help clean the water. Avoid plastic plants - they tear betta fins. Silk plants are safe alternatives."
            >
              <DecorSection
                decor={filteredDecor}
                selectedIds={decorIds}
                selectedVariants={decorVariants}
                onToggle={(id) => setDecorIds((ids) => toggle(ids, id))}
                onVariantToggle={(baseName, color, size, variantId) => {
                  setDecorVariants(prev => ({
                    ...prev,
                    [baseName]: { color, size }
                  }));
                  setDecorIds((ids) => toggle(ids, variantId));
                }}
              />
            </Section>

             {/* 7. Water Care */}
             <Section 
               title="7. Water Prep" 
               icon={<Droplets className={careIds.length ? "text-blue-400" : "text-slate-400"} />}
               description="Water conditioner removes toxic chlorine. Test kits monitor water quality. Beneficial bacteria helps establish the nitrogen cycle faster."
             >
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
                    productId={w.id}
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
                ) : checks.messages.length === 0 ? (
                    <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-200 text-xs flex gap-2">
                        <CheckCircle2 size={16} /> All systems nominal.
                    </div>
                ) : (
                    checks.messages.map((c, i) => (
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

function Section({ title, icon, description, children }) {
    return (
        <section className="bg-slate-900/60 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-lg">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        {icon}
                    </div>
                    {title}
                </h2>
                {description && (
                    <p className="text-sm text-slate-400 ml-[52px] leading-relaxed">{description}</p>
                )}
            </div>
            {children}
        </section>
    );
}

// Product explanations mapping - covers all products including variants
const productExplanations = {
  // Enclosures
  "bowl": "⚠️ DANGEROUS: Bowls are too small and cause severe stress. Research shows bettas in bowls exhibit abnormal behavior and have shortened lifespans. Minimum 5 gallons required.",
  "5g": "5 gallons is the absolute minimum for bettas. Research shows tanks under 5 gallons cause stress and abnormal behavior. Larger is always better.",
  "10g": "10+ gallons allows bettas to fully express natural behaviors. More stable water parameters and room for enrichment.",
  "20g": "20 gallons provides excellent water stability and plenty of space for a planted aquarium. Ideal for betta welfare.",
  
  // Filtration
  "sponge": "Sponge filters are perfect for bettas - gentle flow that won't stress them, and they provide excellent biological filtration for the nitrogen cycle.",
  "hob": "Hang-on-back filters work well but may need baffling to reduce flow. Bettas prefer gentle water movement.",
  "internal": "Internal power filters provide strong flow - may need baffling for bettas. Consider sponge filter for gentler flow.",
  
  // Heating
  "50w": "50W heaters work for 5-10 gallon tanks. Essential for tropical fish - bettas need 78-80°F to thrive.",
  "100w": "100W heaters are for larger tanks (10+ gallons). Always use a thermometer to verify temperature.",
  "thermometer": "Critical for monitoring temperature. Bettas need 78-80°F - too cold weakens their immune system.",
  
  // Substrate - base types
  "gravel": "Gravel is safe and easy to clean. Rinse thoroughly before use. Provides surface for beneficial bacteria.",
  "sand": "Sand is natural-looking and safe. Some bettas enjoy sifting through it. Rinse well before adding to tank.",
  "aquasoil": "Active plant soil releases nutrients for live plants and slightly lowers pH. Best used with live plants - not necessary for silk or plastic plants. Rinse before use to reduce cloudiness.",
  "bare": "Bare bottom is easiest to clean and prevents waste buildup. Some keepers prefer this for simplicity.",
  
  // Substrate variants (gravel and sand variants share base explanations)
  "gravel_natural_gravel_light_2lbs": "Natural gravel provides a safe substrate. Light color shows waste easily. Rinse thoroughly before use.",
  "sand_aquarium_sand_beige_2lbs": "Aquarium sand is safe and natural-looking. Beige color blends well with decor. Rinse well before adding.",
  "sand_aquarium_sand_black_2lbs": "Black sand creates a striking contrast. Safe for bettas. Rinse thoroughly before use.",
  "sand_aquarium_sand_white_2lbs": "White sand creates a clean, bright look. Safe for bettas. Rinse well before adding to tank.",
  "sand_aquarium_sand_beige_5lbs": "Aquarium sand is safe and natural-looking. Larger quantity for bigger tanks. Rinse well before use.",
  "sand_aquarium_sand_black_5lbs": "Black sand creates a striking contrast. Larger quantity for bigger tanks. Rinse thoroughly before use.",
  
  // Decor
  "plastic": "⚠️ DANGEROUS: Plastic plants have sharp edges that tear betta fins, leading to infections. Use silk or live plants instead.",
  "silk": "Silk plants are soft and safe for delicate betta fins. Avoid plastic plants which can tear fins.",
  "live_easy": "Live plants help clean the water, provide hiding spots, and create a natural environment. Easy plants like anubias and java fern are beginner-friendly.",
  "betta_log": "Floating betta logs provide a resting spot near the surface where bettas can breathe air. Great enrichment item.",
  "driftwood": "Driftwood provides natural hiding spots and can help lower pH slightly. Boil before use to remove tannins.",
  "driftwood_natural_driftwood_3_pcs_6_10_l": "Large driftwood pieces provide excellent hiding spots and natural decor. Boil before use to remove tannins and ensure it sinks.",
  
  // Water Care
  "conditioner": "Water conditioner removes chlorine and chloramine from tap water, which are toxic to fish. Essential for every water change.",
  "testkit": "Test kit is critical for monitoring water quality. Ammonia and nitrite must be 0, nitrate should be under 20 ppm.",
  "test_kit": "Test kit is critical for monitoring water quality. Ammonia and nitrite must be 0, nitrate should be under 20 ppm.",
  "bacteria": "Beneficial bacteria starter helps establish the nitrogen cycle faster. Not required but helpful for new tanks.",
};

function SelectionCard({ active, label, sublabel, price, onClick, type, productId, isRequired = false }) {
  const explanation = productId ? productExplanations[productId] : null;
  // Only show required indicator if not selected
  const showRequired = isRequired && !active;
  
  return (
    <div
      onClick={onClick}
      className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
        active
          ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] scale-[1.02]"
          : showRequired
          ? "border-amber-500/50 bg-amber-500/5 hover:border-amber-500/70 hover:bg-amber-500/10"
          : "border-slate-700/50 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border transition-all shrink-0 ${
              active 
                ? "bg-blue-500 border-blue-500 shadow-sm shadow-blue-500/50" 
                : showRequired
                ? "bg-amber-500/20 border-amber-500/50 group-hover:border-amber-500/70"
                : "bg-slate-800/50 border-slate-600 group-hover:border-slate-500"
            }`}
          >
            {active && <CheckCircle2 size={14} className="text-slate-950" />}
            {showRequired && <AlertCircle size={12} className="text-amber-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className={`font-bold text-base transition-colors flex-1 ${active ? "text-white" : showRequired ? "text-amber-100 group-hover:text-white" : "text-slate-300 group-hover:text-white"}`}>
                {label}
                {showRequired && (
                  <span className="ml-2 text-xs font-normal text-amber-400">Required</span>
                )}
              </div>
              {explanation && (
                <ProductTooltip explanation={explanation} />
              )}
            </div>
            {sublabel && (
              <div className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wide">{sublabel}</div>
            )}
          </div>
        </div>

        {/* 👇 FIX: Card price */}
        <span className={`font-mono text-sm font-bold shrink-0 ${active ? "text-blue-400" : "text-slate-500"}`}>
          ${(price || 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function SubstrateSection({ substrates, selectedId, selectedVariants, onSelect, onVariantSelect }) {
  const { groups, standalone } = groupVariants(substrates);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Standalone products (no variants) */}
      {standalone.map((s) => (
        <SelectionCard
          key={s.id}
          active={selectedId === s.id}
          label={s.label}
          price={s.price}
          sublabel={s.type}
          onClick={() => onSelect(s.id)}
          type="radio"
          colorClass="blue"
          productId={s.id}
          isRequired={false}
        />
      ))}
      
      {/* Variant groups */}
      {groups.map((group) => {
        const variantSelection = selectedVariants[group.baseName];
        const selectedVariant = variantSelection 
          ? group.variants.find(v => v.color === variantSelection.color && v.size === variantSelection.size)
          : null;
        const isActive = selectedVariant && selectedId === selectedVariant.id;
        
        // Get unique colors and sizes
        const colors = [...new Set(group.variants.map(v => v.color))].sort();
        const sizes = [...new Set(group.variants.map(v => v.size))].sort();
        
        // Get price range
        const prices = group.variants.map(v => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
        
        return (
          <VariantCard
            key={group.baseName}
            baseLabel={group.baseLabel}
            priceRange={priceRange}
            colors={colors}
            sizes={sizes}
            variants={group.variants}
            isActive={isActive}
            selectedColor={variantSelection?.color}
            selectedSize={variantSelection?.size}
            onColorChange={(color) => {
              // Find a variant with this color (prefer current size, or first available)
              const size = variantSelection?.size || sizes[0];
              const variant = group.variants.find(v => v.color === color && v.size === size) ||
                            group.variants.find(v => v.color === color);
              if (variant) {
                onVariantSelect(group.baseName, variant.color, variant.size, variant.id);
              }
            }}
            onSizeChange={(size) => {
              // Find a variant with this size (prefer current color, or first available)
              const color = variantSelection?.color || colors[0];
              const variant = group.variants.find(v => v.color === color && v.size === size) ||
                            group.variants.find(v => v.size === size);
              if (variant) {
                onVariantSelect(group.baseName, variant.color, variant.size, variant.id);
              }
            }}
            onSelect={() => {
              // Select first variant if none selected
              if (!variantSelection && group.variants.length > 0) {
                const first = group.variants[0];
                onVariantSelect(group.baseName, first.color, first.size, first.id);
              }
            }}
          />
        );
      })}
    </div>
  );
}

function DecorSection({ decor, selectedIds, selectedVariants, onToggle, onVariantToggle }) {
  const { groups, standalone } = groupVariants(decor);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Standalone products (no variants) */}
      {standalone.map((d) => (
        <SelectionCard
          key={d.id}
          active={selectedIds.includes(d.id)}
          label={d.label}
          price={d.price}
          onClick={() => onToggle(d.id)}
          type="checkbox"
          colorClass="blue"
          productId={d.id}
        />
      ))}
      
      {/* Variant groups */}
      {groups.map((group) => {
        const variantSelection = selectedVariants[group.baseName];
        // Check if this is a driftwood-style variant (no color, just size)
        const isSizeOnly = group.variants.some(v => v.color === null);
        
        let selectedVariant = null;
        if (variantSelection) {
          if (isSizeOnly) {
            // For size-only variants (like driftwood), match by size only
            selectedVariant = group.variants.find(v => v.size === variantSelection.size);
          } else {
            // For color+size variants, match by both
            selectedVariant = group.variants.find(v => v.color === variantSelection.color && v.size === variantSelection.size);
          }
        }
        
        const isActive = selectedVariant && selectedIds.includes(selectedVariant.id);
        
        // Get unique colors and sizes (filter out null colors)
        const colors = [...new Set(group.variants.map(v => v.color).filter(c => c !== null))].sort();
        const sizes = [...new Set(group.variants.map(v => v.size))].sort();
        
        // Get price range
        const prices = group.variants.map(v => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
        
        return (
          <VariantCard
            key={group.baseName}
            baseLabel={group.baseLabel}
            priceRange={priceRange}
            colors={colors}
            sizes={sizes}
            variants={group.variants}
            isActive={isActive}
            selectedColor={variantSelection?.color}
            selectedSize={variantSelection?.size}
            isCheckbox={true}
            isSizeOnly={isSizeOnly}
            onColorChange={(color) => {
              if (isSizeOnly) return; // No color changes for size-only variants
              const size = variantSelection?.size || sizes[0];
              const variant = group.variants.find(v => v.color === color && v.size === size) ||
                            group.variants.find(v => v.color === color);
              if (variant) {
                onVariantToggle(group.baseName, variant.color, variant.size, variant.id);
              }
            }}
            onSizeChange={(size) => {
              if (isSizeOnly) {
                // For size-only variants, just find by size
                const variant = group.variants.find(v => v.size === size);
                if (variant) {
                  onVariantToggle(group.baseName, null, variant.size, variant.id);
                }
              } else {
                // For color+size variants, prefer current color
                const color = variantSelection?.color || colors[0];
                const variant = group.variants.find(v => v.color === color && v.size === size) ||
                              group.variants.find(v => v.size === size);
                if (variant) {
                  onVariantToggle(group.baseName, variant.color, variant.size, variant.id);
                }
              }
            }}
            onSelect={() => {
              if (!variantSelection && group.variants.length > 0) {
                const first = group.variants[0];
                onVariantToggle(group.baseName, first.color, first.size, first.id);
              }
            }}
          />
        );
      })}
    </div>
  );
}

function VariantCard({ baseLabel, priceRange, colors, sizes, variants, isActive, selectedColor, selectedSize, onColorChange, onSizeChange, onSelect, isCheckbox = false, isSizeOnly = false }) {
  let selectedVariant = null;
  if (isSizeOnly) {
    selectedVariant = variants.find(v => v.size === selectedSize);
  } else {
    selectedVariant = variants.find(v => v.color === selectedColor && v.size === selectedSize);
  }
  const displayPrice = selectedVariant ? `$${selectedVariant.price.toFixed(2)}` : priceRange;
  
  return (
    <div
      className={`group relative p-5 rounded-2xl border transition-all duration-300 ${
        isActive
          ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] scale-[1.02]"
          : "border-slate-700/50 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
              isActive 
                ? "bg-blue-500 border-blue-500 shadow-sm shadow-blue-500/50" 
                : "bg-slate-800/50 border-slate-600 group-hover:border-slate-500"
            }`}
          >
            {isActive && <CheckCircle2 size={14} className="text-slate-950" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className={`font-bold text-base transition-colors flex-1 ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                {baseLabel}
              </div>
              {(() => {
                // Get explanation - try specific variant ID first, then base type
                const variantId = selectedVariant?.id;
                const baseType = baseLabel.toLowerCase().includes("gravel") ? "gravel" : 
                                baseLabel.toLowerCase().includes("sand") ? "sand" :
                                baseLabel.toLowerCase().includes("driftwood") ? "driftwood" : null;
                const explanation = variantId && productExplanations[variantId] 
                  ? productExplanations[variantId]
                  : baseType && productExplanations[baseType]
                  ? productExplanations[baseType]
                  : null;
                return explanation ? <ProductTooltip explanation={explanation} /> : null;
              })()}
            </div>
            {selectedVariant && (
              <div className="text-xs text-slate-400 mt-1">
                {isSizeOnly ? selectedSize : `${selectedColor} • ${selectedSize}`}
              </div>
            )}
          </div>
        </div>

        <span className={`font-mono text-sm font-bold ${isActive ? "text-blue-400" : "text-slate-500"}`}>
          {displayPrice}
        </span>
      </div>
      
      {/* Variant Selectors */}
      <div className="space-y-2 mt-3">
        {!isSizeOnly && colors.length > 1 && (
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Color</label>
            <select
              value={selectedColor || ""}
              onChange={(e) => onColorChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select color</option>
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        )}
        
        {sizes.length > 1 && (
          <div>
            <label className="text-xs text-slate-400 mb-1 block">{isSizeOnly ? "Variant" : "Size"}</label>
            <select
              value={selectedSize || ""}
              onChange={(e) => onSizeChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select {isSizeOnly ? "variant" : "size"}</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}