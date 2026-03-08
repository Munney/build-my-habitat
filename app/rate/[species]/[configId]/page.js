"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, ArrowLeft, AlertCircle, Share2 } from "lucide-react";
import bettaConfig from "../../../../data/betta.json";
import leopardGeckoConfig from "../../../../data/leopard-gecko.json";
import { decodeSlugToParams } from "../../../utils/ratePayload";
import { getConfigIdFromSearchParams } from "../../../utils/amazonCart";
import {
  calculateBettaHabitatScore,
  calculateGeckoHabitatScore,
} from "../../../utils/habitatScore";

const SPECIES_CONFIG = {
  betta: { config: bettaConfig, scoreFn: calculateBettaHabitatScore, name: "Betta", accent: "blue" },
  "leopard-gecko": {
    config: leopardGeckoConfig,
    scoreFn: calculateGeckoHabitatScore,
    name: "Leopard Gecko",
    accent: "emerald",
  },
};

function buildSelectionsFromParams(species, params) {
  const config = SPECIES_CONFIG[species]?.config;
  if (!config || !params) return null;

  const get = (key, list) => {
    const raw = params[key];
    if (!raw) return [];
    const ids = String(raw).split(",").map((s) => s.trim()).filter(Boolean);
    return (list || []).filter((item) => ids.includes(item.id));
  };

  if (species === "betta") {
    const enclosure = config.enclosures?.find((e) => e.id === params.enclosure);
    const filtration = config.filtration?.find((f) => f.id === params.filtration);
    const substrate = config.substrates?.find((s) => s.id === params.substrate);
    const heating = get("heating", config.heating);
    const decor = get("decor", config.decor);
    const care = get("care", config.watercare);
    return { enclosure, filtration, substrate, heating, decor, care };
  }

  if (species === "leopard-gecko") {
    const enclosure = config.enclosures?.find((e) => e.id === params.enclosure);
    const substrate = config.substrates?.find((s) => s.id === params.substrate);
    const heating = get("heating", config.heating);
    const hides = get("hides", config.hides);
    const supplements = get("supplements", config.supplements);
    return { enclosure, substrate, heating, hides, supplements };
  }

  return null;
}

function getBuildSummaryItems(species, selections) {
  if (!selections) return [];
  if (species === "betta") {
    const items = [
      selections.enclosure?.label && { label: "Enclosure", value: selections.enclosure.label },
      selections.filtration?.label && { label: "Filtration", value: selections.filtration.label },
      selections.substrate?.label && { label: "Substrate", value: selections.substrate.label },
      selections.heating?.length && {
        label: "Heating",
        value: selections.heating.map((h) => h?.label).filter(Boolean).join(", "),
      },
      selections.decor?.length && {
        label: "Decor",
        value: selections.decor.map((d) => d?.label).filter(Boolean).join(", "),
      },
      selections.care?.length && {
        label: "Water care",
        value: selections.care.map((c) => c?.label).filter(Boolean).join(", "),
      },
    ];
    return items.filter(Boolean);
  }
  if (species === "leopard-gecko") {
    const items = [
      selections.enclosure?.label && { label: "Enclosure", value: selections.enclosure.label },
      selections.substrate?.label && { label: "Substrate", value: selections.substrate.label },
      selections.heating?.length && {
        label: "Heating & lighting",
        value: selections.heating.map((h) => h?.label).filter(Boolean).join(", "),
      },
      selections.hides?.length && {
        label: "Hides",
        value: selections.hides.map((h) => h?.label).filter(Boolean).join(", "),
      },
      selections.supplements?.length && {
        label: "Supplements",
        value: selections.supplements.map((s) => s?.label).filter(Boolean).join(", "),
      },
    ];
    return items.filter(Boolean);
  }
  return [];
}

function getChecklistKeys(species) {
  if (species === "betta") {
    return [
      { key: "tank", label: "Tank size" },
      { key: "heating", label: "Temperature control" },
      { key: "filtration", label: "Filtration" },
      { key: "enrichment", label: "Enrichment" },
      { key: "watercare", label: "Water care" },
    ];
  }
  if (species === "leopard-gecko") {
    return [
      { key: "enclosure", label: "Enclosure size" },
      { key: "heating", label: "Temperature control" },
      { key: "substrate", label: "Substrate" },
      { key: "hides", label: "Essential hides" },
      { key: "supplements", label: "Supplements" },
    ];
  }
  return [];
}

