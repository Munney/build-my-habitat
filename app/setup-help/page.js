"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "../components/Footer";
import { analytics } from "../utils/analytics";

function SetupHelpCard({ href, title, description, analyticsKey }) {
  return (
    <Link
      href={href}
      onClick={() => analytics.trackNavClick(analyticsKey)}
      className="group p-4 rounded-lg card-warm hover:bg-slate-800/60 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
        <ArrowUpRight className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" size={18} />
      </div>
    </Link>
  );
}

function SpeciesCTA({ href, text, analyticsKey, className }) {
  return (
    <Link
      href={href}
      onClick={() => analytics.trackNavClick(analyticsKey)}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3 font-bold rounded-full transition-all ${className}`}
    >
      {text} <ArrowRight size={18} />
    </Link>
  );
}

export default function SetupHelpHubPage() {
  return (
    <>
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            onClick={() => analytics.trackNavClick("setup-help-back-home")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium mb-10 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Hub
          </Link>

          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Setup Help by Species
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Step-by-step habitat setup guides for reptiles and fish—organized by species so you can find the exact help you need faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                onClick={() => analytics.trackNavClick("setup-help-cta-start-builder")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full transition-all w-full sm:w-auto"
              >
                Start a Habitat Builder <ArrowRight size={18} />
              </Link>
              <Link
                href="/research"
                onClick={() => analytics.trackNavClick("setup-help-cta-browse-research")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-slate-900/60 hover:bg-slate-900/80 border border-white/10 text-white font-bold rounded-full transition-all w-full sm:w-auto"
              >
                Browse Research <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="w-full mb-10 p-6 rounded-2xl bg-slate-900/40 border border-white/10 card-warm">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-0">
              If you are a beginner, start with your species section below and follow the guides in order. The guides explain the rules; the builder turns them into a compatible shopping list and blocks unsafe combinations.
            </p>
          </div>

          {/* Leopard Gecko */}
          <section className="mb-14">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-white mb-2">Leopard Gecko Setup Help</h2>
              <p className="text-sm text-slate-400">Substrate, heating, and enclosure setup for leopard geckos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <SetupHelpCard
                href="/guides/leopard-gecko-setup"
                title="Leopard Gecko Setup Guide"
                description="The complete setup baseline and essentials"
                analyticsKey="setup-help-leopard-gecko-setup"
              />
              <SetupHelpCard
                href="/guides/leopard-gecko-substrate"
                title="Leopard Gecko Substrate Guide"
                description="Safe vs dangerous substrate options"
                analyticsKey="setup-help-leopard-gecko-substrate"
              />
              <SetupHelpCard
                href="/guides/leopard-gecko-substrate-mix"
                title="Leopard Gecko Substrate Mix"
                description="Topsoil and playsand mix rules"
                analyticsKey="setup-help-leopard-gecko-substrate-mix"
              />
              <SetupHelpCard
                href="/guides/leopard-gecko-sand-safe"
                title="Leopard Gecko Sand Safety Guide"
                description="Impaction myths and what’s actually safe"
                analyticsKey="setup-help-leopard-gecko-sand-safe"
              />
              <SetupHelpCard
                href="/guides/leopard-gecko-heating-guide"
                title="Leopard Gecko Heating Guide"
                description="Warm hide targets and gradient setup"
                analyticsKey="setup-help-leopard-gecko-heating-guide"
              />
              <SetupHelpCard
                href="/guides/leopard-gecko-not-eating"
                title="Leopard Gecko Not Eating?"
                description="Troubleshoot appetite issues safely"
                analyticsKey="setup-help-leopard-gecko-not-eating"
              />
            </div>
            <div className="text-center">
              <SpeciesCTA
                href="/build/leopard-gecko"
                text="Build a Leopard Gecko Habitat"
                analyticsKey="setup-help-cta-build-leopard-gecko"
                className="bg-emerald-600 hover:bg-emerald-500 text-white"
              />
            </div>
          </section>

          {/* Betta */}
          <section className="mb-14">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-white mb-2">Betta Fish Setup Help</h2>
              <p className="text-sm text-slate-400">Heating, tank size, filtration, and water stability for betta fish.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <SetupHelpCard
                href="/guides/betta-setup"
                title="Betta Fish Setup Guide"
                description="Complete tank setup essentials"
                analyticsKey="setup-help-betta-setup"
              />
              <SetupHelpCard
                href="/guides/betta-fish-tank-size"
                title="Betta Fish Tank Size Guide"
                description="Why 5+ gallons matters"
                analyticsKey="setup-help-betta-tank-size"
              />
              <SetupHelpCard
                href="/guides/betta-fish-heater"
                title="Betta Fish Heater Guide"
                description="Heater types, stability rules, and setup"
                analyticsKey="setup-help-betta-heater"
              />
              <SetupHelpCard
                href="/guides/betta-heater-size"
                title="Betta Fish Heater Size Guide"
                description="Wattage by tank volume"
                analyticsKey="setup-help-betta-heater-size"
              />
              <SetupHelpCard
                href="/guides/betta-temperature-guide"
                title="Betta Fish Temperature Guide"
                description="Stable 78–80°F targets and mistakes"
                analyticsKey="setup-help-betta-temperature"
              />
              <SetupHelpCard
                href="/guides/betta-tank-cycling"
                title="Betta Fish Tank Cycling Guide"
                description="Cycle correctly before stocking"
                analyticsKey="setup-help-betta-tank-cycling"
              />
              <SetupHelpCard
                href="/guides/betta-fish-filter"
                title="Betta Fish Filter Guide"
                description="Gentle filtration and low-flow options"
                analyticsKey="setup-help-betta-filter"
              />
            </div>
            <div className="text-center">
              <SpeciesCTA
                href="/build/betta"
                text="Build a Betta Fish Setup"
                analyticsKey="setup-help-cta-build-betta"
                className="bg-blue-600 hover:bg-blue-500 text-white"
              />
            </div>
          </section>

          {/* Bearded Dragon */}
          <section className="mb-6">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-white mb-2">Bearded Dragon Setup Help</h2>
              <p className="text-sm text-slate-400">Lighting, heating, substrate, and full habitat setup for bearded dragons.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <SetupHelpCard
                href="/guides/bearded-dragon-care"
                title="Bearded Dragon Care Guide"
                description="Core care standards and essentials"
                analyticsKey="setup-help-bearded-dragon-care"
              />
              <SetupHelpCard
                href="/guides/bearded-dragon-tank-setup"
                title="Bearded Dragon Tank Setup Guide"
                description="4×2×2 layout and gradient design"
                analyticsKey="setup-help-bearded-dragon-tank-setup"
              />
              <SetupHelpCard
                href="/guides/bearded-dragon-feeding"
                title="Bearded Dragon Feeding Guide"
                description="Diet, insects, greens, and feeding schedules"
                analyticsKey="setup-help-bearded-dragon-feeding"
              />
              <SetupHelpCard
                href="/guides/bearded-dragon-lighting-uvb"
                title="Bearded Dragon Lighting & UVB Guide"
                description="T5 UVB and basking lighting rules"
                analyticsKey="setup-help-bearded-dragon-lighting-uvb"
              />
              <SetupHelpCard
                href="/guides/bearded-dragon-basking-temp"
                title="Bearded Dragon Basking Temperature Guide"
                description="105–110°F surface targets and measurement"
                analyticsKey="setup-help-bearded-dragon-basking-temp"
              />
              <SetupHelpCard
                href="/guides/bearded-dragon-uvb-distance"
                title="Bearded Dragon UVB Distance Guide"
                description="Placement, screen impact, and common mistakes"
                analyticsKey="setup-help-bearded-dragon-uvb-distance"
              />
              <SetupHelpCard
                href="/guides/bearded-dragon-substrate"
                title="Bearded Dragon Substrate Guide"
                description="Safe flooring and what to avoid"
                analyticsKey="setup-help-bearded-dragon-substrate"
              />
              <SetupHelpCard
                href="/guides/bearded-dragon-mistakes"
                title="Bearded Dragon Mistakes Guide"
                description="Bad setups and how to fix them"
                analyticsKey="setup-help-bearded-dragon-mistakes"
              />
            </div>
            <div className="text-center">
              <SpeciesCTA
                href="/build/bearded-dragon"
                text="Build a Bearded Dragon Habitat"
                analyticsKey="setup-help-cta-build-bearded-dragon"
                className="bg-emerald-700 hover:bg-emerald-600 text-white"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
