"use client";

import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, CheckCircle2, AlertCircle, AlertTriangle, ArrowRight, ShoppingCart,
  Target, Thermometer, Box, Layers, HomeIcon, Zap, Sun, RotateCcw, Copy, Check, Droplets,
} from "lucide-react";
import config from "../../../data/crested-gecko.json";
import { analytics } from "../../utils/analytics";
import ScrollToTop from "../../components/ScrollToTop";
import Footer from "../../components/Footer";
import { Section } from "../../components/builder/Section";
import { useBuilderToasts } from "../../hooks/useBuilderToasts";
import { SetupTemplates } from "../../components/SetupTemplates";
import { buildAmazonCartUrl } from "../../utils/amazonCart";

const AFFILIATE_TAG = "habitatbuilde-20";

const HEATING = config.heating || [];
const UVB = config.uvb || [];
const LIGHTING = config.lighting || [];
const SUBSTRATES = config.substrates || [];
const HUMIDITY = config.humidity || [];
const DECOR = config.decor || [];
const SUPPLEMENTS = config.supplements || [];
const DANGEROUS_SUBSTRATES = new Set(
  (config.safetyRules?.substrate?.dangerous || []).map((s) => String(s).toLowerCase())
);

const HEAT_SOURCE_IDS = new Set(["halogen-25w", "halogen-35w", "ceramic-heat-emitter"]);
const CGD_IDS = new Set(["cgd-repashy", "cgd-pangea"]);
const REQUIRED_DECOR_IDS = ["cork-tube", "coconut-hide", "climbing-vines", "branches"];

