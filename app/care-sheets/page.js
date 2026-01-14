"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Thermometer, 
  Droplets, 
  Box, 
  Ruler, 
  Sun, 
  Moon,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Download,
  FileText
} from "lucide-react";

export default function CareSheetsPage() {
  const [selectedSpecies, setSelectedSpecies] = useState("leopard-gecko");

  const careData = {
    "leopard-gecko": {
      name: "Leopard Gecko",
      scientificName: "Eublepharis macularius",
      color: "emerald",
      icon: "🦎",
      stats: {
        temperature: {
          basking: "88-92°F (31-33°C)",
          cool: "70-75°F (21-24°C)",
          night: "65-70°F (18-21°C)"
        },
        humidity: "30-40%",
        enclosure: {
          minimum: "20 gallons (30\" x 12\" x 12\")",
          recommended: "40 gallons (36\" x 18\" x 18\")",
          note: "10-gallon tanks are too small and cause stress"
        },
        lifespan: "15-20 years",
        diet: "Live insects (crickets, mealworms, dubia roaches) dusted with calcium + D3"
      },
      essentials: [
        "Thermostat (REQUIRED - prevents burns)",
        "Primary heat source (halogen or DHP)",
        "3 hides (hot, cool, moist)",
        "Safe substrate (paper towels, tile, or loose substrate)",
        "Calcium + D3 supplement",
        "Multivitamin supplement",
        "Water dish",
        "Thermometer/hygrometer"
      ],
      warnings: [
        "Never use heat rocks - they cause severe burns",
        "10-gallon tanks are inadequate - causes stress and health issues",
        "Calcium sand causes impaction - use safe substrates only",
        "UVB is optional but beneficial for D3 synthesis"
      ],
      daily: [
        "Check temperatures (hot, cool, and ambient)",
        "Check humidity levels",
        "Spot clean waste",
        "Ensure water dish is clean and full"
      ],
      weekly: [
        "Feed 3-4 times (juveniles daily)",
        "Dust insects with calcium + D3 (every feeding)",
        "Dust with multivitamin (1-2 times per week)",
        "Deep clean water dish",
        "Check all equipment is functioning"
      ],
      monthly: [
        "Full substrate change (if using loose substrate)",
        "Deep clean entire enclosure",
        "Inspect all hides and decor for damage",
        "Weigh your gecko to track health"
      ]
    },
    "betta": {
      name: "Betta Fish",
      scientificName: "Betta splendens",
      color: "blue",
      icon: "🐟",
      stats: {
        temperature: {
          water: "78-80°F (25-27°C)",
          note: "Room temperature is too cold - heater is REQUIRED"
        },
        ph: "6.5-7.5",
        ammonia: "0 ppm (must be 0)",
        nitrite: "0 ppm (must be 0)",
        nitrate: "< 20 ppm",
        enclosure: {
          minimum: "5 gallons",
          recommended: "10+ gallons",
          note: "Bowls and tanks under 5 gallons are dangerous and cause stress"
        },
        lifespan: "3-5 years",
        diet: "High-quality betta pellets + occasional frozen/live foods"
      },
      essentials: [
        "Heater (REQUIRED - bettas are tropical fish)",
        "Filter (REQUIRED - maintains water quality)",
        "Tank 5+ gallons (bowls are dangerous)",
        "Water conditioner (removes chlorine)",
        "API Freshwater Master Test Kit",
        "Thermometer",
        "Substrate (gravel or sand)",
        "Live or silk plants (plastic can tear fins)",
        "Hiding spots"
      ],
      warnings: [
        "Tanks under 5 gallons cause stress and health issues",
        "No filter = ammonia buildup = death",
        "No heater = too cold = immune system failure",
        "Plastic plants tear delicate fins - use silk or live plants",
        "Must cycle tank 2-4 weeks before adding fish"
      ],
      daily: [
        "Check water temperature",
        "Feed 2-3 pellets (fast 1 day per week)",
        "Observe fish behavior (signs of stress/illness)",
        "Check filter is running"
      ],
      weekly: [
        "Test water parameters (ammonia, nitrite, nitrate, pH)",
        "25% water change",
        "Vacuum substrate",
        "Clean filter media (rinse in tank water only)"
      ],
      monthly: [
        "Deep clean decor",
        "Trim live plants if needed",
        "Check all equipment",
        "Full water parameter test"
      ]
    }
  };

  const currentData = careData[selectedSpecies];

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            Quick Reference
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Care Sheets
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Essential care information at a glance. Print these for quick reference.
          </p>
        </div>

        {/* Species Selector */}
        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={() => setSelectedSpecies("leopard-gecko")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              selectedSpecies === "leopard-gecko"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            🦎 Leopard Gecko
          </button>
          <button
            onClick={() => setSelectedSpecies("betta")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              selectedSpecies === "betta"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            🐟 Betta Fish
          </button>
        </div>

        {/* Care Sheet Content */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {/* Species Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <div className="text-6xl mb-4">{currentData.icon}</div>
            <h2 className="text-4xl font-black text-white mb-2">
              {currentData.name}
            </h2>
            <p className="text-slate-400 italic">{currentData.scientificName}</p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className={`text-${currentData.color}-400`} size={24} />
                <h3 className="text-lg font-bold text-white">Temperature</h3>
              </div>
              {selectedSpecies === "leopard-gecko" ? (
                <ul className="space-y-2 text-slate-300">
                  <li><span className="font-bold">Basking:</span> {currentData.stats.temperature.basking}</li>
                  <li><span className="font-bold">Cool Side:</span> {currentData.stats.temperature.cool}</li>
                  <li><span className="font-bold">Night:</span> {currentData.stats.temperature.night}</li>
                </ul>
              ) : (
                <ul className="space-y-2 text-slate-300">
                  <li><span className="font-bold">Water:</span> {currentData.stats.temperature.water}</li>
                  <li className="text-sm text-amber-400 mt-2">⚠️ {currentData.stats.temperature.note}</li>
                </ul>
              )}
            </div>

            {selectedSpecies === "leopard-gecko" ? (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="text-emerald-400" size={24} />
                  <h3 className="text-lg font-bold text-white">Humidity</h3>
                </div>
                <p className="text-2xl font-bold text-emerald-400">{currentData.stats.humidity}</p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="text-blue-400" size={24} />
                  <h3 className="text-lg font-bold text-white">Water Parameters</h3>
                </div>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><span className="font-bold">pH:</span> {currentData.stats.ph}</li>
                  <li><span className="font-bold">Ammonia:</span> {currentData.stats.ammonia}</li>
                  <li><span className="font-bold">Nitrite:</span> {currentData.stats.nitrite}</li>
                  <li><span className="font-bold">Nitrate:</span> {currentData.stats.nitrate}</li>
                </ul>
              </div>
            )}

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Box className={`text-${currentData.color}-400`} size={24} />
                <h3 className="text-lg font-bold text-white">Enclosure Size</h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li><span className="font-bold">Minimum:</span> {currentData.stats.enclosure.minimum}</li>
                <li><span className="font-bold">Recommended:</span> {currentData.stats.enclosure.recommended}</li>
              </ul>
              <p className="text-sm text-amber-400 mt-3">⚠️ {currentData.stats.enclosure.note}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <FileText className={`text-${currentData.color}-400`} size={24} />
                <h3 className="text-lg font-bold text-white">Quick Facts</h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li><span className="font-bold">Lifespan:</span> {currentData.stats.lifespan}</li>
                <li><span className="font-bold">Diet:</span> {currentData.stats.diet}</li>
              </ul>
            </div>
          </div>

          {/* Essential Equipment */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle2 className={`text-${currentData.color}-400`} size={28} />
              Essential Equipment
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {currentData.essentials.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle2 className={`text-${currentData.color}-400 shrink-0 mt-0.5`} size={18} />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Warnings */}
          <div className="mb-10 p-6 rounded-2xl bg-red-500/10 border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="text-red-400" size={28} />
              Critical Warnings
            </h3>
            <ul className="space-y-3">
              {currentData.warnings.map((warning, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200">
                  <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Care Schedule */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Sun className={`text-${currentData.color}-400`} size={24} />
                <h3 className="text-lg font-bold text-white">Daily</h3>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                {currentData.daily.map((task, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Moon className={`text-${currentData.color}-400`} size={24} />
                <h3 className="text-lg font-bold text-white">Weekly</h3>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                {currentData.weekly.map((task, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Ruler className={`text-${currentData.color}-400`} size={24} />
                <h3 className="text-lg font-bold text-white">Monthly</h3>
              </div>
              <ul className="space-y-2 text-slate-300 text-sm">
                {currentData.monthly.map((task, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-500">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/build/${selectedSpecies}`}
              className={`px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                selectedSpecies === "leopard-gecko"
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              Build {currentData.name} Habitat
            </Link>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Print This Sheet
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

