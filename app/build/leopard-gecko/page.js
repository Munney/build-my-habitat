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
  Layers,
  Home as HomeIcon,
  Zap,
  ShieldCheck,
  Unlock,
  AlertCircle,
  Menu,
  X,
  Sun
} from "lucide-react";
import config from "../../../data/leopard-gecko.json";
import ProductTooltip from "../../components/ProductTooltip";

// Data Imports
const ENCLOSURES = config.enclosures || [];
const HEATING = config.heating || [];
const SUBSTRATES = config.substrates || [];
const HIDES = config.hides || [];
const SUPPLEMENTS = config.supplements || [];

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
    const id = product.id;
    
    // Pattern for halogen: "Halogen Flood Lamp (2 pack - 50W) 20 gallon tank"
    const halogenPattern = /^Halogen Flood Lamp.*?(\d+W).*?$/i;
    // Pattern for DHP: "Deep Heat Projector (DHP) (2 pack) 50W 20 Gallon Tank"
    const dhpPattern = /^Deep Heat Projector.*?(\d+W).*?$/i;
    // Pattern for UVB: "ShadeDweller UVB Kit (8W, 12 inch) 20 Gallon Tank"
    const uvbPattern = /^ShadeDweller UVB Kit.*?(\d+W,?\s*(\d+)\s*inch).*?$/i;
    // Pattern for heat mat: "Under Tank Heater (Mat) (10-20 gallon)"
    const heatmatPattern = /^Under Tank Heater.*?\((\d+-\d+)\s*gallon\)/i;
    // Pattern for slate: "Slate Tile / Stone 6 in x 6 in (Square) 20 Gallon Tank"
    const slatePattern = /^Slate Tile.*?(\d+\.?\d*)\s*in.*?(\d+\.?\d*)\s*in.*?$/i;
    // Pattern for liner: "Reptile Carpet (20 Gallon Tank)"
    const linerPattern = /^Reptile Carpet.*?\((\d+)\s*Gallon.*?\)/i;
    // Pattern for bioactive: "BioActive Terra Sahara 18 qts (20-40 Gallon Tanks)"
    const bioactivePattern = /^BioActive Terra Sahara\s+(\d+)\s*qts/i;
    // Pattern for sand: "Reptile Sand (Calcium) (White)"
    const sandPattern = /^Reptile Sand.*?\(Calcium\).*?\((\w+)\)/i;
    // Pattern for topsoil: "Organic Topsoil Mix (Cocunut Chips)"
    const topsoilPattern = /^Organic Topsoil Mix\s+\((.+?)\)/i;
    // Pattern for cork bark: "Cork Bark Flat 4 pcs"
    const corkPattern = /^Cork Bark Flat\s+(\d+)\s+pcs/i;
    // Pattern for branches: "Climbing Branches 4 pcs (14-16 inches)"
    const branchesPattern = /^Climbing Branches\s+(\d+)\s+pcs\s+\((.+?)\)/i;
    
    let match = label.match(halogenPattern) || label.match(dhpPattern) || label.match(uvbPattern) || 
                label.match(heatmatPattern) || label.match(slatePattern) || label.match(linerPattern) ||
                label.match(bioactivePattern) || label.match(sandPattern) || label.match(topsoilPattern) ||
                label.match(corkPattern) || label.match(branchesPattern);
    
    if (match) {
      let baseName, variant, tankSize;
      
      // Extract tank size from label (look for patterns like "20 gallon", "40 Gallon", "120 Gallon", "4x2x2", etc.)
      const tankSizePatterns = [
        /(\d+)\s*gallon\s*tank/i,
        /(\d+)\s*Gallon\s*Tank/i,
        /(\d+-\d+)\s*gallon/i,
        /(\d+x\d+x\d+)/i,
        /\((\d+)\s*Gallon/i
      ];
      
      for (const pattern of tankSizePatterns) {
        const sizeMatch = label.match(pattern);
        if (sizeMatch) {
          if (sizeMatch[1].includes('x')) {
            tankSize = sizeMatch[1]; // e.g., "4x2x2"
          } else if (sizeMatch[1].includes('-')) {
            tankSize = `${sizeMatch[1]} gallon`; // e.g., "10-20 gallon"
          } else {
            tankSize = `${sizeMatch[1]} gallon`; // e.g., "20 gallon"
          }
          break;
        }
      }
      
      if (halogenPattern.test(label)) {
        baseName = "Halogen Flood Lamp";
        variant = match[1]; // e.g., "50W"
      } else if (dhpPattern.test(label)) {
        baseName = "Deep Heat Projector (DHP)";
        variant = match[1]; // e.g., "50W"
      } else if (uvbPattern.test(label)) {
        baseName = "UVB Kit";
        variant = match[2] ? `${match[2]}"` : match[1]; // e.g., "12" or "8W"
      } else if (heatmatPattern.test(label)) {
        baseName = "Under Tank Heater (Mat)";
        variant = match[1]; // e.g., "10-20"
        tankSize = `${match[1]} gallon`; // Already extracted from pattern
      } else if (slatePattern.test(label)) {
        baseName = "Slate Tile / Stone";
        variant = `${match[1]}" x ${match[2]}"`; // e.g., "6" x 6""
      } else if (linerPattern.test(label)) {
        baseName = "Reptile Carpet";
        variant = `${match[1]} gallon`; // e.g., "20 gallon"
        tankSize = `${match[1]} gallon`; // Already extracted from pattern
      } else if (bioactivePattern.test(label)) {
        baseName = "BioActive Terra Sahara";
        variant = `${match[1]} qts`; // e.g., "18 qts"
      } else if (sandPattern.test(label)) {
        baseName = "Reptile Sand (Calcium)";
        variant = match[1]; // e.g., "White"
      } else if (topsoilPattern.test(label)) {
        baseName = "Organic Topsoil Mix";
        variant = match[1]; // e.g., "Cocunut Chips"
      } else if (corkPattern.test(label) && label.includes("4 pcs")) {
        // Only group "Cork Bark Flat 4 pcs", not standalone "Cork Bark Flat"
        baseName = "Cork Bark Flat";
        variant = `${match[1]} pcs`; // e.g., "4 pcs"
      } else if (branchesPattern.test(label)) {
        // Only group "Climbing Branches 4 pcs (14-16 inches)", not standalone "Climbing Branches"
        baseName = "Climbing Branches";
        variant = `${match[1]} pcs (${match[2]})`; // e.g., "4 pcs (14-16 inches)"
      }
      
      if (baseName) {
        if (!variantGroups.has(baseName)) {
          variantGroups.set(baseName, {
            baseName,
            baseLabel: baseName,
            variants: []
          });
        }
        
        variantGroups.get(baseName).variants.push({
          ...product,
          variant,
          tankSize: tankSize || null
        });
        
        // Mark this product ID as grouped so it won't be added to standalone
        groupedProductIds.add(id);
      }
    } else {
      // Skip if this product was already grouped as a variant
      if (groupedProductIds.has(id)) {
        return; // Don't add to standalone
      }
      
      // Check if this is a standalone product that should be excluded because it has variants
      const labelLower = product.label.toLowerCase();
      
      // Check if this product has a variant that was already grouped
      const hasGroupedVariant = Array.from(variantGroups.values()).some(group => {
        // Check if any variant in this group matches the base name of the current product
        const groupBaseLower = group.baseName.toLowerCase();
        if (labelLower === groupBaseLower) {
          // This standalone product has a variant group, exclude it
          return true;
        }
        // Also check if the product label starts with the group base name (for partial matches)
        if (labelLower.startsWith(groupBaseLower + ' ') || groupBaseLower.startsWith(labelLower + ' ')) {
          return true;
        }
        return false;
      });
      
      if (!hasGroupedVariant) {
        // Also check for specific exclusions
        // Exclude standalone "Cork Bark Flat" if "Cork Bark Flat 4 pcs" variant exists
        if (labelLower === "cork bark flat") {
          const hasVariant = products.some(p => 
            p.id !== product.id && 
            p.label.toLowerCase().includes("cork bark flat") && 
            p.label.toLowerCase().includes("4 pcs")
          );
          if (!hasVariant) {
            standalone.push(product);
          }
        }
        // Exclude standalone "Climbing Branches" if "Climbing Branches 4 pcs" variant exists
        else if (labelLower === "climbing branches") {
          const hasVariant = products.some(p => 
            p.id !== product.id && 
            p.label.toLowerCase().includes("climbing branches") && 
            p.label.toLowerCase().includes("4 pcs")
          );
          if (!hasVariant) {
            standalone.push(product);
          }
        }
        // Exclude standalone "Slate Tile / Stone" if variants exist
        else if (labelLower === "slate tile / stone" || labelLower === "slate tile/stone") {
          const hasVariant = products.some(p => 
            p.id !== product.id && 
            p.label.toLowerCase().startsWith("slate tile") && 
            (p.label.toLowerCase().includes("in x") || p.label.toLowerCase().includes("gallon tank"))
          );
          if (!hasVariant) {
            standalone.push(product);
          }
        }
        // For all other products, check if they have variants
        else {
          const firstWord = product.label.split(' ')[0];
          const hasVariants = products.some(p => 
            p.id !== product.id && 
            p.label.toLowerCase().startsWith(firstWord.toLowerCase() + ' ')
          );
          
          if (!hasVariants) {
            standalone.push(product);
          }
        }
      }
    }
  });
  
  return { groups: Array.from(variantGroups.values()), standalone };
}