export default function RateHabitatPage() {
  const params = useParams();
  const species = params?.species;
  const configIdSlug = params?.configId;
  const [linkCopied, setLinkCopied] = useState(false);

  const { valid, selections, scoreResult, displayConfigId, buildSummary, checklistKeys, summaryQuery } =
    useMemo(() => {
      const meta = SPECIES_CONFIG[species];
      if (!meta || !configIdSlug) {
        return { valid: false, selections: null, scoreResult: null, displayConfigId: null, buildSummary: [], checklistKeys: [], summaryQuery: "" };
      }

      const decoded = decodeSlugToParams(configIdSlug);
      if (!decoded) {
        return { valid: false, selections: null, scoreResult: null, displayConfigId: null, buildSummary: [], checklistKeys: [], summaryQuery: "" };
      }

      const selections = buildSelectionsFromParams(species, decoded);
      if (!selections) {
        return { valid: false, selections: null, scoreResult: null, displayConfigId: null, buildSummary: [], checklistKeys: [], summaryQuery: "" };
      }

      const searchParams = new URLSearchParams(decoded);
      const displayConfigId = getConfigIdFromSearchParams(searchParams);
      const scoreResult = meta.scoreFn(selections);
      const buildSummary = getBuildSummaryItems(species, selections);
      const checklistKeys = getChecklistKeys(species);
      const summaryQuery = new URLSearchParams(decoded).toString();

      return {
        valid: true,
        selections,
        scoreResult,
        displayConfigId,
        buildSummary,
        checklistKeys,
        summaryQuery,
      };
    }, [species, configIdSlug]);

  const accent = SPECIES_CONFIG[species]?.accent ?? "emerald";
  const speciesName = SPECIES_CONFIG[species]?.name ?? "Habitat";

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    } catch {
      // fallback: copy not supported
    }
  };

  if (!valid) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-6 bg-[#020617]">
        <div className="max-w-lg mx-auto text-center">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10">
            <AlertCircle className="mx-auto text-amber-400 mb-4" size={48} />
            <h1 className="text-xl font-bold text-white mb-2">Invalid or expired link</h1>
            <p className="text-slate-400 text-sm mb-6">
              This score link doesn&apos;t match a valid build. Create a build in the builder and use &quot;Share your score&quot; to get a new link.
            </p>
            <Link
              href={species === "leopard-gecko" ? "/build/leopard-gecko" : "/build/betta"}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 text-white px-5 py-3 font-bold hover:bg-white/15 transition"
            >
              <ArrowLeft size={18} /> Back to builder
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const failedChecks = scoreResult.checks.filter((c) => !c.passed);
  const passedChecks = scoreResult.checks.filter((c) => c.passed);

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 bg-[#020617]">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back + Config ID */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={species === "leopard-gecko" ? "/build/leopard-gecko" : "/build/betta"}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold uppercase tracking-wider transition"
          >
            <ArrowLeft size={16} /> Back to builder
          </Link>
          {displayConfigId != null && (
            <span className="text-slate-500 font-mono text-sm">
              Config #{displayConfigId}
            </span>
          )}
        </div>

        {/* Title */}
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Rate My {speciesName} Habitat
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Public scorecard — share with communities
          </p>
        </header>

        {/* Score card */}
        <section
          className={`rounded-3xl border-2 p-6 text-center ${
            accent === "blue"
              ? "bg-blue-500/10 border-blue-400/40 shadow-lg shadow-blue-900/20"
              : "bg-emerald-500/10 border-emerald-400/40 shadow-lg shadow-emerald-900/20"
          }`}
        >
          <p
            className={`text-[11px] uppercase tracking-[0.2em] font-black mb-2 ${
              accent === "blue" ? "text-blue-200" : "text-emerald-200"
            }`}
          >
            Habitat Score
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-black text-white tracking-tight">
              {scoreResult.score}
            </span>
            <span className="text-slate-300 font-bold text-xl">
              / {scoreResult.maxScore}
            </span>
          </div>
          <p className="text-sm font-black uppercase tracking-widest text-emerald-300 mt-1">
            {scoreResult.label}
          </p>

          {/* Checklist */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left text-sm">
            {checklistKeys.map((row) => {
              const check = scoreResult.checks.find((c) => c.key === row.key);
              const passed = !!check?.passed;
              return (
                <div key={row.key} className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2
                    size={18}
                    className={
                      passed ? "text-emerald-400 shrink-0" : "text-amber-400 shrink-0"
                    }
                  />
                  <span className={passed ? "font-bold" : "font-bold text-amber-100"}>
                    {row.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Build summary */}
        <section className="rounded-3xl bg-slate-900/80 border border-white/10 p-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
            Build summary
          </h2>
          <ul className="space-y-3">
            {buildSummary.map((item, i) => (
              <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 text-sm">
                <span className="text-slate-400 shrink-0">{item.label}</span>
                <span className="text-slate-200 font-medium text-right break-words min-w-0">{item.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ways to improve */}
        {(failedChecks.length > 0 ||
          (scoreResult.missingEssentials?.length > 0) ||
          (scoreResult.warnings?.length > 0)) && (
          <section className="rounded-3xl bg-slate-900/80 border border-amber-500/20 p-6">
            <h2 className="text-sm font-bold text-amber-200 uppercase tracking-wide mb-4">
              Ways to improve this habitat
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {failedChecks.map((c) => (
                <li key={c.key} className="flex gap-2">
                  <span className="text-amber-400 shrink-0">•</span>
                  <span>{c.message}</span>
                </li>
              ))}
              {scoreResult.missingEssentials?.map((msg, i) => (
                <li key={`m-${i}`} className="flex gap-2">
                  <span className="text-amber-400 shrink-0">•</span>
                  <span>Add: {msg}</span>
                </li>
              ))}
              {scoreResult.warnings?.map((msg, i) => (
                <li key={`w-${i}`} className="flex gap-2">
                  <span className="text-slate-500 shrink-0">•</span>
                  <span>{msg}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Share */}
        <section className="flex flex-col sm:flex-row gap-3 justify-center items-center px-2">
          <button
            type="button"
            onClick={handleShare}
            className={`inline-flex items-center gap-2 rounded-xl font-bold px-6 py-4 transition ${
              accent === "blue"
                ? "bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-400/30"
                : "bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-400/30"
            }`}
          >
            {linkCopied ? (
              <>
                <CheckCircle2 size={20} /> Copied!
              </>
            ) : (
              <>
                <Share2 size={20} /> Share build
              </>
            )}
          </button>
          <Link
            href={
              (species === "leopard-gecko" ? "/summary/leopard-gecko" : "/summary/betta") +
              (summaryQuery ? `?${summaryQuery}` : "")
            }
            className="text-slate-400 hover:text-white text-sm font-bold"
          >
            View full summary &amp; cart →
          </Link>
        </section>

        <p className="text-center text-xs text-slate-500">
          BuildMyHabitat — research-backed habitat scoring
        </p>
      </div>
    </main>
  );
}
