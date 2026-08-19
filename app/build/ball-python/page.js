"use client";

import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, CheckCircle2, AlertCircle, AlertTriangle, ArrowRight,
  Target, Thermometer, Box, Layers, HomeIcon, Zap, Sun, RotateCcw, Copy, Check, Droplets,
} from "lucide-react";
import config from "../../../data/ball-python.json";
import { analytics } from "../../utils/analytics";
import ScrollToTop from "../../components/ScrollToTop";
import Footer from "../../components/Footer";
import { Section } from "../../components/builder/Section";
import { useBuilderToasts } from "../../hooks/useBuilderToasts";

const ENCLOSURES = config.enclosures || [];
const HEATING = config.heating || [];
const UVB = config.uvb || [];
const SUBSTRATES = config.substrates || [];
const HUMIDITY = config.humidity || [];
const HIDES = config.hides || [];
const WATER = config.water || [];
const MONITORING = config.monitoring || [];
const DANGEROUS_SUBSTRATES = new Set(
  (config.safetyRules?.substrate?.dangerous || []).map((s) => String(s).toLowerCase())
);
const PRIMARY_HEAT_IDS = new Set([
  "halogen-flood",
  "deep-heat-projector",
  "ceramic-heat-emitter",
  "radiant-heat-panel",
]);
const REQUIRED_HIDE_IDS = ["warm-hide", "cool-hide", "humid-hide"];