// Helper function to sort variants by tank size (20 → 40 → 120)
function sortVariantsByTankSize(variants) {
  const getTankSizeOrder = (tankSize) => {
    if (!tankSize) return 999; // No tank size = last
    const sizeStr = tankSize.toLowerCase();
    if (sizeStr.includes('x')) return 3; // 4x2x2 = 120 gallon
    if (sizeStr.includes('-')) {
      // Range like "10-20 gallon" - extract first number
      const match = sizeStr.match(/(\d+)-/);
      if (match) {
        const num = parseInt(match[1]);
        if (num <= 20) return 1; // 10-20 gallon = 20 gallon category
        if (num <= 40) return 2; // 30-40 gallon = 40 gallon category
      }
      return 3;
    }
    // Single number like "20 gallon"
    const match = sizeStr.match(/(\d+)/);
    if (match) {
      const num = parseInt(match[1]);
      if (num === 20) return 1;
      if (num === 40) return 2;
      if (num >= 120) return 3;
    }
    return 999;
  };
  
  return variants.sort((a, b) => {
    const orderA = getTankSizeOrder(a.tankSize);
    const orderB = getTankSizeOrder(b.tankSize);
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    // If same order, sort by variant name
    return a.variant.localeCompare(b.variant);
  });
}

export default function LeopardGeckoBuilder() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Track builder start
  useEffect(() => {
    analytics.trackBuilderStart("leopard-gecko");
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

  // Sort enclosures by size (10, 15, 20, 35, 40, 120)
  const sortedEnclosures = useMemo(() => {
    return [...ENCLOSURES].sort((a, b) => {
      const sizeA = a.size || 0;
      const sizeB = b.size || 0;
      return sizeA - sizeB;
    });
  }, []);

  // --- STATE ---
  const [experience, setExperience] = useState(null); 
  const [enclosureId, setEnclosureId] = useState(null);
  const [substrateIds, setSubstrateIds] = useState([]);
  const [substrateVariants, setSubstrateVariants] = useState({}); // { baseName: { variant, id } }

  const [heatingIds, setHeatingIds] = useState([]);
  const [heatingVariants, setHeatingVariants] = useState({}); // { baseName: { variant } }
  const [hideIds, setHideIds] = useState([]);
  const [hideVariants, setHideVariants] = useState({}); // { baseName: { variant } }
  const [supplementIds, setSupplementIds] = useState([]);

  // --- FILTERING LOGIC ---
  const filteredSubstrates = useMemo(() => {
    if (experience === "beginner") {
        return SUBSTRATES.filter(s => {
            if (s.type === "loose") return false;
            const name = s.label.toLowerCase();
            const isLooseName = name.includes("soil") || name.includes("sand") || name.includes("dirt") || name.includes("excavator") || name.includes("bioactive");
            return !isLooseName;
        });
    }
    return SUBSTRATES;
  }, [experience]);

  // --- SELECTION LOGIC ---
  const selectedEnclosure = ENCLOSURES.find((e) => e.id === enclosureId);
  
  const pickMany = (items, ids) => items.filter((i) => ids.includes(i.id));
  
  // Handle substrate selection (including variants)
  const selectedSubstrates = useMemo(() => {
    // Get variant product IDs to exclude from direct items
    const variantProductIds = new Set();
    Object.entries(substrateVariants).forEach(([baseName, selection]) => {
      const { groups } = groupVariants(SUBSTRATES);
      for (const group of groups) {
        if (group.baseName === baseName) {
          const variant = group.variants.find(v => v.variant === selection.variant);
          if (variant) {
            variantProductIds.add(variant.id);
          }
        }
      }
    });
    
    // Get direct items, excluding variant products (they'll be added from substrateVariants)
    const direct = pickMany(SUBSTRATES, substrateIds).filter(item => !variantProductIds.has(item.id));
    
    // Add variants from substrateVariants
    const variantItems = Object.entries(substrateVariants).map(([baseName, selection]) => {
      const { groups } = groupVariants(SUBSTRATES);
      for (const group of groups) {
        if (group.baseName === baseName) {
          const variant = group.variants.find(v => v.variant === selection.variant);
          if (variant) return variant;
        }
      }
      return null;
    }).filter(Boolean);
    return [...direct, ...variantItems];
  }, [substrateIds, substrateVariants]);
  
  // Handle heating with variants
  const selectedHeating = useMemo(() => {
    // Get variant product IDs to exclude from direct items
    const variantProductIds = new Set();
    Object.entries(heatingVariants).forEach(([baseName, selection]) => {
      const { groups } = groupVariants(HEATING);
      for (const group of groups) {
        if (group.baseName === baseName) {
          const variant = group.variants.find(v => v.variant === selection.variant);
          if (variant) {
            variantProductIds.add(variant.id);
          }
        }
      }
    });
    
    // Get direct items, excluding variant products (they'll be added from heatingVariants)
    const direct = pickMany(HEATING, heatingIds).filter(item => !variantProductIds.has(item.id));
    
    // Add variants from heatingVariants
    const variantItems = Object.entries(heatingVariants).map(([baseName, selection]) => {
      const { groups } = groupVariants(HEATING);
      for (const group of groups) {
        if (group.baseName === baseName) {
          const variant = group.variants.find(v => v.variant === selection.variant);
          if (variant) return variant;
        }
      }
      return null;
    }).filter(Boolean);
    return [...direct, ...variantItems];
  }, [heatingIds, heatingVariants]);
  
  // Handle hides with variants
  const selectedHides = useMemo(() => {
    // Get variant product IDs to exclude from direct items
    const variantProductIds = new Set();
    Object.entries(hideVariants).forEach(([baseName, selection]) => {
      const { groups } = groupVariants(HIDES);
      for (const group of groups) {
        if (group.baseName === baseName) {
          const variant = group.variants.find(v => v.variant === selection.variant);
          if (variant) {
            variantProductIds.add(variant.id);
          }
        }
      }
    });
    
    // Get direct items, excluding variant products (they'll be added from hideVariants)
    const direct = pickMany(HIDES, hideIds).filter(item => !variantProductIds.has(item.id));
    
    // Add variants from hideVariants
    const variantItems = Object.entries(hideVariants).map(([baseName, selection]) => {
      const { groups } = groupVariants(HIDES);
      for (const group of groups) {
        if (group.baseName === baseName) {
          const variant = group.variants.find(v => v.variant === selection.variant);
          if (variant) return variant;
        }
      }
      return null;
    }).filter(Boolean);
    return [...direct, ...variantItems];
  }, [hideIds, hideVariants]);
  
  const selectedSupplements = pickMany(SUPPLEMENTS, supplementIds);

  const allSelectedItems = useMemo(() => {
    return [
      selectedEnclosure,
      ...selectedSubstrates,
      ...selectedHeating,
      ...selectedHides,
      ...selectedSupplements,
    ].filter(Boolean);
  }, [selectedEnclosure, selectedSubstrates, selectedHeating, selectedHides, selectedSupplements]);

  // Total Price Calculation
  const totalPrice = allSelectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // --- PROGRESS CALCULATION ---
  const progress = useMemo(() => {
    let score = 0;
    const totalSteps = 6; // Experience + 5 sections
    
    if (experience) score++;
    if (enclosureId) score++;
    if (heatingIds.length > 0) score++;
    if (substrateIds.length > 0) score++;
    if (hideIds.length > 0) score++;
    if (supplementIds.length > 0) score++;

    return Math.round((score / totalSteps) * 100);
  }, [experience, enclosureId, heatingIds, substrateIds, hideIds, supplementIds]);

  // Section completion tracking
  const sectionCompletion = useMemo(() => ({
    experience: !!experience,
    enclosure: !!enclosureId,
    heating: heatingIds.length > 0,
    substrate: substrateIds.length > 0,
    hides: hideIds.length > 0,
    supplements: supplementIds.length > 0,
  }), [experience, enclosureId, heatingIds, substrateIds, hideIds, supplementIds]);

  // Section navigation data
  const sections = [
    { id: 'experience', title: 'Experience Level', icon: Target },
    { id: 'enclosure', title: 'Enclosure Size', icon: Box },
    { id: 'heating', title: 'Heating & Control', icon: Thermometer },
    { id: 'substrate', title: 'Floor & Substrate', icon: Layers },
    { id: 'hides', title: 'Hides & Enrichment', icon: HomeIcon },
    { id: 'supplements', title: 'Feeding', icon: Zap },
  ];

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

  // --- COMPATIBILITY CHECKS ---
  const checks = useMemo(() => {
    const messages = [];
    const criticalErrors = [];

    if (selectedEnclosure) {
      if (selectedEnclosure.id === "10g") {
        const errorMsg = "10-gallon is too small for an adult leopard gecko. Research shows inadequate space causes stress and health issues. Minimum 20 gallons required.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
      } else if (selectedEnclosure.id === "20g") {
        messages.push({ level: "ok", text: "20-gallon long meets minimum size requirements." });
      } else if (selectedEnclosure.id === "pvc4x2") {
        messages.push({ level: "ok", text: "4x2x2 provides excellent space for natural behaviors." });
      }
    } else {
        messages.push({ level: "warning", text: "Select an enclosure size." });
    }

    if (heatingIds.length === 0) {
       messages.push({ level: "warning", text: "Select a heating source." });
    } else {
       // Check for primary heat source (halogen or dhp variants, NOT under tank heater)
       const hasPrimaryHeat = heatingIds.some(id => 
         id.startsWith("halogen_") || 
         id.startsWith("dhp_")
       ) || Object.keys(heatingVariants).some(baseName => 
         (baseName.includes("Halogen") || baseName.includes("Flood Lamp") || 
          baseName.includes("Deep Heat") || baseName.includes("DHP")) &&
         !baseName.includes("Under Tank Heater")
       );
       if (!hasPrimaryHeat) {
        const errorMsg = "Primary heat source REQUIRED. You must select either a Halogen Flood Lamp OR a Deep Heat Projector (DHP). Leopard geckos need a basking area of 88-92°F for proper digestion and thermoregulation.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
       }
       // Check for thermostat
       if (!heatingIds.includes("thermostat")) {
        const errorMsg = "Digital Thermostat REQUIRED. Unregulated heat sources can cause severe burns and death. Never use heat without a thermostat.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
       }
    }
    
    // Check for required hides
    if (hideIds.length === 0) {
      messages.push({ level: "warning", text: "Select at least one hide." });
    } else {
      const hasWarmHide = hideIds.includes("warmhide");
      const hasCoolHide = hideIds.includes("coolhide");
      const hasHumidHide = hideIds.includes("humidhide");
      
      if (!hasWarmHide) {
        const errorMsg = "Warm Hide REQUIRED. Geckos need a warm hide on the hot side for thermoregulation and digestion.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
      }
      if (!hasCoolHide) {
        const errorMsg = "Cool Hide REQUIRED. Geckos need a cool hide on the cool side to escape heat and regulate body temperature.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
      }
      if (!hasHumidHide) {
        const errorMsg = "Humid Hide REQUIRED. Geckos need a humid hide for proper shedding. Without it, they can develop stuck shed which can lead to infection and loss of digits.";
        messages.push({ level: "error", text: errorMsg });
        criticalErrors.push(errorMsg);
      }
    }
    
    // Check for at least one substrate
    if (substrateIds.length === 0 && Object.keys(substrateVariants).length === 0) {
      const errorMsg = "At least one substrate REQUIRED. Choose a safe substrate for your gecko's enclosure floor.";
      messages.push({ level: "error", text: errorMsg });
      criticalErrors.push(errorMsg);
    }

    return { messages, criticalErrors };
  }, [selectedEnclosure, heatingIds, heatingVariants, hideIds, substrateIds, substrateVariants]);

  function goToSummary() {
    if (allSelectedItems.length === 0) return;
    
    // Block if there are critical errors
    if (checks.criticalErrors.length > 0) {
      // Track validation errors
      checks.criticalErrors.forEach(error => {
        analytics.trackValidationError("leopard-gecko", "critical", error);
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
    analytics.trackBuilderComplete("leopard-gecko", totalPrice, allSelectedItems.length);
    
    const params = new URLSearchParams({
      exp: experience || "beginner",
      enclosure: enclosureId || "",
      substrate: substrateIds.join(","),
      heating: heatingIds.join(","),
      hides: hideIds.join(","),
      supplements: supplementIds.join(","),
    });
    router.push(`/summary/leopard-gecko?${params.toString()}`);
  }

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6">
      
      {/* Horizontal Progress Bar */}
      <div className="sticky top-[112px] z-40 mb-8 mt-8 bg-slate-900/90 backdrop-blur-md border-b border-white/10 rounded-b-2xl overflow-hidden">
        <div className="h-1 bg-slate-800/50 relative">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 transition-all duration-700 ease-out shadow-lg shadow-emerald-500/30"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="px-6 py-3 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Build Progress</span>
          <span className="text-sm font-black text-emerald-400">{progress}%</span>
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
                      ? "bg-emerald-500/20 border border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                  title={section.title}
                >
                  <Icon size={16} className={isActive ? "text-emerald-400" : isCompleted ? "text-emerald-400" : "text-slate-500"} />
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
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-2xl shadow-emerald-500/50 flex items-center justify-center border-2 border-emerald-400/30 hover:scale-110 transition-transform"
      >
        {isMobileSidebarOpen ? <X size={24} /> : <ShoppingCart size={24} />}
      </button>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-4 text-sm font-bold uppercase tracking-wider"
                >
                    <ChevronLeft size={16} /> Back to Hub
                </button>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg">
                    Leopard Gecko <span className="text-emerald-500">Configurator</span>
                </h1>
                <p className="text-slate-300 mt-2 max-w-2xl text-lg font-medium">
                    Design a precision habitat. We'll track compatibility as you build.
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
                        className="absolute inset-0 rounded-full border-4 border-emerald-500 transition-all duration-700 ease-out"
                        style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                    />
                    <Target size={20} className={`transition-colors duration-500 ${progress === 100 ? "text-emerald-400" : "text-slate-500"}`} />
                </div>
            </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,360px] xl:grid-cols-[1fr,400px]">
          <div className="space-y-10">
            <Section 
              title="1. Keeper Level" 
              icon={<Target />}
              sectionId="experience"
              isCompleted={sectionCompletion.experience}
              sectionRef={(el) => { if (el) sectionRefs.current.experience = el; }}
            >
              <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setExperience("beginner")}
                    className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 group text-left ${
                      experience === "beginner"
                        ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                        : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-800/60"
                    }`}
                  >
                    <p className="font-bold text-lg text-white capitalize flex justify-between items-center gap-2">
                        Beginner
                        {experience === "beginner" ? <CheckCircle2 size={20} className="text-emerald-400" /> : <ShieldCheck size={20} className="text-slate-500"/>}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider leading-relaxed">
                      Restricts unsafe items. Hides loose substrate to prevent impaction risk.
                    </p>
                </button>
                <button
                    onClick={() => setExperience("experienced")}
                    className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 group text-left ${
                      experience === "experienced"
                        ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                        : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-800/60"
                    }`}
                  >
                    <p className="font-bold text-lg text-white capitalize flex justify-between items-center gap-2">
                        Experienced
                        {experience === "experienced" ? <CheckCircle2 size={20} className="text-emerald-400" /> : <Unlock size={20} className="text-slate-500"/>}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-2 uppercase tracking-wider leading-relaxed">
                      Unlocks full database. Includes advanced loose substrates.
                    </p>
                </button>
              </div>
            </Section>

            <Section 
              title="2. Enclosure Size" 
              icon={<Box />}
              description="Choose the right size tank. Minimum 20 gallons required for adult geckos. Larger enclosures allow for better enrichment and natural behaviors."
              sectionId="enclosure"
              isCompleted={sectionCompletion.enclosure}
              sectionRef={(el) => { if (el) sectionRefs.current.enclosure = el; }}
            >
              <div 
                className={`mb-4 overflow-hidden transition-all duration-500 ease-in-out ${
                  !enclosureId 
                    ? 'max-h-20 opacity-100' 
                    : 'max-h-0 opacity-0 mb-0'
                }`}
                role={!enclosureId ? "alert" : undefined}
              >
                <div className="p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-center gap-3">
                  <AlertCircle size={20} className="text-amber-400 shrink-0" />
                  <p className="text-amber-100 font-medium">One enclosure selection is required.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedEnclosures.map((e) => (
                  <SelectionCard
                    key={e.id}
                    active={enclosureId === e.id}
                    label={e.label}
                    price={e.price}
                    onClick={() => setEnclosureId(enclosureId === e.id ? null : e.id)}
                    type="checkbox"
                    productId={e.id}
                    isRequired={false}
                  />
                ))}
              </div>
            </Section>

            <Section 
              title="3. Heating & Control" 
              icon={<Thermometer />}
              description="Geckos need a basking area of 88-92°F. You must select a primary heat source (halogen or DHP) and a thermostat to prevent burns."
              sectionId="heating"
              isCompleted={sectionCompletion.heating}
              sectionRef={(el) => { if (el) sectionRefs.current.heating = el; }}
            >
              <HeatingSection 
                heating={HEATING}
                selectedIds={heatingIds}
                selectedVariants={heatingVariants}
                selectedEnclosureSize={selectedEnclosure?.size}
                onToggle={(id) => setHeatingIds((ids) => toggle(ids, id))}
                onVariantToggle={(baseName, variant, variantId) => {
                  setHeatingVariants(prev => {
                    const current = prev[baseName];
                    // Toggle: if same variant is selected, deselect it
                    if (current && current.variant === variant) {
                      const newVariants = { ...prev };
                      delete newVariants[baseName];
                      // Also remove the variant ID from heatingIds
                      setHeatingIds(ids => ids.filter(id => id !== variantId));
                      return newVariants;
                    }
                    // Otherwise, select the new variant
                    // Remove old variant IDs from this group
                    const { groups } = groupVariants(HEATING);
                    const group = groups.find(g => g.baseName === baseName);
                    if (group) {
                      const oldIds = group.variants.map(v => v.id);
                      setHeatingIds(ids => {
                        const filtered = ids.filter(id => !oldIds.includes(id));
                        return [...filtered, variantId];
                      });
                    } else {
                      setHeatingIds(ids => [...ids, variantId]);
                    }
                    return {
                      ...prev,
                      [baseName]: { variant, id: variantId }
                    };
                  });
                }}
              />
            </Section>

            <Section 
              title="4. Floor & Substrate" 
              icon={<Layers />}
              description="Choose a safe substrate for your gecko. Beginners should use solid substrates (paper towels, slate, carpet). Loose substrates require experience."
              sectionId="substrate"
              isCompleted={sectionCompletion.substrate}
              sectionRef={(el) => { if (el) sectionRefs.current.substrate = el; }}
            >
              {!experience && (
                  <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs rounded-xl flex items-center gap-2">
                      <AlertTriangle size={16} /> Please select an Experience Level above to see safe recommendations.
                  </div>
              )}
              <div 
                className={`mb-4 overflow-hidden transition-all duration-500 ease-in-out ${
                  substrateIds.length === 0 && Object.keys(substrateVariants).length === 0
                    ? 'max-h-20 opacity-100' 
                    : 'max-h-0 opacity-0 mb-0'
                }`}
                role={substrateIds.length === 0 && Object.keys(substrateVariants).length === 0 ? "alert" : undefined}
              >
                <div className="p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-center gap-3">
                  <AlertCircle size={20} className="text-amber-400 shrink-0" />
                  <p className="text-amber-100 font-medium">At least one substrate selection is required.</p>
                </div>
              </div>
              <SubstrateSection
                substrates={filteredSubstrates}
                selectedIds={substrateIds}
                selectedVariants={substrateVariants}
                selectedEnclosureSize={selectedEnclosure?.size}
                onToggle={(id) => setSubstrateIds((ids) => toggle(ids, id))}
                onVariantToggle={(baseName, variant, variantId) => {
                  setSubstrateVariants(prev => {
                    const current = prev[baseName];
                    // Toggle: if same variant is selected, deselect it
                    if (current && current.variant === variant) {
                      const newVariants = { ...prev };
                      delete newVariants[baseName];
                      // Also remove the variant ID from substrateIds
                      setSubstrateIds(ids => ids.filter(id => id !== variantId));
                      return newVariants;
                    }
                    // Otherwise, select the new variant
                    // Remove old variant IDs from this group
                    const { groups } = groupVariants(SUBSTRATES);
                    const group = groups.find(g => g.baseName === baseName);
                    if (group) {
                      const oldIds = group.variants.map(v => v.id);
                      setSubstrateIds(ids => {
                        const filtered = ids.filter(id => !oldIds.includes(id));
                        return [...filtered, variantId];
                      });
                    } else {
                      setSubstrateIds(ids => [...ids, variantId]);
                    }
                    return {
                      ...prev,
                      [baseName]: { variant, id: variantId }
                    };
                  });
                }}
              />
            </Section>

            <Section 
              title="5. Hides & Decor" 
              icon={<HomeIcon />}
              description="Geckos need at least 3 hides: warm hide (hot side), cool hide (cool side), and humid hide (for shedding). Additional decor provides enrichment."
              sectionId="hides"
              isCompleted={sectionCompletion.hides}
              sectionRef={(el) => { if (el) sectionRefs.current.hides = el; }}
            >
              <HidesSection
                hides={HIDES}
                selectedIds={hideIds}
                selectedVariants={hideVariants}
                onToggle={(id) => setHideIds((ids) => toggle(ids, id))}
                onVariantToggle={(baseName, variant, variantId) => {
                  setHideVariants(prev => {
                    const current = prev[baseName];
                    // Toggle: if same variant is selected, deselect it
                    if (current && current.variant === variant) {
                      const newVariants = { ...prev };
                      delete newVariants[baseName];
                      // Also remove the variant ID from hideIds
                      setHideIds(ids => ids.filter(id => id !== variantId));
                      return newVariants;
                    }
                    // Otherwise, select the new variant
                    // Remove old variant IDs from this group
                    const { groups } = groupVariants(HIDES);
                    const group = groups.find(g => g.baseName === baseName);
                    if (group) {
                      const oldIds = group.variants.map(v => v.id);
                      setHideIds(ids => {
                        const filtered = ids.filter(id => !oldIds.includes(id));
                        return [...filtered, variantId];
                      });
                    } else {
                      setHideIds(ids => [...ids, variantId]);
                    }
                    return {
                      ...prev,
                      [baseName]: { variant, id: variantId }
                    };
                  });
                }}
              />
            </Section>

            <Section 
              title="6. Vitamin Support" 
              icon={<Zap />}
              description="Essential for bone health. Use calcium with D3 if no UVB, or pure calcium if using UVB. Multivitamin prevents nutritional deficiencies."
              sectionId="supplements"
              isCompleted={sectionCompletion.supplements}
              sectionRef={(el) => { if (el) sectionRefs.current.supplements = el; }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUPPLEMENTS.map((s) => (
                  <SelectionCard
                    key={s.id}
                    active={supplementIds.includes(s.id)}
                    label={s.label}
                    price={s.price}
                    onClick={() => setSupplementIds((ids) => toggle(ids, s.id))}
                    type="checkbox"
                    productId={s.id}
                  />
                ))}
              </div>
            </Section>
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-40 h-fit space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 text-white">
                  <ShoppingCart size={18} className="text-emerald-400" /> Inventory
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
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
                          className="group relative p-3 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                          style={{ animation: `fadeInSlide 0.3s ease-out ${index * 50}ms forwards` }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors line-clamp-2">
                                {item.label}
                              </p>
                            </div>
                            <span className="font-mono text-sm font-bold text-emerald-400 shrink-0">
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
                    {/* 👇 FIXED: Total Price Calculation */}
                    <span className="text-3xl font-black text-white tracking-tight">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={goToSummary}
                  disabled={allSelectedItems.length === 0}
                  className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                    allSelectedItems.length === 0 
                        ? "bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50" 
                        : "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-2 border-emerald-400/30 hover:border-emerald-300/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40 active:scale-[0.98] shadow-lg shadow-emerald-900/30"
                  }`}
                >
                  Generate List <ArrowRight size={20} className="drop-shadow-sm" />
                </button>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                 <AlertTriangle size={14} /> System Checks
              </h3>

              <div className="space-y-3">
                {allSelectedItems.length === 0 ? (
                      <p className="text-slate-500 text-xs italic">Waiting for input...</p>
                ) : checks.messages.length === 0 ? (
                    <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 text-xs flex gap-2">
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
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
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
              <ShoppingCart size={18} className="text-emerald-400" /> Inventory
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
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
                    className="group p-3 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                          {item.label}
                        </p>
                      </div>
                      <span className="font-mono text-sm font-bold text-emerald-400 shrink-0">
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
                      : "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-2 border-emerald-400/30 hover:border-emerald-300/50 shadow-lg shadow-emerald-900/30"
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

/* ---------- UI COMPONENTS ---------- */

function Section({ title, icon, description, children, sectionId, isCompleted, sectionRef }) {
    return (
        <section 
          id={sectionId}
          ref={sectionRef}
          className={`relative bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-md p-8 rounded-3xl border-2 shadow-xl overflow-hidden transition-all duration-500 ${
            isCompleted ? 'border-emerald-500/50' : 'border-white/10'
          }`}
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
            
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
                        : 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 shadow-emerald-500/10'
                    }`}>
                        <div className="text-emerald-400">
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

