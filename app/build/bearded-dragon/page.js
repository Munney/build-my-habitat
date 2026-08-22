"use client";

import { useMemo, useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, CheckCircle2, AlertCircle, XCircle, ShoppingCart, ArrowRight,
  Target, Thermometer, Box, Layers, HomeIcon, Zap, Sun, RotateCcw, Copy, Check,
  Menu, X,
} from "lucide-react";
import config from "../../../data/bearded-dragon.json";
import { analytics } from "../../utils/analytics";
import ScrollToTop from "../../components/ScrollToTop";
import { SetupTemplates } from "../../components/SetupTemplates";
import Footer from "../../components/Footer";
import { Section } from "../../components/builder/Section";
import { useBuilderToasts } from "../../hooks/useBuilderToasts";
import { buildAmazonCartUrl } from "../../utils/amazonCart";

const AFFILIATE_TAG = "habitatbuilde-20";

const ENCLOSURES = config.enclosures || [];
const HEATING = config.heating || [];
const LIGHTING = config.lighting || [];
const SUBSTRATES = config.substrates || [];
const HIDES = config.hides || [];
const DECOR = config.decor || [];
const SUPPLEMENTS = config.supplements || [];
const FEEDING = config.feeding || [];

/** Resolve template product IDs to enclosure-size-appropriate variants (120 gal vs smaller). */
function resolveBeardedDragonTemplateToSize(template) {
  const enclosure = ENCLOSURES.find((e) => e.id === template.enclosureId);
  const size = enclosure?.size ?? 120;
  const is120 = size >= 120;

  const hideIdMap = {
    warmhide: is120 ? "warmhide_large" : "warmhide",
    coolhide: is120 ? "coolhide_large" : "coolhide",
    rock_cave: is120 ? "rock_cave" : "rock_cave_medium",
  };
  const resolvedHideIds = (template.hideIds || []).map((id) => hideIdMap[id] ?? id);

  const decorIdMap = {
    basking_platform: is120 ? "basking_platform_large" : "basking_platform",
    branches: is120 ? "branches_large" : "branches",
  };
  const resolvedDecorIds = (template.decorIds || []).map((id) => decorIdMap[id] ?? id);

  const lightingIdMap = {
    uvb_t5_34: is120 ? "uvb_t5_34" : "uvb_t5_22",
    uvb_t5_22: "uvb_t5_22",
    uvb_t5_46: "uvb_t5_46",
  };
  const resolvedLightingIds = (template.lightingIds || []).map((id) => lightingIdMap[id] ?? id);

  const heatingIdMap = {
    halogen_100w: is120 ? "halogen_100w" : "halogen_100w",
    halogen_150w: "halogen_150w",
    che_100w: "che_100w",
    thermostat: "thermostat",
  };
  const resolvedHeatingIds = (template.heatingIds || []).map((id) => heatingIdMap[id] ?? id);

  return {
    ...template,
    hideIds: resolvedHideIds,
    decorIds: resolvedDecorIds,
    lightingIds: resolvedLightingIds,
    heatingIds: resolvedHeatingIds,
  };
}

function toggle(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function groupDecorVariants(decor) {
  const groups = new Map();
  const standalone = [];
  for (const item of decor || []) {
    const groupName = item.variantGroup;
    if (groupName) {
      if (!groups.has(groupName)) {
        groups.set(groupName, { baseName: groupName, baseLabel: groupName, variants: [] });
      }
      groups.get(groupName).variants.push(item);
    } else {
      standalone.push(item);
    }
  }
  return { groups: Array.from(groups.values()), standalone };
}

function groupHideVariants(hides) {
  const groups = new Map();
  const standalone = [];
  for (const item of hides || []) {
    const groupName = item.variantGroup;
    if (groupName) {
      if (!groups.has(groupName)) {
        groups.set(groupName, { baseName: groupName, baseLabel: groupName, variants: [] });
      }
      groups.get(groupName).variants.push(item);
    } else {
      standalone.push(item);
    }
  }
  return { groups: Array.from(groups.values()), standalone };
}

function Card({ active, label, price, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`min-h-[44px] p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all touch-manipulation ${
        active
          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
          : "border-slate-700/60 bg-slate-900/60 hover:border-emerald-500/40"
      }`}
    >
      {badge && (
        <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
          {badge}
        </span>
      )}
      <p className="font-bold text-slate-200">{label}</p>
      <p className="font-mono text-emerald-400 font-bold mt-1">${(price || 0).toFixed(2)}</p>
    </div>
  );
}