function toggle(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function itemTitle(item) {
  return item?.name || item?.label || "";
}

function isDangerousSubstrate(item) {
  const haystack = `${item.id || ""} ${itemTitle(item)} ${item.description || ""}`.toLowerCase();
  return [...DANGEROUS_SUBSTRATES].some((term) => haystack.includes(term));
}

function badgeClass(badge) {
  const b = (badge || "").toLowerCase();
  if (b.includes("not recommended") || b.includes("juvenile") || b.includes("quarantine")) {
    return "bg-amber-500/20 text-amber-300 border-amber-400/30";
  }
  if (b.includes("required")) return "bg-red-500/20 text-red-300 border-red-400/30";
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

export default function BallPythonBuilder() {
  return (
    <Suspense fallback={
      <main className="min-h-screen pt-28 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </main>
    }>
      <BallPythonBuilderContent />
      <ScrollToTop />
      <Footer />
    </Suspense>
  );
}

function BallPythonBuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRefs = useRef({});

  const [experience, setExperience] = useState(null);
  const [enclosureId, setEnclosureId] = useState(null);
  const [substrateId, setSubstrateId] = useState(null);
  const [heatingIds, setHeatingIds] = useState([]);
  const [uvbId, setUvbId] = useState(null);
  const [humidityIds, setHumidityIds] = useState([]);
  const [hideIds, setHideIds] = useState([]);
  const [waterIds, setWaterIds] = useState([]);
  const [monitoringIds, setMonitoringIds] = useState([]);
  const [stateRestored, setStateRestored] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);

  const safeSubstrates = useMemo(
    () => SUBSTRATES.filter((s) => !isDangerousSubstrate(s)),
    []
  );

  useEffect(() => {
    analytics.trackBuilderStart("ball-python");
  }, []);

  useEffect(() => {
    if (stateRestored) return;
    const exp = searchParams.get("exp");
    const enc = searchParams.get("enclosure");
    const sub = searchParams.get("substrate");
    const heat = searchParams.get("heating");
    const uvb = searchParams.get("uvb");
    const humidity = searchParams.get("humidity");
    const hides = searchParams.get("hides");
    const water = searchParams.get("water");
    const monitoring = searchParams.get("monitoring");
    if (exp || enc || sub || heat || uvb || humidity || hides || water || monitoring) {
      if (exp) setExperience(exp);
      if (enc) setEnclosureId(enc);
      if (sub) setSubstrateId(sub);
      if (heat) setHeatingIds(heat.split(",").filter(Boolean));
      if (uvb) setUvbId(uvb);
      if (humidity) setHumidityIds(humidity.split(",").filter(Boolean));
      if (hides) setHideIds(hides.split(",").filter(Boolean));
      if (water) setWaterIds(water.split(",").filter(Boolean));
      if (monitoring) setMonitoringIds(monitoring.split(",").filter(Boolean));
      setStateRestored(true);
    }
  }, [searchParams, stateRestored]);

  const hasThermostat = heatingIds.includes("thermostat");
  const hasPrimaryHeat = heatingIds.some((id) => PRIMARY_HEAT_IDS.has(id));
  const hasHeatMat = heatingIds.includes("heat-mat");
  const heatMatAsPrimary = hasHeatMat && !hasPrimaryHeat;
  const isUndersizedAdult = enclosureId === "40gal" && experience === "experienced";
  const hasRequiredHides = REQUIRED_HIDE_IDS.every((id) => hideIds.includes(id));
  const hasHumidityCore =
    humidityIds.includes("sphagnum-moss") &&
    humidityIds.includes("hygrometer") &&
    (humidityIds.includes("pressure-sprayer") || humidityIds.includes("auto-mister"));
  const hasWaterBowl = waterIds.includes("large-water-bowl");
  const hasTempGun = monitoringIds.includes("temp-gun");

  const selectedEnclosure = ENCLOSURES.find((e) => e.id === enclosureId);
  const selectedSubstrate = safeSubstrates.find((s) => s.id === substrateId);
  const selectedHeating = HEATING.filter((h) => heatingIds.includes(h.id));
  const selectedUvb = UVB.find((u) => u.id === uvbId);
  const selectedHumidity = HUMIDITY.filter((h) => humidityIds.includes(h.id));
  const selectedHides = HIDES.filter((h) => hideIds.includes(h.id));
  const selectedWater = WATER.filter((w) => waterIds.includes(w.id));
  const selectedMonitoring = MONITORING.filter((m) => monitoringIds.includes(m.id));

  const allSelectedItems = useMemo(() => [
    selectedEnclosure,
    selectedSubstrate,
    ...selectedHeating,
    selectedUvb,
    ...selectedHumidity,
    ...selectedHides,
    ...selectedWater,
    ...selectedMonitoring,
  ].filter(Boolean), [selectedEnclosure, selectedSubstrate, selectedHeating, selectedUvb, selectedHumidity, selectedHides, selectedWater, selectedMonitoring]);

  const totalPrice = allSelectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const sectionCompletion = useMemo(() => ({
    experience: !!experience,
    enclosure: !!enclosureId,
    heating: hasThermostat && hasPrimaryHeat,
    uvb: !!uvbId,
    substrate: !!substrateId,
    humidity: hasHumidityCore,
    hides: hasRequiredHides,
    water: hasWaterBowl && hasTempGun,
  }), [experience, enclosureId, hasThermostat, hasPrimaryHeat, uvbId, substrateId, hasHumidityCore, hasRequiredHides, hasWaterBowl, hasTempGun]);

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
    hides: !sectionCompletion.humidity,
    water: !sectionCompletion.hides,
  }), [experience, sectionCompletion]);

  const allRequirementsMet =
    Object.values(sectionCompletion).every(Boolean) && hasThermostat;

  const { toast, setToast } = useBuilderToasts({
    sectionCompletion,
    progress,
    labelMap: {
      experience: "Keeper level set",
      enclosure: "Enclosure selected",
      heating: "Heating ready",
      uvb: "UVB selected",
      substrate: "Substrate chosen",
      humidity: "Humidity tools added",
      hides: "Essential hides added",
      water: "Water & monitoring added",
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
    setHumidityIds([]);
    setHideIds([]);
    setWaterIds([]);
    setMonitoringIds([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildParams = () => new URLSearchParams({
    exp: experience || "beginner",
    enclosure: enclosureId || "",
    substrate: substrateId || "",
    heating: heatingIds.join(","),
    uvb: uvbId || "",
    humidity: humidityIds.join(","),
    hides: hideIds.join(","),
    water: waterIds.join(","),
    monitoring: monitoringIds.join(","),
  });

  const copyBuildLink = () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/build/ball-python?${buildParams().toString()}` : "";
    if (url && navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopyLinkSuccess(true);
        setTimeout(() => setCopyLinkSuccess(false), 2500);
      });
    }
  };

  function goToSummary() {
    if (!allRequirementsMet || !hasThermostat) return;
    analytics.trackBuilderComplete("ball-python", totalPrice, allSelectedItems.length);
    router.push(`/summary/ball-python?${buildParams().toString()}`);
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
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Ball Python <span className="text-emerald-500">Configurator</span></h1>
        <p className="text-slate-400 text-sm mb-6">4×2×2 minimum for adults, overhead heat + thermostat, humidity, and three hides. We enforce the essentials.</p>

        <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50">
          <h2 className="text-lg sm:text-xl font-black text-white mb-2">Ball Python Habitat Builder</h2>
          <ul className="grid gap-2 text-sm text-slate-200 mb-4">
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 4x2x2 minimum enclosure for adults (48&quot;L x 24&quot;W x 24&quot;H)</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Thermostat required on ALL heat sources (probe inside warm hide)</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 3 hides required: warm (90-95°F), cool, and humid</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 60-80% ambient humidity + humid hide with sphagnum moss</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 4&quot; minimum substrate depth</li>
            <li className="flex gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Large soaking water bowl always available</li>
          </ul>
          <button onClick={() => scrollToSection("experience")} className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-600 to-emerald-500 text-white border border-emerald-400/30 touch-manipulation">
            Start Builder →
          </button>
        </div>

        <div className="space-y-10">
          <Section title="1. Keeper Level" icon={<Target />} sectionId="experience" isCompleted={sectionCompletion.experience} sectionRef={(el) => { if (el) sectionRefs.current.experience = el; }} nextSectionId="enclosure" nextSectionTitle="Enclosure Size" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button onClick={() => setExperience("beginner")} className={`min-h-[44px] p-4 rounded-2xl border text-left touch-manipulation ${experience === "beginner" ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50"}`}>
                <p className="font-bold text-white">Beginner</p>
                <p className="text-xs text-slate-400 mt-1">Guided setup with safety checks</p>
              </button>
              <button onClick={() => setExperience("experienced")} className={`min-h-[44px] p-4 rounded-2xl border text-left touch-manipulation ${experience === "experienced" ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700/50 bg-slate-900/40 hover:border-emerald-500/50"}`}>
                <p className="font-bold text-white">Experienced</p>
                <p className="text-xs text-slate-400 mt-1">Adult keeper — 4x2x2 minimum</p>
              </button>
            </div>
          </Section>

          <Section title="2. Enclosure Size" icon={<Box />} description="ReptiFiles adult minimum is 4×2×2 (48&quot;L x 24&quot;W x 24&quot;H). 40 gallon is juvenile-only." sectionId="enclosure" isCompleted={sectionCompletion.enclosure} isLocked={isSectionLocked.enclosure} sectionRef={(el) => { if (el) sectionRefs.current.enclosure = el; }} nextSectionId="heating" nextSectionTitle="Heating & Control" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {isUndersizedAdult && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-100 font-medium">40 gallon is below the ReptiFiles minimum for adult ball pythons. We recommend at least a 4x2x2.</p>
              </div>
            )}
            {enclosureId === "40gal" && experience === "beginner" && (
              <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-100 text-sm">
                40 gallon is juvenile-only. Adults need a 4x2x2 (120 gallon / 48&quot;L x 24&quot;W x 24&quot;H).
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ENCLOSURES.map((e) => (
                <OptionCard key={e.id} item={e} active={enclosureId === e.id} onClick={() => { setEnclosureId(enclosureId === e.id ? null : e.id); setToast({ title: "Added", msg: `+ $${(e.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="3. Heating & Control" icon={<Thermometer />} description="Overhead heat plus a thermostat. Probe goes inside the warm hide at snake level." sectionId="heating" isCompleted={sectionCompletion.heating} isLocked={isSectionLocked.heating} sectionRef={(el) => { if (el) sectionRefs.current.heating = el; }} nextSectionId="uvb" nextSectionTitle="UVB Lighting" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {heatMatAsPrimary && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-100 font-medium">Heat mats are supplemental only in adult enclosures. Add a primary overhead heat source.</p>
              </div>
            )}
            {(!hasThermostat || !hasPrimaryHeat) && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-amber-400 shrink-0" />
                <p className="text-amber-100 font-medium">A primary overhead heat source and thermostat are required.</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HEATING.map((h) => (
                <OptionCard key={h.id} item={h} active={heatingIds.includes(h.id)} onClick={() => { setHeatingIds(toggle(heatingIds, h.id)); setToast({ title: "Added", msg: `+ $${(h.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="4. UVB Lighting" icon={<Sun />} description="ReptiFiles recommends T5 HO 6% UVB spanning the warm half of the enclosure." sectionId="uvb" isCompleted={sectionCompletion.uvb} isLocked={isSectionLocked.uvb} sectionRef={(el) => { if (el) sectionRefs.current.uvb = el; }} nextSectionId="substrate" nextSectionTitle="Substrate" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {uvbId === "no-uvb" && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                Ball pythons can survive without UVB but ReptiFiles strongly recommends it for optimal welfare.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UVB.map((u) => (
                <OptionCard key={u.id} item={u} active={uvbId === u.id} onClick={() => { setUvbId(uvbId === u.id ? null : u.id); setToast({ title: "Added", msg: u.price != null ? `+ $${u.price.toFixed(2)}` : "Selected" }); }} />
              ))}
            </div>
          </Section>

          <Section title="5. Substrate" icon={<Layers />} description="4&quot; minimum depth for humidity retention. Cedar, pine, and reptile carpet are blocked." sectionId="substrate" isCompleted={sectionCompletion.substrate} isLocked={isSectionLocked.substrate} sectionRef={(el) => { if (el) sectionRefs.current.substrate = el; }} nextSectionId="humidity" nextSectionTitle="Humidity Tools" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {safeSubstrates.map((s) => (
                <OptionCard key={s.id} item={s} active={substrateId === s.id} onClick={() => { setSubstrateId(substrateId === s.id ? null : s.id); setToast({ title: "Added", msg: `+ $${(s.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="6. Humidity Tools" icon={<Droplets />} description="Target 60-80% ambient humidity and 80-100% in the humid hide." sectionId="humidity" isCompleted={sectionCompletion.humidity} isLocked={isSectionLocked.humidity} sectionRef={(el) => { if (el) sectionRefs.current.humidity = el; }} nextSectionId="hides" nextSectionTitle="Hides" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {!hasHumidityCore && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                Add sphagnum moss, a hygrometer, and a sprayer or automatic mister.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HUMIDITY.map((h) => (
                <OptionCard key={h.id} item={h} active={humidityIds.includes(h.id)} onClick={() => { setHumidityIds(toggle(humidityIds, h.id)); setToast({ title: "Added", msg: `+ $${(h.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="7. Hides" icon={<HomeIcon />} description="Warm hide 90-95°F, cool hide 75-80°F, and a humid hide lined with sphagnum moss." sectionId="hides" isCompleted={sectionCompletion.hides} isLocked={isSectionLocked.hides} sectionRef={(el) => { if (el) sectionRefs.current.hides = el; }} nextSectionId="water" nextSectionTitle="Water & Monitoring" isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {!hasRequiredHides && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                Warm, cool, and humid hides are all required.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIDES.map((h) => (
                <OptionCard key={h.id} item={h} active={hideIds.includes(h.id)} onClick={() => { setHideIds(toggle(hideIds, h.id)); setToast({ title: "Added", msg: `+ $${(h.price || 0).toFixed(2)}` }); }} />
              ))}
            </div>
          </Section>

          <Section title="8. Water & Monitoring" icon={<Zap />} description="Large soaking bowl plus an infrared temp gun. Warm hide 90-95°F, cool side 75-80°F." sectionId="water" isCompleted={sectionCompletion.water} isLocked={isSectionLocked.water} sectionRef={(el) => { if (el) sectionRefs.current.water = el; }} isSectionLocked={isSectionLocked} scrollToSection={scrollToSection} theme="emerald">
            {(!hasWaterBowl || !hasTempGun) && (
              <div className="mb-4 p-4 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-100 text-sm">
                A soaking water bowl and temperature gun are required.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...WATER, ...MONITORING].map((item) => {
                const isWater = WATER.some((w) => w.id === item.id);
                const selected = isWater ? waterIds.includes(item.id) : monitoringIds.includes(item.id);
                return (
                  <OptionCard
                    key={item.id}
                    item={item}
                    active={selected}
                    onClick={() => {
                      if (isWater) setWaterIds(toggle(waterIds, item.id));
                      else setMonitoringIds(toggle(monitoringIds, item.id));
                      setToast({ title: "Added", msg: `+ $${(item.price || 0).toFixed(2)}` });
                    }}
                  />
                );
              })}
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
              {!hasThermostat
                ? "A thermostat is required before you can generate a summary."
                : "Complete all required sections (enclosure, overhead heat + thermostat, UVB, substrate, humidity tools, 3 hides, water bowl, and temp gun) to generate your build."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