// Product explanations mapping for leopard gecko
const productExplanations = {
  // Enclosures
  "10g": "⚠️ TOO SMALL: 10-gallon tanks are inadequate for adult leopard geckos. They cause chronic stress and prevent proper thermoregulation. Minimum 20 gallons required.",
  "20g": "20 gallons (30\" x 12\" x 12\") is the absolute minimum for adult leopard geckos. Allows space for 3 hides and proper temperature gradient.",
  "40g": "40-gallon breeder (36\" x 18\" x 18\") is recommended for optimal welfare. Provides excellent space for enrichment and natural behaviors.",
  "pvc4x2": "4x2x2 PVC enclosure (120 gallons equivalent) is ideal for adult geckos. Excellent for bioactive setups and provides maximum space for enrichment.",
  "15g": "15 gallons is still too small for an adult leopard gecko. Minimum 20 gallons required for proper thermoregulation and enrichment.",
  "35g": "35 gallons is better than 20 but 40-gallon breeder is recommended for optimal welfare. Still provides adequate space for enrichment.",
  
  // Heating
  "heatmat_10_20": "Under tank heaters (10-20 gallon) provide belly heat but don't create a proper basking spot. Must be used with a thermostat to prevent burns. Not recommended as primary heat source.",
  "heatmat_30_40": "Under tank heaters (30-40 gallon) provide belly heat but don't create a proper basking spot. Must be used with a thermostat to prevent burns. Not recommended as primary heat source.",
  "halogen_50w": "Halogen flood lamp (50W) provides excellent basking heat and visible light for 20-gallon tanks. Mimics natural sunlight. Must be used with a thermostat. Best primary heat source option.",
  "halogen_75w": "Halogen flood lamp (75W) provides excellent basking heat and visible light for 40-gallon tanks. Mimics natural sunlight. Must be used with a thermostat. Best primary heat source option.",
  "halogen_100w": "Halogen flood lamp (100W) provides excellent basking heat and visible light for large enclosures (4x2x2). Mimics natural sunlight. Must be used with a thermostat. Best primary heat source option.",
  "dhp_50w": "Deep Heat Projector (50W) emits infrared A & B wavelengths for 20-gallon tanks, penetrating deeper into tissue. No visible light. Excellent for 24/7 heating. Must be used with a thermostat.",
  "dhp_75w": "Deep Heat Projector (75W) emits infrared A & B wavelengths for 40-gallon tanks, penetrating deeper into tissue. No visible light. Excellent for 24/7 heating. Must be used with a thermostat.",
  "dhp_100w": "Deep Heat Projector (100W) emits infrared A & B wavelengths for large enclosures (4x2x2), penetrating deeper into tissue. No visible light. Excellent for 24/7 heating. Must be used with a thermostat.",
  "thermostat": "⚠️ REQUIRED: Every heat source MUST be connected to a thermostat. Unregulated heating causes severe burns and can kill your gecko. This is non-negotiable.",
  "uvb_12": "UVB lighting (12 inch) helps geckos synthesize vitamin D3 naturally. Perfect for 20-gallon tanks. Optional but beneficial, especially if not using calcium with D3.",
  "uvb_24": "UVB lighting (24 inch) helps geckos synthesize vitamin D3 naturally. Perfect for 40-gallon tanks. Optional but beneficial, especially if not using calcium with D3.",
  "uvb_34": "UVB lighting (34 inch) helps geckos synthesize vitamin D3 naturally. Perfect for large enclosures (4x2x2). Optional but beneficial, especially if not using calcium with D3.",
  
  // Substrates
  "papertowel": "Paper towels are the safest, easiest substrate for beginners. Easy to clean, prevents impaction risk, and allows you to monitor health easily.",
  "slate": "Slate tile provides a natural look while being easy to clean. Retains heat well and provides a solid surface. Safe and beginner-friendly.",
  "slate_slate_tile_stone_6_in_x_6_in_s": "Slate tile (6\" x 6\") provides a natural look while being easy to clean. Perfect size for 20-gallon tanks. Retains heat well and provides a solid surface. Safe and beginner-friendly.",
  "slate_slate_tile_stone_11_8_in_x_5_9": "Slate tile (11.8\" x 5.9\") provides a natural look while being easy to clean. Perfect size for 40-gallon tanks. Retains heat well and provides a solid surface. Safe and beginner-friendly.",
  "slate_slate_tile_stone_15_7_in_x_9_8": "Slate tile (15.7\" x 9.8\") provides a natural look while being easy to clean. Perfect size for large enclosures (4x2x2). Retains heat well and provides a solid surface. Safe and beginner-friendly.",
  "liner_reptile_carpet_20_gallon_tank": "Reptile carpet (20 gallon) is easy to clean and safe. Provides a solid surface that prevents impaction. Good beginner option for 20-gallon tanks.",
  "liner_reptile_carpet_40_gallon_tank": "Reptile carpet (40 gallon) is easy to clean and safe. Provides a solid surface that prevents impaction. Good beginner option for 40-gallon tanks.",
  "topsoil": "Organic topsoil mix creates a naturalistic environment. Requires proper preparation and monitoring. Only for experienced keepers who understand impaction risks.",
  "topsoil_organic_topsoil_mix_cocunut_ch": "Organic topsoil mix with coconut chips creates a naturalistic environment. Provides texture and enrichment. Requires proper preparation and monitoring. Only for experienced keepers who understand impaction risks.",
  "excavator": "Excavator clay allows geckos to dig and create burrows. Naturalistic but requires proper setup. Only for experienced keepers.",
  "bioactive": "BioActive Terra Sahara creates a self-cleaning ecosystem with beneficial microorganisms. Advanced setup requiring proper preparation. Only for experienced keepers.",
  "bioactive_bioactive_terra_sahara_18_qts_": "BioActive Terra Sahara (18 qts) creates a self-cleaning ecosystem for 20-40 gallon tanks. Contains beneficial microorganisms. Advanced setup requiring proper preparation. Only for experienced keepers.",
  "bioactive_bioactive_terra_sahara_36_qts_": "BioActive Terra Sahara (36 qts) creates a self-cleaning ecosystem for large enclosures (4x2x2). Contains beneficial microorganisms. Advanced setup requiring proper preparation. Only for experienced keepers.",
  "sand": "⚠️ DANGEROUS: Calcium sand causes impaction when ingested. It clumps when wet and cannot pass through the digestive system. Use safe substrates instead.",
  "sand_reptile_sand_calcium_white": "⚠️ DANGEROUS: White calcium sand causes impaction when ingested. It clumps when wet and cannot pass through the digestive system. Use safe substrates instead.",
  "sand_reptile_sand_calcium_black": "⚠️ DANGEROUS: Black calcium sand causes impaction when ingested. It clumps when wet and cannot pass through the digestive system. Use safe substrates instead.",
  "sand_reptile_sand_calcium_tan": "⚠️ DANGEROUS: Tan calcium sand causes impaction when ingested. It clumps when wet and cannot pass through the digestive system. Use safe substrates instead.",
  "sand_reptile_sand_calcium_blue": "⚠️ DANGEROUS: Blue calcium sand causes impaction when ingested. It clumps when wet and cannot pass through the digestive system. Use safe substrates instead.",
  
  // Hides
  "warmhide": "Warm hide should be placed on the hot side of the tank. Geckos need a hide in the basking area to feel secure while thermoregulating.",
  "coolhide": "Cool hide should be placed on the cool side. Essential for geckos to escape heat and regulate body temperature. Every gecko needs at least one cool hide.",
  "humidhide": "Humid hide (moist hide) is essential for shedding. Fill with damp substrate (paper towels or sphagnum moss). Geckos need this to shed properly.",
  "corkbark": "Cork bark provides natural hiding spots and climbing opportunities. Can be used as additional cover or as a hide. Safe and natural-looking.",
  "corkbark_cork_bark_flat_4_pcs": "Cork bark flat (4 pieces) provides natural hiding spots and climbing opportunities. Can be arranged to create multiple hiding areas. Safe and natural-looking.",
  "branches": "Climbing branches provide enrichment and exercise. Leopard geckos are not fully arboreal but enjoy climbing opportunities. Adds vertical space usage.",
  "branches_climbing_branches_4_pcs_14_16_": "Climbing branches (4 pieces, 14-16 inches) provide enrichment and exercise. Leopard geckos are not fully arboreal but enjoy climbing opportunities. Adds vertical space usage and multiple perching spots.",
  
  // Supplements
  "calcium_no_d3": "Pure calcium (no D3) is used when you have UVB lighting. Geckos can synthesize D3 from UVB, so pure calcium is sufficient. Dust insects daily.",
  "calcium_d3": "Calcium with D3 is essential if you don't have UVB lighting. D3 helps geckos absorb calcium. Dust insects 3-4 times per week. Critical for bone health.",
  "multivitamin": "Multivitamin provides essential vitamins and minerals. Use 1-2 times per week in addition to calcium. Prevents nutritional deficiencies.",
  
  // Feeding
  "bowls_black_rock": "Food and water dish set (black rock design) provides separate containers for food and water. Easy to clean and maintain. Natural-looking design.",
  "bowls_tree_trunk": "Food and water dish set (tree trunk design) provides separate containers for food and water. Easy to clean and maintain. Natural-looking design.",
  "bowls_sahara_rock": "Food and water dish set (Sahara rock design) includes one corner dish and one round dish. Easy to clean and maintain. Natural-looking design.",
};