function toggle(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function itemTitle(item) {
  return item?.name || item?.label || "";
}

function parseDimensions(item) {
  const d = item?.dimensions || "";
  const match = d.match(/(\d+)"L\s*x\s*(\d+)"W\s*x\s*(\d+)"H/i);
  if (!match) return null;
  return { l: Number(match[1]), w: Number(match[2]), h: Number(match[3]) };
}

function isHorizontalEnclosure(item) {
  const dim = parseDimensions(item);
  if (!dim) return false;
  return dim.h < dim.l;
}

function isDangerousSubstrate(item) {
  const haystack = `${item.id || ""} ${itemTitle(item)} ${item.description || ""}`.toLowerCase();
  return [...DANGEROUS_SUBSTRATES].some((term) => haystack.includes(term));
}

const ENCLOSURES = (config.enclosures || []).filter((e) => !isHorizontalEnclosure(e));

function badgeClass(badge) {
  const b = (badge || "").toLowerCase();
  if (b.includes("not recommended") || b.includes("juvenile") || b.includes("quarantine")) {
    return "bg-amber-500/20 text-amber-300 border-amber-400/30";
  }
  if (b.includes("required")) {
    return "bg-red-500/20 text-red-300 border-red-400/30";
  }
  return "bg-emerald-500/20 text-emerald-300 border-emerald-400/30";
}

function OptionCard({ item, active, onClick }) {
  const title = itemTitle(item);
  const price = item.price;
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`min-h-[44px] p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all touch-manipulation text-left ${
        active
          ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
          : "border-slate-700/60 bg-slate-900/60 hover:border-emerald-500/40"
      }`}
    >
      {item.badge && (
        <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded border mb-2 ${badgeClass(item.badge)}`}>
          {item.badge}
        </span>
      )}
      <p className="font-bold text-slate-200">{title}</p>
      {item.dimensions && <p className="text-xs text-slate-400 mt-1">{item.dimensions}</p>}
      {item.depth && <p className="text-xs text-slate-400 mt-1">Depth: {item.depth}</p>}
      {item.description && <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.description}</p>}
      {item.note && <p className="text-xs text-slate-500 mt-2">{item.note}</p>}
      {item.safetyNote && <p className="text-xs text-amber-200/90 mt-2">{item.safetyNote}</p>}
      {item.warning && (
        <p className="text-xs text-amber-300 mt-2 flex items-start gap-1">
          <AlertTriangle size={12} className="shrink-0 mt-0.5" /> {item.warning}
        </p>
      )}
      {typeof price === "number" ? (
        <p className="font-mono text-emerald-400 font-bold mt-2">${price.toFixed(2)}</p>
      ) : null}
    </div>
  );
}

export default function CrestedGeckoBuilder() {
  return (
    <Suspense fallback={
      <main className="min-h-screen pt-28 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </main>
    }>
      <CrestedGeckoBuilderContent />
      <ScrollToTop />
      <Footer />
    </Suspense>
  );
}

function CrestedGeckoBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRefs = useRef({});

  const [experience, setExperience] = useState(null);
  const [enclosureId, setEnclosureId] = useState(null);
  const [substrateId, setSubstrateId] = useState(null);
  const [heatingIds, setHeatingIds] = useState([]);
  const [uvbId, setUvbId] = useState(null);
  const [lightingIds, setLightingIds] = useState([]);
  const [humidityIds, setHumidityIds] = useState([]);
  const [decorIds, setDecorIds] = useState([]);
  const [supplementIds, setSupplementIds] = useState([]);
  const [stateRestored, setStateRestored] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);
  const [templateApplied, setTemplateApplied] = useState(null);

  const safeSubstrates = useMemo(
    () => SUBSTRATES.filter((s) => !isDangerousSubstrate(s)),
    []
  );

  useEffect(() => {
    analytics.trackBuilderStart("crested-gecko");
  }, []);

  useEffect(() => {
    if (stateRestored) return;
    const exp = searchParams.get("exp");
    const enc = searchParams.get("enclosure");
    const sub = searchParams.get("substrate");
    const heat = searchParams.get("heating");
    const uvb = searchParams.get("uvb");
    const lighting = searchParams.get("lighting");
    const humidity = searchParams.get("humidity");
    const decor = searchParams.get("decor");
    const supp = searchParams.get("supplements");
    if (exp || enc || sub || heat || uvb || lighting || humidity || decor || supp) {
      if (exp) setExperience(exp);
      if (enc) setEnclosureId(enc);
      if (sub) setSubstrateId(sub);
      if (heat) setHeatingIds(heat.split(",").filter(Boolean));
      if (uvb) setUvbId(uvb);
      if (lighting) setLightingIds(lighting.split(",").filter(Boolean));
      if (humidity) setHumidityIds(humidity.split(",").filter(Boolean));
      if (decor) setDecorIds(decor.split(",").filter(Boolean));
      if (supp) setSupplementIds(supp.split(",").filter(Boolean));
      setStateRestored(true);
    }
  }, [searchParams, stateRestored]);

  const applyTemplate = (template, templateKey) => {
    if (template.experience) setExperience(template.experience);
    if (template.enclosureId) setEnclosureId(template.enclosureId);
    if (template.substrateId) setSubstrateId(template.substrateId);
    if (template.heatingIds) setHeatingIds(template.heatingIds);
    if (template.uvbId) setUvbId(template.uvbId);
    if (template.lightingIds) setLightingIds(template.lightingIds);
    if (template.humidityIds) setHumidityIds(template.humidityIds);
    if (template.decorIds) setDecorIds(template.decorIds);
    if (template.supplementIds) setSupplementIds(template.supplementIds);
    setTemplateApplied(templateKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasThermostat = heatingIds.includes("thermostat");
  const hasDimmer = heatingIds.includes("dimmer");
  const hasHeatControl = hasThermostat || hasDimmer;
  const hasHeatSource = heatingIds.some((id) => HEAT_SOURCE_IDS.has(id));
  const heatWithoutControl = hasHeatSource && !hasHeatControl;
  const isUndersizedAdult = enclosureId === "12x12x18" && experience === "experienced";
  const hasUvb = uvbId && uvbId !== "no-uvb";
  const hasD3WithUvb = hasUvb && supplementIds.includes("calcium-d3");
  const hasCgd = supplementIds.some((id) => CGD_IDS.has(id));
  const hasRequiredDecor = REQUIRED_DECOR_IDS.every((id) => decorIds.includes(id));
  const hasHumidityCore =
    humidityIds.includes("hygrometer") &&
    (humidityIds.includes("spray-bottle") || humidityIds.includes("auto-mister"));
  const hasTimer = lightingIds.includes("timer");

  const selectedEnclosure = ENCLOSURES.find((e) => e.id === enclosureId);
  const selectedSubstrate = safeSubstrates.find((s) => s.id === substrateId);
  const selectedHeating = HEATING.filter((h) => heatingIds.includes(h.id));
  const selectedUvb = UVB.find((u) => u.id === uvbId);
  const selectedLighting = LIGHTING.filter((l) => lightingIds.includes(l.id));
  const selectedHumidity = HUMIDITY.filter((h) => humidityIds.includes(h.id));
  const selectedDecor = DECOR.filter((d) => decorIds.includes(d.id));
  const selectedSupplements = SUPPLEMENTS.filter((s) => supplementIds.includes(s.id));

  const allSelectedItems = useMemo(() => [
    selectedEnclosure,
    selectedSubstrate,
    ...selectedHeating,
    selectedUvb,
    ...selectedLighting,
    ...selectedHumidity,
    ...selectedDecor,
    ...selectedSupplements,
  ].filter(Boolean), [selectedEnclosure, selectedSubstrate, selectedHeating, selectedUvb, selectedLighting, selectedHumidity, selectedDecor, selectedSupplements]);

  const amazonCartUrl = useMemo(
    () => buildAmazonCartUrl(allSelectedItems, AFFILIATE_TAG),
    [allSelectedItems]
  );

  const totalPrice = allSelectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const sectionCompletion = useMemo(() => ({
    experience: !!experience,
    enclosure: !!enclosureId,
    heating: hasHeatControl,
    uvb: !!uvbId && hasTimer,
    substrate: !!substrateId,
    humidity: hasHumidityCore,
    decor: hasRequiredDecor,
    supplements: hasCgd,
  }), [experience, enclosureId, hasHeatControl, uvbId, hasTimer, substrateId, hasHumidityCore, hasRequiredDecor, hasCgd]);

  const progress = useMemo(() => {
    const steps = Object.values(sectionCompletion);
    return Math.round((steps.filter(Boolean).length / steps.length) * 100);
  }, [sectionCompletion]);

  const isSectionLocked = useMemo(() => ({
    experience: false,
    enclosure: !experience,
    heating: !sectionCompletion.enclosure,
    uvb: !sectionCompletion.heating,
    substrate: !sectionCompletion.uvb,
    humidity: !sectionCompletion.substrate,
    decor: !sectionCompletion.humidity,
    supplements: !sectionCompletion.decor,
  }), [experience, sectionCompletion]);

  const allRequirementsMet =
    sectionCompletion.experience &&
    sectionCompletion.enclosure &&
    sectionCompletion.heating &&
    sectionCompletion.uvb &&
    sectionCompletion.substrate &&
    sectionCompletion.humidity &&
    sectionCompletion.decor &&
    sectionCompletion.supplements &&
    hasHeatControl &&
    hasCgd;

  const { toast, setToast } = useBuilderToasts({
    sectionCompletion,
    progress,
    labelMap: {
      experience: "Keeper level set",
      enclosure: "Enclosure selected",
      heating: "Heat control ready",
      uvb: "Lighting selected",
      substrate: "Substrate chosen",
      humidity: "Humidity tools added",
      decor: "Decor added",
      supplements: "CGD selected",
    },
  });

  const scrollToSection = (sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const resetBuild = () => {
    setExperience(null);
    setEnclosureId(null);
    setSubstrateId(null);
    setHeatingIds([]);
    setUvbId(null);
    setLightingIds([]);
    setHumidityIds([]);
    setDecorIds([]);
    setSupplementIds([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildParams = () => new URLSearchParams({
    exp: experience || "beginner",
    enclosure: enclosureId || "",
    substrate: substrateId || "",
    heating: heatingIds.join(","),
    uvb: uvbId || "",
    lighting: lightingIds.join(","),
    humidity: humidityIds.join(","),
    decor: decorIds.join(","),
    supplements: supplementIds.join(","),
  });

  const copyBuildLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/build/crested-gecko?${buildParams().toString()}` : "";
    if (url && navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopyLinkSuccess(true);
        setTimeout(() => setCopyLinkSuccess(false), 2500);
      });
    }
  };

  function goToSummary() {
    if (!allRequirementsMet || !hasHeatControl || !hasCgd) return;
    analytics.trackBuilderComplete("crested-gecko", totalPrice, allSelectedItems.length);
    router.push(`/summary/crested-gecko?${buildParams().toString()}`);
  }

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
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Crested Gecko <span className="text-emerald-500">Configurator</span></h1>
        <p className="text-slate-400 text-sm mb-6">Tall enclosure, 85°F max, wet/dry humidity cycling, and CGD. We enforce the essentials.</p>

        <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl border border-red-500/30 bg-red-500/10">
          <p className="text-sm font-black text-red-200 uppercase tracking-wide mb-2">Temperature warning</p>
          <p className="text-sm text-red-100 leading-relaxed">Crested geckos are extremely heat sensitive. Temps above 85°F cause stress. Above 90°F can be fatal. This is the #1 killer of crested geckos — always use a thermostat or dimmer.</p>
        </div>

        <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50">
          <h2 className="text-lg sm:text-xl font-black text-white mb-2">Crested Gecko Habitat Builder</h2>
          <ul className="grid gap-2 text-sm text-slate-200 mb-4">
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Tall enclosure minimum 18&quot;x18&quot;x24&quot; (vertical space required)</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Thermostat or dimmer required on ALL heat sources</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Temperature must NEVER exceed 85°F — fatal above 90°F</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Wet/dry humidity cycling: spike to 80%, dry to 40-50%</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Dense foliage and hides at all vertical levels</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> CGD (Crested Gecko Diet) as primary food source</li>
          </ul>
          <button onClick={() => scrollToSection("experience")} className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border border-emerald-400/30 touch-manipulation">
            Start Builder →
          </button>
        </div>

        <SetupTemplates species="crested-gecko" onApplyTemplate={applyTemplate} />

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
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg whitespace-nowrap"
            >
              <ShoppingCart size={18} />
              Buy This Setup Now →
            </a>
          </div>
        )}

        <div className="space-y-10">
          <Section title="1. Keeper Level" icon={<Target />} sectionId="experience" isCompleted={sectionCompletion.experience} sectionRef={(el) => { if (el) sectionRefs.current.experience = el; }} nextSectionId="enclosure" nextSectionTitle="Enclosure Size" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button onClick={() => setExperience("beginner")} className={`min-h-[44px] p-4 rounded-2xl border text-left touch-manipulation ${experience === "beginner" ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50"}`}>
                <p className="font-bold text-white">Beginner</p>
                <p className="text-xs text-slate-400 mt-1">Guided setup with safety checks</p>
              </button>
              <button onClick={() => setExperience("experienced")} className={`min-h-[44px] p-4 rounded-2xl border text-left touch-manipulation ${experience === "experienced" ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50"}`}>
                <p className="font-bold text-white">Experienced</p>
                <p className="text-xs text-slate-400 mt-1">Adult keeper — 18&quot;x18&quot;x24&quot; minimum</p>
              </button>
            </div>
          </Section>

          <Section title="2. Enclosure Size" icon={<Box />} description="Tall/vertical orientation only. ReptiFiles adult minimum is 18&quot;x18&quot;x24&quot;." sectionId="enclosure" isCompleted={sectionCompletion.enclosure} isLocked={isSectionLocked.enclosure} sectionRef={(el) => { if (el) sectionRefs.current.enclosure = el; }} nextSectionId="heating" nextSectionTitle="Heating & Control" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {isUndersizedAdult && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-100 font-medium">This enclosure is only suitable for juveniles under 25g. Adults require at least 18&quot;x18&quot;x24&quot;.</p>
              </div>
            )}
            {enclosureId === "12x12x18" && experience === "beginner" && (
              <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-100 text-sm">
                12&quot;x12&quot;x18&quot; is juvenile/hatchling use only. Adults need at least 18&quot;x18&quot;x24&quot; of vertical space.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ENCLOSURES.map((e) => (
                <OptionCard
                  key={e.id}
                  item={e}
                  active={enclosureId === e.id}
                  onClick={() => {
                    setEnclosureId(enclosureId === e.id ? null : e.id);
                    setToast({ title: "Added", msg: `+ $${(e.price || 0).toFixed(2)}` });
                  }}
                />
              ))}
            </div>
          </Section>

          <Section title="3. Heating & Control" icon={<Thermometer />} description="Basking 82-85°F max. Thermostat or dimmer required on every heat source." sectionId="heating" isCompleted={sectionCompletion.heating} isLocked={isSectionLocked.heating} sectionRef={(el) => { if (el) sectionRefs.current.heating = el; }} nextSectionId="uvb" nextSectionTitle="UVB & Lighting" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {heatWithoutControl && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-100 font-medium">Crested geckos are extremely heat sensitive. Temps above 85°F cause fatal heat stroke. A thermostat or dimmer is required.</p>
              </div>
            )}
            {!hasHeatControl && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-amber-400 shrink-0" />
                <p className="text-amber-100 font-medium">A thermostat or dimmer is required before you can continue.</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HEATING.map((h) => (
                <OptionCard
                  key={h.id}
                  item={h}
                  active={heatingIds.includes(h.id)}
                  onClick={() => {
                    setHeatingIds(toggle(heatingIds, h.id));
                    setToast({ title: "Added", msg: `+ $${(h.price || 0).toFixed(2)}` });
                  }}
                />
              ))}
            </div>
          </Section>

          <Section title="4. UVB & Lighting" icon={<Sun />} description="Low-output UVB plus a timer for a 12–14 hour day cycle." sectionId="uvb" isCompleted={sectionCompletion.uvb} isLocked={isSectionLocked.uvb} sectionRef={(el) => { if (el) sectionRefs.current.uvb = el; }} nextSectionId="substrate" nextSectionTitle="Substrate" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {uvbId === "no-uvb" && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                Crested geckos can survive without UVB due to CGD, but ReptiFiles strongly recommends it.
              </div>
            )}
            {!hasTimer && (
              <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-100 text-sm">
                Add a timer to automate a 12–14 hour light cycle.
              </div>
            )}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">UVB</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {UVB.map((u) => (
                <OptionCard
                  key={u.id}
                  item={u}
                  active={uvbId === u.id}
                  onClick={() => {
                    setUvbId(uvbId === u.id ? null : u.id);
                    setToast({ title: "Added", msg: u.price != null ? `+ $${u.price.toFixed(2)}` : "Selected" });
                  }}
                />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Daylight & timer</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LIGHTING.map((l) => (
                <OptionCard
                  key={l.id}
                  item={l}
                  active={lightingIds.includes(l.id)}
                  onClick={() => {
                    setLightingIds(toggle(lightingIds, l.id));
                    setToast({ title: "Added", msg: `+ $${(l.price || 0).toFixed(2)}` });
                  }}
                />
              ))}
            </div>
          </Section>

          <Section title="5. Substrate" icon={<Layers />} description="3–4&quot; moisture-retentive substrate. Reptile carpet, bark chips, gravel, and calci-sand are blocked." sectionId="substrate" isCompleted={sectionCompletion.substrate} isLocked={isSectionLocked.substrate} sectionRef={(el) => { if (el) sectionRefs.current.substrate = el; }} nextSectionId="humidity" nextSectionTitle="Humidity Tools" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {safeSubstrates.map((s) => (
                <OptionCard
                  key={s.id}
                  item={s}
                  active={substrateId === s.id}
                  onClick={() => {
                    setSubstrateId(substrateId === s.id ? null : s.id);
                    setToast({ title: "Added", msg: `+ $${(s.price || 0).toFixed(2)}` });
                  }}
                />
              ))}
            </div>
          </Section>

          <Section title="6. Humidity Tools" icon={<Droplets />} description="Spike to 80%+ twice daily, then dry to 40-50%. Constant high humidity causes respiratory infection." sectionId="humidity" isCompleted={sectionCompletion.humidity} isLocked={isSectionLocked.humidity} sectionRef={(el) => { if (el) sectionRefs.current.humidity = el; }} nextSectionId="decor" nextSectionTitle="Decor & Enrichment" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {!hasHumidityCore && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                Add a hygrometer and a sprayer or automatic mister for wet/dry cycling.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HUMIDITY.map((h) => (
                <OptionCard
                  key={h.id}
                  item={h}
                  active={humidityIds.includes(h.id)}
                  onClick={() => {
                    setHumidityIds(toggle(humidityIds, h.id));
                    setToast({ title: "Added", msg: `+ $${(h.price || 0).toFixed(2)}` });
                  }}
                />
              ))}
            </div>
          </Section>

          <Section title="7. Decor & Enrichment" icon={<HomeIcon />} description="Hides and vines at all vertical levels — top, middle, and bottom." sectionId="decor" isCompleted={sectionCompletion.decor} isLocked={isSectionLocked.decor} sectionRef={(el) => { if (el) sectionRefs.current.decor = el; }} nextSectionId="supplements" nextSectionTitle="Food & Supplements" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {!hasRequiredDecor && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                Add cork hide, coconut hide, climbing vines, and ledges so the gecko can use all levels.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DECOR.map((d) => (
                <OptionCard
                  key={d.id}
                  item={d}
                  active={decorIds.includes(d.id)}
                  onClick={() => {
                    setDecorIds(toggle(decorIds, d.id));
                    setToast({ title: "Added", msg: `+ $${(d.price || 0).toFixed(2)}` });
                  }}
                />
              ))}
            </div>
          </Section>

          <Section title="8. Food & Supplements" icon={<Zap />} description="CGD is the primary diet. Use calcium without D3 if providing UVB." sectionId="supplements" isCompleted={sectionCompletion.supplements} isLocked={isSectionLocked.supplements} sectionRef={(el) => { if (el) sectionRefs.current.supplements = el; }} isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {!hasCgd && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                Select a Crested Gecko Diet (Repashy or Pangea) before generating a summary.
              </div>
            )}
            {hasD3WithUvb && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-100 font-medium">D3 toxicity risk — use calcium WITHOUT D3 when providing UVB lighting.</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUPPLEMENTS.map((s) => (
                <OptionCard
                  key={s.id}
                  item={s}
                  active={supplementIds.includes(s.id)}
                  onClick={() => {
                    setSupplementIds(toggle(supplementIds, s.id));
                    setToast({ title: "Added", msg: `+ $${(s.price || 0).toFixed(2)}` });
                  }}
                />
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
            <p className="text-amber-200/90 text-sm">
              {!hasHeatControl
                ? "A thermostat or dimmer is required before you can generate a summary."
                : !hasCgd
                  ? "Select a Crested Gecko Diet (CGD) before generating a summary."
                  : "Complete all required sections (tall enclosure, heat control, UVB + timer, substrate, humidity tools, hides + vines, and CGD) to generate your build."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
