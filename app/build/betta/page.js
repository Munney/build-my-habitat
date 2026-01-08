"use client";

import { useMemo, useState, useEffect, useRef } from "react";
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
  AlertCircle,
  Menu,
  X
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
  const groupedProductIds = new Set(); // Track which product IDs have been grouped
  
  products.forEach(product => {
    const label = product.label;
    
    // Pattern 1: "Natural Gravel - Light (2lbs)" or "Natural Gravel - Dark (5lbs)"
    const pattern1 = /^(.+?)\s+-\s+(Light|Dark|Beige|Black|White)\s+\((.+?)\)$/i;
    // Pattern 2: "Aquarium Sand Beige (2lbs)" or "Aquarium Sand Black (2lbs)" - but NOT "Active Plant Soil Dark"
    // Exclude "Active Plant Soil" from pattern2 matching
    const pattern2 = /^(.+?)\s+(Beige|Black|White|Light|Dark)\s+\((.+?)\)$/i;
    // Pattern 3: "Natural Driftwood 3 pcs (6-10 inches) Large" or "Natural Driftwood 4 pcs (4-6 inches) Small"
    const pattern3 = /^(.+?)\s+(\d+)\s+pcs\s+\((.+?)\)\s+(Large|Small)$/i;
    
    // Skip pattern2 for "Active Plant Soil" - it should be standalone
    const isActivePlantSoil = label.toLowerCase().includes("active plant soil");
    
    let match = label.match(pattern1) || (!isActivePlantSoil && label.match(pattern2)) || label.match(pattern3);
    
    if (match && !isActivePlantSoil) {
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
      groupedProductIds.add(product.id);
    } else {
      // Check if this is a standalone product or if other products are variants of it
      const firstWord = product.label.split(' ')[0];
      const hasVariants = products.some(p => 
        p.id !== product.id && 
        p.label.toLowerCase().startsWith(firstWord.toLowerCase() + ' ') &&
        !groupedProductIds.has(p.id)
      );
      
      if (!hasVariants || isActivePlantSoil) {
        standalone.push(product);
      }
    }
  });
  
  // Filter out groups with only one variant (these should be standalone)
  const validGroups = Array.from(variantGroups.values()).filter(group => {
    if (group.variants.length === 1) {
      // Move single-variant products back to standalone
      standalone.push(group.variants[0]);
      groupedProductIds.delete(group.variants[0].id);
      return false;
    }
    return true;
  });
  
  // Filter standalone to exclude any products that are in groups
  const finalStandalone = standalone.filter(p => !groupedProductIds.has(p.id));
  
  return { groups: validGroups, standalone: finalStandalone };
}