function HeatingSection({ heating, selectedIds, selectedVariants, onToggle, onVariantToggle, selectedEnclosureSize }) {
  const { groups, standalone } = groupVariants(heating);
  
  // Check if halogen or DHP is selected
  const hasHalogen = Object.keys(selectedVariants).some(baseName => 
    baseName.includes("Halogen") || baseName.includes("Flood Lamp")
  );
  const hasDHP = Object.keys(selectedVariants).some(baseName => 
    baseName.includes("Deep Heat") || baseName.includes("DHP")
  );
  
  // Filter variants based on selected enclosure size
  let filteredGroups = groups.map(group => ({
    ...group,
    variants: group.variants.filter(v => {
      if (!selectedEnclosureSize || !v.tankSize) return true; // Show all if no enclosure selected
      
      // Match tank size to enclosure
      const enclosureSize = selectedEnclosureSize;
      const variantTankSize = v.tankSize.toLowerCase();
      
      // Handle different size formats
      if (variantTankSize.includes('x')) {
        // 4x2x2 format
        return variantTankSize === '4x2x2' && enclosureSize >= 120;
      } else if (variantTankSize.includes('-')) {
        // Range format like "10-20 gallon"
        const match = variantTankSize.match(/(\d+)-(\d+)/);
        if (match) {
          const [min, max] = match.slice(1).map(Number);
          return enclosureSize >= min && enclosureSize <= max;
        }
        return false;
      } else {
        // Single size like "20 gallon"
        const match = variantTankSize.match(/(\d+)/);
        if (match) {
          const size = parseInt(match[1]);
          if (size === 20) return enclosureSize >= 15 && enclosureSize < 40;
          if (size === 40) return enclosureSize >= 35 && enclosureSize < 120;
          if (size === 120 || size >= 120) return enclosureSize >= 120;
        }
        return false;
      }
    })
  })).filter(group => group.variants.length > 0); // Only show groups with matching variants
  
  // Make halogen and DHP mutually exclusive - hide the other if one is selected
  if (hasHalogen) {
    filteredGroups = filteredGroups.filter(group => 
      !group.baseName.includes("Deep Heat") && !group.baseName.includes("DHP")
    );
  } else if (hasDHP) {
    filteredGroups = filteredGroups.filter(group => 
      !group.baseName.includes("Halogen") && !group.baseName.includes("Flood Lamp")
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Standalone products (no variants) */}
      {standalone.map((h) => {
        // Thermostat is always required
        const isRequired = h.id === "thermostat";
        return (
          <SelectionCard
            key={h.id}
            active={selectedIds.includes(h.id)}
            label={h.label}
            price={h.price}
            onClick={() => onToggle(h.id)}
            type="checkbox"
            productId={h.id}
            isRequired={isRequired}
          />
        );
      })}
      
      {/* Variant groups */}
      {filteredGroups.map((group) => {
        const variantSelection = selectedVariants[group.baseName];
        const selectedVariant = variantSelection 
          ? group.variants.find(v => v.variant === variantSelection.variant)
          : null;
        const isActive = selectedVariant && selectedIds.includes(selectedVariant.id);
        
        // Get unique variants sorted by tank size (20 → 40 → 120)
        const variantMap = new Map();
        group.variants.forEach(v => {
          if (!variantMap.has(v.variant)) {
            variantMap.set(v.variant, v);
          }
        });
        const sortedVariantObjects = sortVariantsByTankSize(Array.from(variantMap.values()));
        const variants = sortedVariantObjects.map(v => v.variant);
        
        // Get price range
        const prices = group.variants.map(v => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
        
        // Check if this variant group is required (only Halogen or DHP, NOT under tank heater)
        const isRequired = (group.baseName.includes("Halogen") || group.baseName.includes("Flood Lamp") || 
                           group.baseName.includes("Deep Heat") || group.baseName.includes("DHP")) &&
                           !group.baseName.includes("Under Tank Heater");
        
        return (
          <VariantCard
            key={group.baseName}
            baseLabel={group.baseLabel}
            priceRange={priceRange}
            variants={group.variants}
            isActive={isActive}
            selectedVariant={variantSelection?.variant}
            isCheckbox={true}
            isSizeOnly={true}
            isRequired={isRequired}
            onVariantChange={(variant) => {
              const variantItem = group.variants.find(v => v.variant === variant);
              if (variantItem) {
                onVariantToggle(group.baseName, variant, variantItem.id);
              }
            }}
            onSelect={() => {
              if (!variantSelection && group.variants.length > 0) {
                const first = group.variants[0];
                onVariantToggle(group.baseName, first.variant, first.id);
              } else if (variantSelection) {
                // Toggle off if already selected
                onVariantToggle(group.baseName, variantSelection.variant, selectedVariant?.id);
              }
            }}
            productId={selectedVariant?.id}
          />
        );
      })}
    </div>
  );
}

function SubstrateSection({ substrates, selectedIds, selectedVariants, onToggle, onVariantToggle, selectedEnclosureSize }) {
  const { groups, standalone } = groupVariants(substrates);
  
  // Filter variants based on selected enclosure size
  const filteredGroups = groups.map(group => ({
    ...group,
    variants: group.variants.filter(v => {
      if (!selectedEnclosureSize || !v.tankSize) return true; // Show all if no enclosure selected
      
      // Match tank size to enclosure
      const enclosureSize = selectedEnclosureSize;
      const variantTankSize = v.tankSize.toLowerCase();
      
      // Handle different size formats
      if (variantTankSize.includes('x')) {
        // 4x2x2 format
        return variantTankSize === '4x2x2' && enclosureSize >= 120;
      } else if (variantTankSize.includes('-')) {
        // Range format like "10-20 gallon"
        const match = variantTankSize.match(/(\d+)-(\d+)/);
        if (match) {
          const [min, max] = match.slice(1).map(Number);
          return enclosureSize >= min && enclosureSize <= max;
        }
        return false;
      } else {
        // Single size like "20 gallon"
        const match = variantTankSize.match(/(\d+)/);
        if (match) {
          const size = parseInt(match[1]);
          if (size === 20) return enclosureSize >= 15 && enclosureSize < 40;
          if (size === 40) return enclosureSize >= 35 && enclosureSize < 120;
          if (size === 120 || size >= 120) return enclosureSize >= 120;
        }
        return false;
      }
    })
  })).filter(group => group.variants.length > 0); // Only show groups with matching variants
  
  // Get all variant product IDs from ALL groups (not just filtered) to exclude from standalone
  // This ensures variant products never appear in standalone, even if filtered out
  const variantProductIds = new Set();
  groups.forEach(group => {
    group.variants.forEach(v => {
      variantProductIds.add(v.id);
    });
  });
  
  // Filter out any standalone products that are actually variants
  const filteredStandalone = standalone.filter(s => !variantProductIds.has(s.id));
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Standalone products (no variants) */}
      {filteredStandalone.map((s) => (
        <SelectionCard
          key={s.id}
          active={selectedIds.includes(s.id)}
          label={s.label}
          price={s.price}
          sublabel={s.type === "solid" ? "Easy to Clean" : "Naturalistic Look"}
          onClick={() => onToggle(s.id)}
          type="checkbox"
          productId={s.id}
        />
      ))}
      
      {/* Variant groups */}
      {filteredGroups.map((group) => {
        const variantSelection = selectedVariants[group.baseName];
        const selectedVariant = variantSelection 
          ? group.variants.find(v => v.variant === variantSelection.variant)
          : null;
        const isActive = selectedVariant && selectedIds.includes(selectedVariant.id);
        
        // Get unique variants sorted by tank size (20 → 40 → 120)
        const variantMap = new Map();
        group.variants.forEach(v => {
          if (!variantMap.has(v.variant)) {
            variantMap.set(v.variant, v);
          }
        });
        const sortedVariantObjects = sortVariantsByTankSize(Array.from(variantMap.values()));
        const variants = sortedVariantObjects.map(v => v.variant);
        
        // Get price range
        const prices = group.variants.map(v => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
        
        // Check if this variant group is required (only Halogen or DHP, NOT under tank heater)
        const isRequired = (group.baseName.includes("Halogen") || group.baseName.includes("Flood Lamp") || 
                           group.baseName.includes("Deep Heat") || group.baseName.includes("DHP")) &&
                           !group.baseName.includes("Under Tank Heater");
        
        return (
          <VariantCard
            key={group.baseName}
            baseLabel={group.baseLabel}
            priceRange={priceRange}
            variants={group.variants}
            isActive={isActive}
            selectedVariant={variantSelection?.variant}
            isCheckbox={true}
            isSizeOnly={true}
            isRequired={isRequired}
            onVariantChange={(variant) => {
              const variantItem = group.variants.find(v => v.variant === variant);
              if (variantItem) {
                onVariantToggle(group.baseName, variant, variantItem.id);
              }
            }}
            onSelect={() => {
              if (!variantSelection && group.variants.length > 0) {
                const first = group.variants[0];
                onVariantToggle(group.baseName, first.variant, first.id);
              } else if (variantSelection) {
                // Toggle off if already selected
                onVariantToggle(group.baseName, variantSelection.variant, selectedVariant?.id);
              }
            }}
            productId={selectedVariant?.id}
          />
        );
      })}
    </div>
  );
}