function DecorSection({ decor, selectedIds, onVariantSelect }) {
  const { groups, standalone } = groupDecorVariants(decor);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {standalone.map((d) => (
        <Card
          key={d.id}
          active={selectedIds.includes(d.id)}
          label={d.label}
          price={d.price}
          badge={d.badge}
          onClick={() => onVariantSelect(d.id, null)}
        />
      ))}
      {groups.map((group) => {
        const selectedVariant = group.variants.find((v) => selectedIds.includes(v.id));
        const isActive = !!selectedVariant;
        const groupBadge = group.variants.some((v) => v.badge) ? group.variants.find((v) => v.badge).badge : null;
        return (
          <div
            key={group.baseName}
            className={`p-5 rounded-2xl border-2 transition-all ${
              isActive
                ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                : "border-slate-700/60 bg-slate-900/60 hover:border-emerald-500/40"
            }`}
          >
            {groupBadge && (
              <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
                {groupBadge}
              </span>
            )}
            <p className="font-bold text-slate-200 mb-2">{group.baseLabel}</p>
            <select
              value={selectedVariant?.id ?? ""}
              onChange={(e) => {
                const id = e.target.value || null;
                onVariantSelect(id, group.baseName);
              }}
              className="w-full min-h-[44px] rounded-lg border-2 border-slate-600 bg-slate-800 text-slate-200 px-3 py-2.5 text-sm font-medium focus:border-emerald-500 focus:outline-none touch-manipulation"
            >
              <option value="">Choose option…</option>
              {group.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} — ${(v.price || 0).toFixed(2)}
                </option>
              ))}
            </select>
            {selectedVariant && (
              <p className="font-mono text-emerald-400 font-bold mt-2">${(selectedVariant.price || 0).toFixed(2)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function HidesSection({ hides, selectedIds, onVariantSelect }) {
  const { groups, standalone } = groupHideVariants(hides);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {standalone.map((h) => (
        <Card
          key={h.id}
          active={selectedIds.includes(h.id)}
          label={h.label}
          price={h.price}
          badge={h.badge}
          onClick={() => onVariantSelect(h.id, null)}
        />
      ))}
      {groups.map((group) => {
        const selectedVariant = group.variants.find((v) => selectedIds.includes(v.id));
        const isActive = !!selectedVariant;
        const groupBadge = group.variants.some((v) => v.badge) ? group.variants.find((v) => v.badge).badge : null;
        return (
          <div
            key={group.baseName}
            className={`p-5 rounded-2xl border-2 transition-all ${
              isActive
                ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                : "border-slate-700/60 bg-slate-900/60 hover:border-emerald-500/40"
            }`}
          >
            {groupBadge && (
              <span className="inline-block px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2">
                {groupBadge}
              </span>
            )}
            <p className="font-bold text-slate-200 mb-2">{group.baseLabel}</p>
            <select
              value={selectedVariant?.id ?? ""}
              onChange={(e) => {
                const id = e.target.value || null;
                onVariantSelect(id, group.baseName);
              }}
              className="w-full min-h-[44px] rounded-lg border-2 border-slate-600 bg-slate-800 text-slate-200 px-3 py-2.5 text-sm font-medium focus:border-emerald-500 focus:outline-none touch-manipulation"
            >
              <option value="">Choose option…</option>
              {group.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} — ${(v.price || 0).toFixed(2)}
                </option>
              ))}
            </select>
            {selectedVariant && (
              <p className="font-mono text-emerald-400 font-bold mt-2">${(selectedVariant.price || 0).toFixed(2)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BeardedDragonBuilder() {
  return (
    <Suspense fallback={
      <main className="min-h-screen pt-28 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </main>
    }>
      <BeardedDragonBuilderContent />
      <ScrollToTop />
      <Footer />
    </Suspense>
  );
}

function BeardedDragonBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef({});

  const [experience, setExperience] = useState(null);
  const [enclosureId, setEnclosureId] = useState(null);
  const [substrateId, setSubstrateId] = useState(null);
  const [heatingIds, setHeatingIds] = useState([]);
  const [lightingIds, setLightingIds] = useState([]);
  const [hideIds, setHideIds] = useState([]);
  const [decorIds, setDecorIds] = useState([]);
  const [supplementIds, setSupplementIds] = useState([]);
  const [feedingIds, setFeedingIds] = useState([]);
  const [stateRestored, setStateRestored] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  const [templateApplied, setTemplateApplied] = useState(null);

  useEffect(() => {
    analytics.trackBuilderStart("bearded-dragon");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-100px 0px -100px 0px" }
    );
    Object.values(sectionRefs.current).forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stateRestored) return;
    const exp = searchParams.get("exp");
    const enc = searchParams.get("enclosure");
    const sub = searchParams.get("substrate");
    const heat = searchParams.get("heating");
    const light = searchParams.get("lighting");
    const hides = searchParams.get("hides");
    const decor = searchParams.get("decor");
    const supp = searchParams.get("supplements");
    const feed = searchParams.get("feeding");
    if (exp || enc || sub || heat || light || hides || decor || supp || feed) {
      if (exp) setExperience(exp);
      if (enc) setEnclosureId(enc);
      if (sub) setSubstrateId(sub);
      if (heat) setHeatingIds(heat.split(",").filter(Boolean));
      if (light) setLightingIds(light.split(",").filter(Boolean));
      if (hides) setHideIds(hides.split(",").filter(Boolean));
      if (decor) setDecorIds(decor.split(",").filter(Boolean));
      if (supp) setSupplementIds(supp.split(",").filter(Boolean));
      if (feed) setFeedingIds(feed.split(",").filter(Boolean));
      setStateRestored(true);
    }
  }, [searchParams, stateRestored]);

  const applyTemplate = useCallback((template, templateKey) => {
    const resolved = resolveBeardedDragonTemplateToSize(template);
    if (resolved.experience) setExperience(resolved.experience);
    if (resolved.enclosureId) setEnclosureId(resolved.enclosureId);
    if (resolved.substrateIds?.length) setSubstrateId(resolved.substrateIds[0]);
    if (resolved.heatingIds) setHeatingIds(resolved.heatingIds);
    if (resolved.lightingIds) setLightingIds(resolved.lightingIds);
    if (resolved.hideIds) setHideIds(resolved.hideIds);
    if (resolved.decorIds) setDecorIds(resolved.decorIds || []);
    if (resolved.supplementIds) setSupplementIds(resolved.supplementIds);
    if (resolved.feedingIds) setFeedingIds(resolved.feedingIds || []);
    setTemplateApplied(templateKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hasThermostat = heatingIds.includes("thermostat");
  const hasBasking = heatingIds.some((id) => id.startsWith("halogen_") || id.startsWith("che_"));
  const hasUvb = lightingIds.some((id) => id.startsWith("uvb_t5") || id.startsWith("uvb"));
  const blockedSubstrateIds = useMemo(() => new Set([
    "reptile_carpet",
    "sand",
    "sand_reptile_sand_calcium_white",
    "sand_reptile_sand_calcium_black",
    "sand_reptile_sand_calcium_tan",
    "sand_reptile_sand_calcium_blue",
  ]), []);

  const filteredSubstrates = useMemo(() => {
    const safeSubstrates = SUBSTRATES.filter((s) => !blockedSubstrateIds.has(s.id));
    if (experience === "beginner") {
      return safeSubstrates.filter((s) => s.type === "solid" || !s.type);
    }
    return safeSubstrates;
  }, [experience, blockedSubstrateIds]);

  useEffect(() => {
    if (substrateId && blockedSubstrateIds.has(substrateId)) {
      setSubstrateId(null);
    }
  }, [substrateId, blockedSubstrateIds]);

  const selectedEnclosure = ENCLOSURES.find((e) => e.id === enclosureId);
  const selectedSubstrate = SUBSTRATES.find((s) => s.id === substrateId);
  const selectedHeating = HEATING.filter((h) => heatingIds.includes(h.id));
  const selectedLighting = LIGHTING.filter((l) => lightingIds.includes(l.id));
  const selectedHides = HIDES.filter((h) => hideIds.includes(h.id));
  const selectedDecor = DECOR.filter((d) => decorIds.includes(d.id));
  const selectedSupplements = SUPPLEMENTS.filter((s) => supplementIds.includes(s.id));
  const selectedFeeding = FEEDING.filter((f) => feedingIds.includes(f.id));

  const allSelectedItems = useMemo(() => [
    selectedEnclosure,
    selectedSubstrate,
    ...selectedHeating,
    ...selectedLighting,
    ...selectedHides,
    ...selectedDecor,
    ...selectedSupplements,
    ...selectedFeeding,
  ].filter(Boolean), [selectedEnclosure, selectedSubstrate, selectedHeating, selectedLighting, selectedHides, selectedDecor, selectedSupplements, selectedFeeding]);

  const amazonCartUrl = useMemo(
    () => buildAmazonCartUrl(allSelectedItems, AFFILIATE_TAG),
    [allSelectedItems]
  );

  const totalPrice = allSelectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const sectionCompletion = useMemo(() => ({
    experience: !!experience,
    enclosure: !!enclosureId,
    substrate: !!substrateId,
    heating: hasBasking && hasThermostat,
    lighting: hasUvb,
    hides: hideIds.length >= 2,
    decor: true,
    supplements: supplementIds.length >= 1,
    feeding: true,
  }), [experience, enclosureId, substrateId, hasBasking, hasThermostat, hasUvb, hideIds.length, supplementIds.length]);

  const progress = useMemo(() => {
    const steps = [sectionCompletion.experience, sectionCompletion.enclosure, sectionCompletion.substrate, sectionCompletion.heating, sectionCompletion.lighting, sectionCompletion.hides, sectionCompletion.supplements];
    return Math.round((steps.filter(Boolean).length / steps.length) * 100);
  }, [sectionCompletion]);

  const isSectionLocked = useMemo(() => ({
    experience: false,
    enclosure: !experience,
    substrate: !sectionCompletion.enclosure,
    heating: !sectionCompletion.substrate,
    lighting: !sectionCompletion.heating,
    hides: !sectionCompletion.lighting,
    decor: !sectionCompletion.hides,
    supplements: !sectionCompletion.decor,
    feeding: !sectionCompletion.supplements,
  }), [experience, sectionCompletion]);

  const allRequirementsMet = sectionCompletion.experience && sectionCompletion.enclosure && sectionCompletion.substrate && sectionCompletion.heating && sectionCompletion.lighting && sectionCompletion.hides && sectionCompletion.supplements;

  const { toast, setToast } = useBuilderToasts({
    sectionCompletion,
    progress,
    labelMap: {
      experience: "Level set",
      enclosure: "Enclosure selected",
      substrate: "Substrate chosen",
      heating: "Heating ready",
      lighting: "UVB selected",
      hides: "Hides added",
      supplements: "Supplements added",
    },
  });

  const scrollToSection = (sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const sections = [
    { id: "experience", title: "Experience", icon: Target },
    { id: "enclosure", title: "Enclosure", icon: Box },
    { id: "substrate", title: "Substrate", icon: Layers },
    { id: "heating", title: "Heating", icon: Thermometer },
    { id: "lighting", title: "UVB Lighting", icon: Sun },
    { id: "hides", title: "Hides", icon: HomeIcon },
    { id: "decor", title: "Decor", icon: Zap },
    { id: "supplements", title: "Supplements", icon: Zap },
    { id: "feeding", title: "Feeding", icon: Zap },
  ];

  const resetBuild = () => {
    setExperience(null);
    setEnclosureId(null);
    setSubstrateId(null);
    setHeatingIds([]);
    setLightingIds([]);
    setHideIds([]);
    setDecorIds([]);
    setSupplementIds([]);
    setFeedingIds([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyBuildLink = () => {
    const params = new URLSearchParams({
      exp: experience || "beginner",
      enclosure: enclosureId || "",
      substrate: substrateId || "",
      heating: heatingIds.join(","),
      lighting: lightingIds.join(","),
      hides: hideIds.join(","),
      decor: decorIds.join(","),
      supplements: supplementIds.join(","),
      feeding: feedingIds.join(","),
    });
    const url = typeof window !== "undefined" ? `${window.location.origin}/build/bearded-dragon?${params.toString()}` : "";
    if (url && navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopyLinkSuccess(true);
        setTimeout(() => setCopyLinkSuccess(false), 2500);
      });
    }
  };

  function goToSummary() {
    if (!allRequirementsMet) return;
    analytics.trackBuilderComplete("bearded-dragon", totalPrice, allSelectedItems.length);
    const params = new URLSearchParams({
      exp: experience || "beginner",
      enclosure: enclosureId || "",
      substrate: substrateId || "",
      heating: heatingIds.join(","),
      lighting: lightingIds.join(","),
      hides: hideIds.join(","),
      decor: decorIds.join(","),
      supplements: supplementIds.join(","),
      feeding: feedingIds.join(","),
    });
    router.push(`/summary/bearded-dragon?${params.toString()}`);
  }

  const sortedEnclosures = useMemo(() => [...ENCLOSURES].sort((a, b) => (a.size || 0) - (b.size || 0)), []);

  return (
    <main className="relative min-h-screen pb-20 px-4 sm:px-6">
      <div className="h-28" />
      <div className="sticky top-[112px] z-40 mb-6 sm:mb-8 -mt-28 bg-slate-900/90 backdrop-blur-md border-b border-white/10 rounded-b-2xl overflow-hidden">
        <div className="h-1 bg-slate-800/50 relative">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Progress</span>
          <span className="text-sm font-black text-emerald-400">{progress}%</span>
          <span className="text-base sm:text-lg font-bold text-white truncate">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[100] rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl px-4 py-3">
          <div className="text-xs font-black text-emerald-400 uppercase">✅ {toast.title}</div>
          <div className="text-sm font-semibold text-white">{toast.msg}</div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.push("/")} className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-4 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Hub
        </button>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Bearded Dragon <span className="text-emerald-500">Configurator</span></h1>
        <p className="text-slate-400 text-sm mb-6">4×2×2 minimum, UVB required, basking + thermostat. We enforce the essentials.</p>

        <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50">
          <h2 className="text-lg sm:text-xl font-black text-white mb-2">Bearded Dragon Habitat Builder</h2>
          <ul className="grid gap-2 text-sm text-slate-200 mb-4">
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 4×2×2 ft (120 gal) minimum</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> T5 UVB 10–12% required</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Basking heat + thermostat</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 2+ hides, safe substrate</li>
          </ul>
          <button onClick={() => scrollToSection("experience")} className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border border-emerald-400/30 touch-manipulation">
            Start Builder →
          </button>
        </div>

        <SetupTemplates species="bearded-dragon" onApplyTemplate={applyTemplate} />

        {templateApplied && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-sm">
                ✓ {templateApplied === "budget" ? "Budget" : "Premium"} Setup Applied
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                All recommended items selected. Ready to purchase.
              </p>
            </div>
            <a
              href={amazonCartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg whitespace-nowrap"
            >
              <ShoppingCart size={18} />
              Buy This Setup Now →
            </a>
          </div>
        )}

        <div className="space-y-10">
          <Section title="1. Experience" icon={<Target />} sectionId="experience" isCompleted={sectionCompletion.experience} sectionRef={(el) => { if (el) sectionRefs.current.experience = el; }} nextSectionId="enclosure" nextSectionTitle="Enclosure" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button onClick={() => setExperience("beginner")} className={`min-h-[44px] p-4 rounded-2xl border text-left touch-manipulation ${experience === "beginner" ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50"}`}>
                <p className="font-bold text-white">Beginner</p>
                <p className="text-xs text-slate-400 mt-1">Solid substrates only</p>
              </button>
              <button onClick={() => setExperience("experienced")} className={`min-h-[44px] p-4 rounded-2xl border text-left touch-manipulation ${experience === "experienced" ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50"}`}>
                <p className="font-bold text-white">Experienced</p>
                <p className="text-xs text-slate-400 mt-1">All substrates</p>
              </button>
            </div>
          </Section>

          <Section title="2. Enclosure" icon={<Box />} description="Minimum 4×2×2 ft (120 gallon equivalent)." sectionId="enclosure" isCompleted={sectionCompletion.enclosure} isLocked={isSectionLocked.enclosure} sectionRef={(el) => { if (el) sectionRefs.current.enclosure = el; }} nextSectionId="substrate" nextSectionTitle="Substrate" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sortedEnclosures.map((e) => (
                <Card key={e.id} active={enclosureId === e.id} label={e.label} price={e.price} badge={e.badge} onClick={() => { setEnclosureId(enclosureId === e.id ? null : e.id); setToast({ title: "Added", msg: `+ $${(e.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="3. Substrate" icon={<Layers />} description="Safe floor option. Beginners: solid only." sectionId="substrate" isCompleted={sectionCompletion.substrate} isLocked={isSectionLocked.substrate} sectionRef={(el) => { if (el) sectionRefs.current.substrate = el; }} nextSectionId="heating" nextSectionTitle="Heating" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {!experience && <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs rounded-xl">Select experience first.</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSubstrates.map((s) => (
                <Card key={s.id} active={substrateId === s.id} label={s.label} price={s.price} badge={s.badge} onClick={() => { setSubstrateId(substrateId === s.id ? null : s.id); setToast({ title: "Added", msg: `+ $${(s.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="4. Heating" icon={<Thermometer />} description="Basking heat (halogen or CHE) + thermostat required." sectionId="heating" isCompleted={sectionCompletion.heating} isLocked={isSectionLocked.heating} sectionRef={(el) => { if (el) sectionRefs.current.heating = el; }} nextSectionId="lighting" nextSectionTitle="UVB" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {(!hasBasking || !hasThermostat) && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-amber-400 shrink-0" />
                <p className="text-amber-100 font-medium">Basking source and thermostat are required.</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HEATING.map((h) => (
                <Card key={h.id} active={heatingIds.includes(h.id)} label={h.label} price={h.price} badge={h.badge} onClick={() => { setHeatingIds(toggle(heatingIds, h.id)); setToast({ title: "Added", msg: `+ $${(h.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="5. UVB Lighting" icon={<Sun />} description="T5 UVB 10–12% required. Covers ~50% of enclosure." sectionId="lighting" isCompleted={sectionCompletion.lighting} isLocked={isSectionLocked.lighting} sectionRef={(el) => { if (el) sectionRefs.current.lighting = el; }} nextSectionId="hides" nextSectionTitle="Hides" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {!hasUvb && lightingIds.length === 0 && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-amber-400 shrink-0" />
                <p className="text-amber-100 font-medium">UVB is required to prevent metabolic bone disease.</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LIGHTING.map((l) => (
                <Card key={l.id} active={lightingIds.includes(l.id)} label={l.label} price={l.price} badge={l.badge} onClick={() => { setLightingIds(lightingIds.includes(l.id) ? lightingIds.filter((x) => x !== l.id) : [l.id]); setToast({ title: "Added", msg: `+ $${(l.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="6. Hides" icon={<HomeIcon />} description="At least 2 hides (warm and cool side)." sectionId="hides" isCompleted={sectionCompletion.hides} isLocked={isSectionLocked.hides} sectionRef={(el) => { if (el) sectionRefs.current.hides = el; }} nextSectionId="decor" nextSectionTitle="Decor" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {hideIds.length < 2 && hideIds.length > 0 && (
              <div className="mb-4 p-3 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">Add at least 2 hides.</div>
            )}
            <HidesSection
              hides={HIDES}
              selectedIds={hideIds}
              onVariantSelect={(id, groupName) => {
                if (groupName == null) {
                  if (id) {
                    setHideIds((prev) => toggle(prev, id));
                    const item = HIDES.find((h) => h.id === id);
                    if (item && !hideIds.includes(id)) setToast({ title: "Added", msg: `+ $${(item.price || 0).toFixed(2)}` });
                  }
                  return;
                }
                setHideIds((prev) => {
                  const rest = prev.filter((pid) => {
                    const item = HIDES.find((h) => h.id === pid);
                    return !item || item.variantGroup !== groupName;
                  });
                  if (id) return [...rest, id];
                  return rest;
                });
                if (id) {
                  const item = HIDES.find((h) => h.id === id);
                  if (item) setToast({ title: "Added", msg: `+ $${(item.price || 0).toFixed(2)}` });
                }
              }}
            />
          </Section>

          <Section title="7. Decor" icon={<Zap />} description="Basking platform and climbing decor." sectionId="decor" isCompleted={sectionCompletion.decor} isLocked={isSectionLocked.decor} sectionRef={(el) => { if (el) sectionRefs.current.decor = el; }} nextSectionId="supplements" nextSectionTitle="Supplements" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <DecorSection
              decor={DECOR}
              selectedIds={decorIds}
              onVariantSelect={(id, groupName) => {
                if (groupName == null) {
                  if (id) {
                    setDecorIds((prev) => toggle(prev, id));
                    const item = DECOR.find((d) => d.id === id);
                    if (item && !decorIds.includes(id)) setToast({ title: "Added", msg: `+ $${(item.price || 0).toFixed(2)}` });
                  }
                  return;
                }
                setDecorIds((prev) => {
                  const rest = prev.filter((pid) => {
                    const item = DECOR.find((d) => d.id === pid);
                    return !item || item.variantGroup !== groupName;
                  });
                  if (id) return [...rest, id];
                  return rest;
                });
                if (id) {
                  const item = DECOR.find((d) => d.id === id);
                  if (item) setToast({ title: "Added", msg: `+ $${(item.price || 0).toFixed(2)}` });
                }
              }}
            />
          </Section>

          <Section title="8. Supplements" icon={<Zap />} description="Calcium (with/without D3 per UVB) + multivitamin." sectionId="supplements" isCompleted={sectionCompletion.supplements} isLocked={isSectionLocked.supplements} sectionRef={(el) => { if (el) sectionRefs.current.supplements = el; }} nextSectionId="feeding" nextSectionTitle="Feeding" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {supplementIds.length === 0 && (
              <div className="mb-4 p-3 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">Add calcium and multivitamin.</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUPPLEMENTS.map((s) => (
                <Card key={s.id} active={supplementIds.includes(s.id)} label={s.label} price={s.price} badge={s.badge} onClick={() => { setSupplementIds(toggle(supplementIds, s.id)); setToast({ title: "Added", msg: `+ $${(s.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="9. Feeding" icon={<Zap />} description="Salad bowl, feeder dish, water bowl." sectionId="feeding" isCompleted={sectionCompletion.feeding} isLocked={isSectionLocked.feeding} sectionRef={(el) => { if (el) sectionRefs.current.feeding = el; }} isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEEDING.map((f) => (
                <Card key={f.id} active={feedingIds.includes(f.id)} label={f.label} price={f.price} onClick={() => { setFeedingIds(toggle(feedingIds, f.id)); setToast({ title: "Added", msg: `+ $${(f.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-10 p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-white/10">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-slate-400 text-sm">Estimated total</p>
                <p className="text-2xl sm:text-3xl font-black text-white">${totalPrice.toFixed(2)}</p>
              </div>
              {progress >= 50 && (
                <button type="button" onClick={copyBuildLink} className="flex items-center gap-2 py-2.5 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-white text-xs font-bold border border-slate-600 min-h-[44px]">
                  {copyLinkSuccess ? <Check size={14} /> : <Copy size={14} />} {copyLinkSuccess ? "Copied!" : "Copy link"}
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={goToSummary} disabled={!allRequirementsMet} className={`min-h-[48px] py-4 px-6 sm:px-8 rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2 flex-1 ${!allRequirementsMet ? "bg-slate-800/50 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-white border-2 border-emerald-400/30"}`}>
                Generate Habitat <ArrowRight size={20} />
              </button>
              <button type="button" onClick={resetBuild} className="min-h-[44px] py-3 px-6 rounded-xl font-semibold text-sm text-slate-400 hover:text-slate-200 border border-slate-600">
                <RotateCcw size={18} className="inline mr-2" /> Reset
              </button>
            </div>
          </div>
          {!allRequirementsMet && (
            <p className="text-amber-200/90 text-sm">Complete all required sections (enclosure, substrate, heating, UVB, 2+ hides, supplements) to generate your build.</p>
          )}
        </div>
      </div>
    </main>
  );
}