export default function BettaBuilder() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Track builder start
  useEffect(() => {
    analytics.trackBuilderStart("betta");
  }, []);

  // Scroll animations and section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-100px 0px -100px 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
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
    const totalSteps = 7; // Experience + 6 sections
    
    if (experience) score++;
    if (enclosureId) score++;
    if (filtrationId) score++;
    if (heaterId && hasThermometer) score++;
    if (substrateId) score++;
    if (decorIds.length > 0) score++;
    if (careIds.length > 0) score++;

    return Math.round((score / totalSteps) * 100);
  }, [experience, enclosureId, filtrationId, heaterId, hasThermometer, substrateId, decorIds, careIds]);

  // Section completion tracking
  const sectionCompletion = useMemo(() => ({
    experience: !!experience,
    enclosure: !!enclosureId,
    filtration: !!filtrationId,
    temperature: !!heaterId && hasThermometer,
    substrate: !!substrateId,
    decor: decorIds.length > 0,
    watercare: careIds.length > 0,
  }), [experience, enclosureId, filtrationId, heaterId, hasThermometer, substrateId, decorIds, careIds]);

  // Section navigation data
  const sections = [
    { id: 'experience', title: 'Keeper Level', icon: Target },
    { id: 'enclosure', title: 'Tank Size', icon: Box },
    { id: 'filtration', title: 'Filtration', icon: Waves },
    { id: 'temperature', title: 'Temperature', icon: Thermometer },
    { id: 'substrate', title: 'Substrate', icon: Droplets },
    { id: 'decor', title: 'Plants & Decor', icon: Sprout },
    { id: 'watercare', title: 'Water Prep', icon: Droplets },
  ];

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

  const scrollToSection = (sectionId) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 180; // Account for navbar (112px) + progress bar (68px) + padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6">
      
      {/* Horizontal Progress Bar */}
      <div className="sticky top-[112px] z-40 mb-8 bg-slate-900/90 backdrop-blur-md border-b border-white/10 rounded-b-2xl overflow-hidden">
        <div className="h-1 bg-slate-800/50 relative">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-700 ease-out shadow-lg shadow-blue-500/30"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="px-6 py-3 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Build Progress</span>
          <span className="text-sm font-black text-blue-400">{progress}%</span>
        </div>
      </div>

      {/* Sticky Section Quick-Nav (Desktop) */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-30">
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isCompleted = sectionCompletion[section.id];
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative w-full p-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-blue-500/20 border border-blue-500/50 shadow-lg shadow-blue-500/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                  title={section.title}
                >
                  <Icon size={16} className={isActive ? "text-blue-400" : isCompleted ? "text-emerald-400" : "text-slate-500"} />
                  {isCompleted && !isActive && (
                    <CheckCircle2 size={12} className="text-emerald-400 absolute -top-1 -right-1 bg-slate-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-2xl shadow-blue-500/50 flex items-center justify-center border-2 border-blue-400/30 hover:scale-110 transition-transform"
      >
        {isMobileSidebarOpen ? <X size={24} /> : <ShoppingCart size={24} />}
      </button>
      
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

            {/* Progress Radial (Desktop) */}
            <div className="hidden md:flex items-center gap-4 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
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
            <Section 
              title="1. Keeper Level" 
              icon={<Target />}
              sectionId="experience"
              isCompleted={sectionCompletion.experience}
              sectionRef={(el) => { if (el) sectionRefs.current.experience = el; }}
            >
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
              icon={<Box />}
              description="Choose the right size tank. Minimum 5 gallons required for bettas. Larger tanks provide better water stability and enrichment."
              sectionId="enclosure"
              isCompleted={sectionCompletion.enclosure}
              sectionRef={(el) => { if (el) sectionRefs.current.enclosure = el; }}
            >
              {!experience && (
                  <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs rounded-xl flex items-center gap-2">
                      <AlertTriangle size={16} /> Select an Experience Level above to verify safe tank sizes.
                  </div>
              )}
              {!enclosureId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20" role="alert">
                  <AlertCircle size={20} className="text-amber-400 shrink-0 flex-shrink-0" />
                  <p className="text-amber-100 font-medium text-base flex-1">One tank selection is required.</p>
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
              icon={<Waves />}
              description="Filters are essential for the nitrogen cycle. They remove toxic ammonia and provide biological filtration. Sponge filters are ideal for bettas."
              sectionId="filtration"
              isCompleted={sectionCompletion.filtration}
              sectionRef={(el) => { if (el) sectionRefs.current.filtration = el; }}
            >
              {!filtrationId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20" role="alert">
                  <AlertCircle size={20} className="text-amber-400 shrink-0 flex-shrink-0" />
                  <p className="text-amber-100 font-medium text-base flex-1">One filter selection is required.</p>
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
              icon={<Thermometer />}
              description="Bettas are tropical fish and need 78-80°F. A heater is required. A thermometer helps monitor temperature."
              sectionId="temperature"
              isCompleted={sectionCompletion.temperature}
              sectionRef={(el) => { if (el) sectionRefs.current.temperature = el; }}
            >
              {!heaterId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20" role="alert">
                  <AlertCircle size={20} className="text-amber-400 shrink-0 flex-shrink-0" />
                  <p className="text-amber-100 font-medium text-base flex-1">A heater (50W or 100W) is required.</p>
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
              icon={<Droplets />}
              description="Choose a safe substrate. Gravel and sand are popular choices. Active plant soil is best for live plants. Bare bottom is easiest to clean."
              sectionId="substrate"
              isCompleted={sectionCompletion.substrate}
              sectionRef={(el) => { if (el) sectionRefs.current.substrate = el; }}
            >
              {!substrateId && (
                <div className="mb-4 p-4 bg-amber-500/20 border-2 border-amber-500/70 rounded-xl flex items-center gap-3 shadow-lg shadow-amber-500/20" role="alert">
                  <AlertCircle size={20} className="text-amber-400 shrink-0 flex-shrink-0" />
                  <p className="text-amber-100 font-medium text-base flex-1">At least one substrate selection is required.</p>
                </div>
              )}
              <SubstrateSection
                substrates={SUBSTRATES}
                selectedId={substrateId}
                selectedVariants={substrateVariants}
                onSelect={(id) => {
                  // Toggle behavior: if same ID, deselect (set to null)
                  setSubstrateId(substrateId === id ? null : id);
                }}
                onVariantSelect={(baseName, color, size, variantId) => {
                  if (variantId === null) {
                    // Deselect
                    setSubstrateVariants(prev => {
                      const newVariants = { ...prev };
                      delete newVariants[baseName];
                      return newVariants;
                    });
                    setSubstrateId(null);
                  } else {
                    // Select variant
                    setSubstrateVariants(prev => ({
                      ...prev,
                      [baseName]: { color, size }
                    }));
                    setSubstrateId(variantId);
                  }
                }}
              />
            </Section>

            {/* 6. Decor & Plants */}
            <Section 
              title="6. Plants & Decor" 
              icon={<Sprout />}
              description="Plants provide hiding spots and enrichment. Live plants help clean the water. Avoid plastic plants - they tear betta fins. Silk plants are safe alternatives."
              sectionId="decor"
              isCompleted={sectionCompletion.decor}
              sectionRef={(el) => { if (el) sectionRefs.current.decor = el; }}
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
               icon={<Droplets />}
               description="Water conditioner removes toxic chlorine. Test kits monitor water quality. Beneficial bacteria helps establish the nitrogen cycle faster."
               sectionId="watercare"
               isCompleted={sectionCompletion.watercare}
               sectionRef={(el) => { if (el) sectionRefs.current.watercare = el; }}
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

          {/* --- RIGHT: HUD SIDEBAR (Desktop) --- */}
          <aside className="hidden lg:block lg:sticky lg:top-40 h-fit space-y-6">
            
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
                <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {allSelectedItems.length === 0 ? (
                    <div className="text-center py-12 opacity-60 animate-pulse">
                        <div className="mx-auto w-16 h-16 border-2 border-dashed border-slate-500/50 rounded-2xl mb-4 flex items-center justify-center bg-slate-800/30 backdrop-blur-sm">
                            <ShoppingCart size={24} className="text-slate-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-400 mb-1">Your build will appear here</p>
                        <p className="text-xs text-slate-500">Select items from the sections below</p>
                    </div>
                  ) : (
                    allSelectedItems.map((item, index) => (
                        <div 
                          key={item.id} 
                          className="group relative p-3 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                          style={{ animation: `fadeInSlide 0.3s ease-out ${index * 50}ms forwards` }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors line-clamp-2">
                                {item.label}
                              </p>
                            </div>
                            <span className="font-mono text-sm font-bold text-blue-400 shrink-0">
                                ${(item.price || 0).toFixed(2)}
                            </span>
                          </div>
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
                  className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                    allSelectedItems.length === 0 
                        ? "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50" 
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-2 border-blue-400/30 hover:border-blue-300/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] shadow-lg shadow-blue-900/30"
                  }`}
                >
                  Generate List <ArrowRight size={20} className="drop-shadow-sm" />
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

        {/* --- MOBILE BOTTOM SIDEBAR --- */}
        <div 
          className={`lg:hidden fixed inset-x-0 bottom-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-transform duration-300 ease-out ${
            isMobileSidebarOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ maxHeight: '70vh' }}
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2 text-white">
              <ShoppingCart size={18} className="text-blue-400" /> Inventory
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                  {allSelectedItems.length} ITEMS
              </span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 120px)' }}>
            <div className="space-y-2 mb-4">
              {allSelectedItems.length === 0 ? (
                <div className="text-center py-12 opacity-60">
                  <div className="mx-auto w-16 h-16 border-2 border-dashed border-slate-500/50 rounded-2xl mb-4 flex items-center justify-center bg-slate-800/30">
                    <ShoppingCart size={24} className="text-slate-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-400 mb-1">Your build will appear here</p>
                  <p className="text-xs text-slate-500">Select items from the sections above</p>
                </div>
              ) : (
                allSelectedItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="group p-3 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                          {item.label}
                        </p>
                      </div>
                      <span className="font-mono text-sm font-bold text-blue-400 shrink-0">
                          ${(item.price || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-white/10 pt-4 mb-4">
              <div className="flex justify-between items-end mb-4">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Estimate</span>
                <span className="text-3xl font-black text-white tracking-tight">${totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  goToSummary();
                  setIsMobileSidebarOpen(false);
                }}
                disabled={allSelectedItems.length === 0}
                className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  allSelectedItems.length === 0 
                      ? "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50" 
                      : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-2 border-blue-400/30 hover:border-blue-300/50 shadow-lg shadow-blue-900/30"
                }`}
              >
                Generate List <ArrowRight size={20} className="drop-shadow-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- UI COMPONENTS (Adapted for Blue Theme) ---------- */

function Section({ title, icon, description, children, sectionId, isCompleted, sectionRef }) {
    return (
        <section 
          id={sectionId}
          ref={sectionRef}
          className={`relative bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-md p-8 rounded-3xl border-2 shadow-xl overflow-hidden transition-all duration-500 ${
            isCompleted ? 'border-blue-500/50' : 'border-white/10'
          }`}
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />
            
            {/* Completion indicator */}
            {isCompleted && (
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/30 z-10">
                <CheckCircle2 size={16} className="text-white" />
              </div>
            )}
            
            <div className="relative mb-6">
                <h2 className="text-2xl font-black text-white mb-3 flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br rounded-xl border-2 shadow-lg transition-all duration-300 ${
                      isCompleted 
                        ? 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 shadow-emerald-500/10' 
                        : 'from-blue-500/20 to-blue-600/20 border-blue-500/30 shadow-blue-500/10'
                    }`}>
                        <div className={isCompleted ? "text-emerald-400" : "text-blue-400"}>
                            {icon}
                        </div>
                    </div>
                    <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent drop-shadow-sm">
                        {title}
                    </span>
                </h2>
                {description && (
                    <p className="text-sm text-slate-300 ml-[68px] leading-relaxed font-medium">{description}</p>
                )}
            </div>
            <div className="relative">
                {children}
            </div>
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
      className={`group relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
        active
          ? "border-blue-500/80 bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-slate-900/60 shadow-[0_0_40px_-5px_rgba(59,130,246,0.4)] shadow-blue-500/20 scale-[1.02]"
          : showRequired
          ? "border-amber-500/60 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-900/60 hover:border-amber-500/80 hover:shadow-lg hover:shadow-amber-500/10"
          : "border-slate-700/60 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/70 hover:border-blue-500/40 hover:bg-gradient-to-br hover:from-slate-800/70 hover:via-slate-800/50 hover:to-slate-800/70 hover:shadow-lg hover:shadow-blue-500/10"
      }`}
    >
      {/* Premium accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-all duration-300 ${
        active 
          ? "from-blue-400 via-cyan-400 to-blue-500 opacity-100" 
          : showRequired
          ? "from-amber-400 via-amber-300 to-amber-400 opacity-100"
          : "from-transparent via-slate-700 to-transparent opacity-0 group-hover:opacity-100 group-hover:from-blue-500/50 group-hover:via-blue-400/50 group-hover:to-blue-500/50"
      }`} />
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div
            className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shadow-lg shrink-0 ${
              active 
                ? "bg-gradient-to-br from-blue-400 to-blue-600 border-blue-400 shadow-blue-500/50" 
                : showRequired
                ? "bg-gradient-to-br from-amber-500/30 to-amber-600/30 border-amber-500/60 shadow-amber-500/30"
                : "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 group-hover:border-blue-500/50 group-hover:shadow-blue-500/20"
            }`}
          >
            {active && <CheckCircle2 size={16} className="text-white drop-shadow-sm" />}
            {showRequired && <AlertCircle size={14} className="text-amber-400 drop-shadow-sm" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className={`font-bold text-lg transition-colors flex-1 ${active ? "text-white drop-shadow-sm" : showRequired ? "text-amber-100 group-hover:text-white" : "text-slate-200 group-hover:text-white"}`}>
                {label}
                {showRequired && (
                  <span className="ml-2 text-xs font-semibold text-amber-400 uppercase tracking-wide">Required</span>
                )}
              </div>
              {explanation && (
                <ProductTooltip explanation={explanation} />
              )}
            </div>
            {sublabel && (
              <div className="text-xs font-medium text-slate-400 mt-1.5 px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 inline-block uppercase tracking-wide">{sublabel}</div>
            )}
          </div>
        </div>

        <div className={`flex flex-col items-end shrink-0 ${active ? "text-blue-400" : showRequired ? "text-amber-400" : "text-slate-400"}`}>
          <span className="font-mono text-lg font-bold">${(price || 0).toFixed(2)}</span>
        </div>
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
              // Always select first variant when clicking the card (for betta, single select behavior)
              if (group.variants.length > 0) {
                // If already selected and active, deselect it (toggle behavior)
                if (variantSelection && selectedVariant && selectedId === selectedVariant.id) {
                  // Toggle off
                  onVariantSelect(group.baseName, null, null, null);
                } else {
                  // Select first variant
                  const first = group.variants[0];
                  onVariantSelect(group.baseName, first.color, first.size, first.id);
                }
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
      className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
        isActive
          ? "border-blue-500/80 bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-slate-900/60 shadow-[0_0_40px_-5px_rgba(59,130,246,0.4)] shadow-blue-500/20 scale-[1.02]"
          : "border-slate-700/60 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/70 hover:border-blue-500/40 hover:bg-gradient-to-br hover:from-slate-800/70 hover:via-slate-800/50 hover:to-slate-800/70 hover:shadow-lg hover:shadow-blue-500/10"
      }`}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Premium accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-all duration-300 ${
        isActive 
          ? "from-blue-400 via-cyan-400 to-blue-500 opacity-100" 
          : "from-transparent via-slate-700 to-transparent opacity-0 group-hover:opacity-100 group-hover:from-blue-500/50 group-hover:via-blue-400/50 group-hover:to-blue-500/50"
      }`} />
      
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div
            className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
              isActive 
                ? "bg-gradient-to-br from-blue-400 to-blue-600 border-blue-400 shadow-blue-500/50" 
                : "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 group-hover:border-blue-500/50 group-hover:shadow-blue-500/20"
            }`}
          >
            {isActive && <CheckCircle2 size={16} className="text-white drop-shadow-sm" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className={`font-bold text-lg transition-colors flex-1 ${isActive ? "text-white drop-shadow-sm" : "text-slate-200 group-hover:text-white"}`}>
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
              <div className="text-xs font-medium mt-1.5 px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 inline-block">
                <span className={`${isActive ? "text-blue-300" : "text-slate-400"}`}>
                  {isSizeOnly ? selectedSize : `${selectedColor} • ${selectedSize}`}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={`flex flex-col items-end shrink-0 ${isActive ? "text-blue-400" : "text-slate-400"}`}>
          <span className="font-mono text-lg font-bold">{displayPrice}</span>
          {selectedVariant && displayPrice !== priceRange && (
            <span className="text-xs text-slate-500 line-through mt-0.5">{priceRange}</span>
          )}
        </div>
      </div>
      
      {/* Premium Variant Selectors */}
      <div className="space-y-3 mt-4 pt-4 border-t border-slate-700/30">
        {!isSizeOnly && colors.length > 1 && (
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 block uppercase tracking-wider">Color</label>
            <select
              value={selectedColor || ""}
              onChange={(e) => onColorChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className={`w-full bg-slate-900 border-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-100 transition-all duration-200 ${
                isActive
                  ? "border-blue-500/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                  : "border-slate-600/50 hover:border-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              } focus:outline-none cursor-pointer`}
              style={{ colorScheme: 'dark' }}
            >
              <option value="" className="bg-slate-900 text-slate-100">Select color</option>
              {colors.map(color => (
                <option key={color} value={color} className="bg-slate-900 text-slate-100">{color}</option>
              ))}
            </select>
          </div>
        )}
        
        {sizes.length > 1 && (
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 block uppercase tracking-wider">{isSizeOnly ? "Variant" : "Size"}</label>
            <select
              value={selectedSize || ""}
              onChange={(e) => onSizeChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className={`w-full bg-slate-900 border-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-100 transition-all duration-200 ${
                isActive
                  ? "border-blue-500/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                  : "border-slate-600/50 hover:border-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              } focus:outline-none cursor-pointer`}
              style={{ colorScheme: 'dark' }}
            >
              <option value="" className="bg-slate-900 text-slate-100">Select {isSizeOnly ? "variant" : "size"}</option>
              {sizes.map(size => (
                <option key={size} value={size} className="bg-slate-900 text-slate-100">{size}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}