function HidesSection({ hides, selectedIds, selectedVariants, onToggle, onVariantToggle }) {
  const { groups, standalone } = groupVariants(hides);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Standalone products (no variants) - excludes standalone Cork Bark and Climbing Branches */}
      {standalone.map((h) => {
        // Warm hide, cool hide, and humid hide are all required
        const isRequired = h.id === "warmhide" || h.id === "coolhide" || h.id === "humidhide";
        return (
          <SelectionCard
            key={h.id}
            active={selectedIds.includes(h.id)}
            label={h.label}
            price={h.price}
            onClick={() => onToggle(h.id)}
            type="checkbox"
            productId={h.id}
            isRequired={isRequired}
          />
        );
      })}
      
      {/* Variant groups */}
      {groups.map((group) => {
        const variantSelection = selectedVariants[group.baseName];
        const selectedVariant = variantSelection 
          ? group.variants.find(v => v.variant === variantSelection.variant)
          : null;
        const isActive = selectedVariant && selectedIds.includes(selectedVariant.id);
        
        // Get unique variants sorted by tank size (20 → 40 → 120)
        const variantMap = new Map();
        group.variants.forEach(v => {
          if (!variantMap.has(v.variant)) {
            variantMap.set(v.variant, v);
          }
        });
        const sortedVariantObjects = sortVariantsByTankSize(Array.from(variantMap.values()));
        const variants = sortedVariantObjects.map(v => v.variant);
        
        // Get price range
        const prices = group.variants.map(v => v.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
        
        // Check if this variant group is required (only Halogen or DHP, NOT under tank heater)
        const isRequired = (group.baseName.includes("Halogen") || group.baseName.includes("Flood Lamp") || 
                           group.baseName.includes("Deep Heat") || group.baseName.includes("DHP")) &&
                           !group.baseName.includes("Under Tank Heater");
        
        return (
          <VariantCard
            key={group.baseName}
            baseLabel={group.baseLabel}
            priceRange={priceRange}
            variants={group.variants}
            isActive={isActive}
            selectedVariant={variantSelection?.variant}
            isCheckbox={true}
            isSizeOnly={true}
            isRequired={isRequired}
            onVariantChange={(variant) => {
              const variantItem = group.variants.find(v => v.variant === variant);
              if (variantItem) {
                onVariantToggle(group.baseName, variant, variantItem.id);
              }
            }}
            onSelect={() => {
              if (!variantSelection && group.variants.length > 0) {
                const first = group.variants[0];
                onVariantToggle(group.baseName, first.variant, first.id);
              } else if (variantSelection) {
                // Toggle off if already selected
                onVariantToggle(group.baseName, variantSelection.variant, selectedVariant?.id);
              }
            }}
            productId={selectedVariant?.id}
          />
        );
      })}
    </div>
  );
}

function VariantCard({ baseLabel, priceRange, variants, isActive, selectedVariant, onVariantChange, onSelect, isCheckbox = false, isSizeOnly = false, productId, isRequired = false }) {
  const selectedVariantItem = selectedVariant 
    ? variants.find(v => v.variant === selectedVariant)
    : null;
  const displayPrice = selectedVariantItem ? `$${selectedVariantItem.price.toFixed(2)}` : priceRange;
  
  // Get unique variants with their tank sizes, sorted by tank size (20 → 40 → 120)
  const variantMap = new Map();
  variants.forEach(v => {
    if (!variantMap.has(v.variant)) {
      variantMap.set(v.variant, v);
    }
  });
  const uniqueVariants = sortVariantsByTankSize(Array.from(variantMap.values()));
  
  // Get explanation - use selected variant's explanation, or first variant's explanation if none selected
  let explanation = productId ? productExplanations[productId] : null;
  if (!explanation && variants.length > 0) {
    // Try to get explanation from first variant as fallback
    const firstVariant = variants[0];
    if (firstVariant && firstVariant.id) {
      explanation = productExplanations[firstVariant.id];
    }
  }
  
  // If still no explanation, try to find one based on base label
  if (!explanation) {
    // Try common base names
    const baseNameLower = baseLabel.toLowerCase();
    if (baseNameLower.includes("halogen")) {
      explanation = productExplanations["halogen_50w"] || "Halogen flood lamp provides excellent basking heat and visible light. Must be used with a thermostat. Best primary heat source option.";
    } else if (baseNameLower.includes("deep heat") || baseNameLower.includes("dhp")) {
      explanation = productExplanations["dhp_50w"] || "Deep Heat Projector emits infrared A & B wavelengths, penetrating deeper into tissue. No visible light. Excellent for 24/7 heating. Must be used with a thermostat.";
    } else if (baseNameLower.includes("uvb")) {
      explanation = productExplanations["uvb_12"] || "UVB lighting helps geckos synthesize vitamin D3 naturally. Optional but beneficial, especially if not using calcium with D3.";
    } else if (baseNameLower.includes("reptile carpet")) {
      explanation = productExplanations["liner_reptile_carpet_20_gallon_tank"] || "Reptile carpet is easy to clean and safe. Provides a solid surface that prevents impaction. Good beginner option.";
    } else if (baseNameLower.includes("slate")) {
      explanation = productExplanations["slate_slate_tile_stone_6_in_x_6_in_s"] || "Slate tile provides a natural look while being easy to clean. Retains heat well and provides a solid surface. Safe and beginner-friendly.";
    } else if (baseNameLower.includes("bioactive")) {
      explanation = productExplanations["bioactive_bioactive_terra_sahara_18_qts_"] || "BioActive Terra Sahara creates a self-cleaning ecosystem with beneficial microorganisms. Advanced setup requiring proper preparation. Only for experienced keepers.";
    } else if (baseNameLower.includes("topsoil")) {
      explanation = productExplanations["topsoil_organic_topsoil_mix_cocunut_ch"] || "Organic topsoil mix creates a naturalistic environment. Requires proper preparation and monitoring. Only for experienced keepers who understand impaction risks.";
    } else if (baseNameLower.includes("sand")) {
      explanation = productExplanations["sand_reptile_sand_calcium_white"] || "⚠️ DANGEROUS: Calcium sand causes impaction when ingested. It clumps when wet and cannot pass through the digestive system. Use safe substrates instead.";
    } else if (baseNameLower.includes("cork bark")) {
      explanation = productExplanations["corkbark_cork_bark_flat_4_pcs"] || "Cork bark provides natural hiding spots and climbing opportunities. Can be used as additional cover or as a hide. Safe and natural-looking.";
    } else if (baseNameLower.includes("climbing branches") || baseNameLower.includes("branches")) {
      explanation = productExplanations["branches_climbing_branches_4_pcs_14_16_"] || "Climbing branches provide enrichment and exercise. Leopard geckos are not fully arboreal but enjoy climbing opportunities. Adds vertical space usage.";
    }
  }
  
  // Only show required indicator if not selected
  const showRequired = isRequired && !isActive;
  
  return (
    <div
      className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
        isActive
          ? "border-emerald-500/80 bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-slate-900/60 shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] shadow-emerald-500/20 scale-[1.02]"
          : showRequired
          ? "border-amber-500/60 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-900/60 hover:border-amber-500/80 hover:shadow-lg hover:shadow-amber-500/10"
          : "border-slate-700/60 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/70 hover:border-emerald-500/40 hover:bg-gradient-to-br hover:from-slate-800/70 hover:via-slate-800/50 hover:to-slate-800/70 hover:shadow-lg hover:shadow-emerald-500/10"
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
          ? "from-emerald-400 via-cyan-400 to-emerald-500 opacity-100" 
          : showRequired
          ? "from-amber-400 via-amber-300 to-amber-400 opacity-100"
          : "from-transparent via-slate-700 to-transparent opacity-0 group-hover:opacity-100 group-hover:from-emerald-500/50 group-hover:via-emerald-400/50 group-hover:to-emerald-500/50"
      }`} />
      
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div
            className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shadow-lg shrink-0 ${
              isActive 
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-400 shadow-emerald-500/50" 
                : showRequired
                ? "bg-gradient-to-br from-amber-500/30 to-amber-600/30 border-amber-500/60 shadow-amber-500/30"
                : "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20"
            }`}
          >
            {isActive && <CheckCircle2 size={16} className="text-white drop-shadow-sm" />}
            {showRequired && <AlertCircle size={14} className="text-amber-400 drop-shadow-sm" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <div className={`font-bold text-lg transition-colors flex-1 ${isActive ? "text-white drop-shadow-sm" : showRequired ? "text-amber-100 group-hover:text-white" : "text-slate-200 group-hover:text-white"}`}>
                {baseLabel}
                {showRequired && (
                  <span className="ml-2 text-xs font-semibold text-amber-400 uppercase tracking-wide">Required</span>
                )}
              </div>
              {explanation && (
                <ProductTooltip explanation={explanation} />
              )}
            </div>
            {selectedVariantItem && (
              <div className="text-xs font-medium mt-1.5 px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 inline-block">
                <span className={`${isActive ? "text-emerald-300" : "text-slate-400"}`}>
                  {selectedVariantItem.variant}
                  {selectedVariantItem.tankSize && (
                    <span className={`ml-2 font-semibold ${isActive ? "text-emerald-400" : "text-slate-500"}`}>• {selectedVariantItem.tankSize}</span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={`flex flex-col items-end shrink-0 ${isActive ? "text-emerald-400" : showRequired ? "text-amber-400" : "text-slate-400"}`}>
          <span className="font-mono text-lg font-bold">{displayPrice}</span>
          {selectedVariantItem && displayPrice !== priceRange && (
            <span className="text-xs text-slate-500 line-through mt-0.5">{priceRange}</span>
          )}
        </div>
      </div>
      
      {/* Premium Variant Selector */}
      {uniqueVariants.length > 1 && (
        <div className="mt-4 pt-4 border-t border-slate-700/30">
          <label className="text-xs font-semibold text-slate-300 mb-2 block uppercase tracking-wider">Variant</label>
          <select
            value={selectedVariant || ""}
            onChange={(e) => {
              e.stopPropagation();
              const newVariant = e.target.value;
              // If selecting the same variant that's already selected, deselect it
              if (isCheckbox && newVariant === selectedVariant) {
                onVariantChange(""); // Deselect
              } else {
                onVariantChange(newVariant);
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full bg-slate-900 border-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-100 transition-all duration-200 ${
              isActive
                ? "border-emerald-500/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                : showRequired
                ? "border-amber-500/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30"
                : "border-slate-600/50 hover:border-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            } focus:outline-none cursor-pointer`}
            style={{ colorScheme: 'dark' }}
          >
            <option value="" className="bg-slate-900 text-slate-100">{isCheckbox && selectedVariant ? "Deselect" : "Select variant"}</option>
            {uniqueVariants.map(v => (
              <option key={v.variant} value={v.variant} className="bg-slate-900 text-slate-100">
                {v.variant}{v.tankSize ? ` (${v.tankSize})` : ''}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

function SelectionCard({ active, label, sublabel, price, onClick, type, productId, isRequired = false }) {
  const explanation = productId ? productExplanations[productId] : null;
  // Only show required indicator if not selected
  const showRequired = isRequired && !active;
  
  return (
    <div
      onClick={onClick}
      className={`group relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
        active
          ? "border-emerald-500/80 bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-slate-900/60 shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] shadow-emerald-500/20 scale-[1.02]"
          : showRequired
          ? "border-amber-500/60 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-900/60 hover:border-amber-500/80 hover:shadow-lg hover:shadow-amber-500/10"
          : "border-slate-700/60 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/70 hover:border-emerald-500/40 hover:bg-gradient-to-br hover:from-slate-800/70 hover:via-slate-800/50 hover:to-slate-800/70 hover:shadow-lg hover:shadow-emerald-500/10"
      }`}
    >
      {/* Premium accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-all duration-300 ${
        active 
          ? "from-emerald-400 via-cyan-400 to-emerald-500 opacity-100" 
          : showRequired
          ? "from-amber-400 via-amber-300 to-amber-400 opacity-100"
          : "from-transparent via-slate-700 to-transparent opacity-0 group-hover:opacity-100 group-hover:from-emerald-500/50 group-hover:via-emerald-400/50 group-hover:to-emerald-500/50"
      }`} />
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div
            className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all shadow-lg shrink-0 ${
              active 
                ? "bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-400 shadow-emerald-500/50" 
                : showRequired
                ? "bg-gradient-to-br from-amber-500/30 to-amber-600/30 border-amber-500/60 shadow-amber-500/30"
                : "bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20"
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

        <div className={`flex flex-col items-end shrink-0 ${active ? "text-emerald-400" : showRequired ? "text-amber-400" : "text-slate-400"}`}>
          <span className="font-mono text-lg font-bold">${(price || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}