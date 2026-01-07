"use client";

import Link from "next/link";
import { 
  AlertTriangle, 
  XCircle, 
  ShieldAlert,
  ArrowLeft,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { analytics } from "../utils/analytics";

export default function CommonMistakesPage() {
  const mistakes = [
    {
      category: "Leopard Gecko",
      color: "emerald",
      items: [
        {
          mistake: "Using Heat Rocks",
          severity: "CRITICAL",
          description: "Heat rocks can reach temperatures over 120°F and cause severe burns, even with thermostats. Geckos cannot sense heat from below and will sit on them until injured.",
          why: "Leopard geckos evolved to sense heat from above (the sun), not below. Heat rocks can cause third-degree burns in minutes.",
          solution: "Use overhead heating (halogen bulbs or deep heat projectors) with a thermostat. This mimics natural basking behavior.",
          research: "Reptile burns are a leading cause of veterinary visits. Heat rocks are responsible for the majority of these cases.",
          link: "/build/leopard-gecko"
        },
        {
          mistake: "10-Gallon Tanks",
          severity: "CRITICAL",
          description: "10-gallon tanks are too small for adult leopard geckos. They cause chronic stress, prevent proper thermoregulation, and lead to health issues.",
          why: "Leopard geckos need space to thermoregulate (move between hot and cool areas). A 10-gallon tank is only 20\" x 10\" - barely enough room for one hide, let alone three.",
          solution: "Minimum 20 gallons (30\" x 12\" x 12\"), but 40 gallons (36\" x 18\" x 18\") is recommended for optimal welfare.",
          research: "Studies show that reptiles in undersized enclosures exhibit increased stress hormones and reduced activity levels.",
          link: "/build/leopard-gecko"
        },
        {
          mistake: "Calcium Sand Substrate",
          severity: "HIGH",
          description: "Calcium sand causes impaction (intestinal blockage) when ingested. It clumps when wet and cannot pass through the digestive system.",
          why: "Geckos may intentionally or accidentally ingest substrate while hunting. Calcium sand is marketed as 'digestible' but it's not - it hardens in the gut.",
          solution: "Use safe substrates: paper towels (easiest), tile, or properly prepared loose substrates (not calcium sand).",
          research: "Impaction from calcium sand is a common cause of death in leopard geckos. Veterinary case studies document this repeatedly.",
          link: "/build/leopard-gecko"
        },
        {
          mistake: "No Thermostat",
          severity: "CRITICAL",
          description: "Unregulated heat sources can reach dangerous temperatures, causing burns or overheating. Every heat source MUST be connected to a thermostat.",
          why: "Heat bulbs can exceed 150°F without regulation. A thermostat prevents temperatures from rising above your set point, protecting your gecko.",
          solution: "Always use a thermostat with any heat source. It's not optional - it's essential safety equipment.",
          research: "Unregulated heating is the #1 cause of reptile burns and heat stress in captivity.",
          link: "/build/leopard-gecko"
        },
        {
          mistake: "Only One Hide",
          severity: "MEDIUM",
          description: "Leopard geckos need three hides: hot, cool, and moist. A single hide prevents proper thermoregulation and causes stress.",
          why: "Geckos need to move between temperature zones throughout the day. Without options, they can't regulate their body temperature properly.",
          solution: "Provide three hides: one on the hot side, one on the cool side, and one moist hide (with damp substrate) for shedding.",
          research: "Proper thermoregulation is essential for digestion, immune function, and overall health in reptiles.",
          link: "/build/leopard-gecko"
        }
      ]
    },
    {
      category: "Betta Fish",
      color: "blue",
      items: [
        {
          mistake: "Bowls or Tanks Under 5 Gallons",
          severity: "CRITICAL",
          description: "Bowls and tiny tanks cause severe stress, ammonia poisoning, and premature death. Betta fish need space to swim and proper filtration.",
          why: "Small volumes of water become toxic quickly. Ammonia from waste builds up faster than it can be processed, poisoning the fish. Additionally, bettas are active fish that need space to explore.",
          solution: "Minimum 5 gallons, but 10+ gallons is recommended. Larger tanks are more stable and provide better welfare.",
          research: "Research shows bettas in larger, furnished tanks are more active and exhibit fewer abnormal behaviors compared to those in small bowls.",
          link: "/build/betta"
        },
        {
          mistake: "No Filter",
          severity: "CRITICAL",
          description: "Without a filter, ammonia from fish waste builds up and poisons the water. This is the #1 cause of betta death.",
          why: "Fish produce ammonia constantly through their gills and waste. In an unfiltered tank, ammonia levels rise daily until they become lethal (usually within days).",
          solution: "A filter is REQUIRED. It houses beneficial bacteria that convert toxic ammonia into less harmful nitrates. The tank must be cycled (2-4 weeks) before adding fish.",
          research: "Ammonia toxicity is the leading cause of death in aquarium fish. Proper filtration and cycling are non-negotiable.",
          link: "/build/betta"
        },
        {
          mistake: "No Heater",
          severity: "CRITICAL",
          description: "Bettas are tropical fish from 78-80°F waters. Room temperature (68-72°F) is too cold and suppresses their immune system, leading to disease.",
          why: "Cold water slows metabolism, weakens the immune system, and makes bettas susceptible to diseases like ich and fin rot. They become lethargic and stop eating.",
          solution: "A heater is REQUIRED. Set it to 78-80°F and use a thermometer to verify. Bettas cannot thrive in cold water.",
          research: "Tropical fish kept below their optimal temperature range show increased disease susceptibility and reduced lifespan.",
          link: "/build/betta"
        },
        {
          mistake: "Plastic Plants",
          severity: "MEDIUM",
          description: "Plastic plants have sharp edges that tear betta fins. Torn fins are entry points for infection and can lead to fin rot.",
          why: "Betta fins are delicate and flowy. Sharp plastic edges catch and tear them. Once torn, bacteria can enter and cause fin rot.",
          solution: "Use silk plants (soft fabric) or live plants. Both are safe for delicate fins and provide additional benefits (live plants help with water quality).",
          research: "Fin damage from sharp decor is a common cause of secondary infections in betta fish.",
          link: "/build/betta"
        },
        {
          mistake: "Adding Fish Before Cycling",
          severity: "CRITICAL",
          description: "Adding a betta to an uncycled tank exposes them to toxic ammonia and nitrite. This is called 'fish-in cycling' and is cruel.",
          why: "A new tank has no beneficial bacteria to process waste. Ammonia spikes within days, burning the fish's gills and causing death.",
          solution: "Cycle the tank for 2-4 weeks BEFORE adding fish. Use a test kit to verify ammonia and nitrite are 0 before introducing your betta.",
          research: "The nitrogen cycle is essential for aquarium health. Fish-in cycling causes unnecessary suffering and death.",
          link: "/build/betta"
        },
        {
          mistake: "Overfeeding",
          severity: "MEDIUM",
          description: "Overfeeding pollutes the water with uneaten food and causes constipation. Bettas have small stomachs and only need 2-3 pellets per day.",
          why: "Uneaten food decays and releases ammonia. Overfeeding also causes bloating and swim bladder issues. Bettas should be fasted one day per week.",
          solution: "Feed 2-3 high-quality pellets once or twice daily. Fast one day per week. Remove uneaten food after 2 minutes.",
          research: "Overfeeding is a leading cause of water quality issues and digestive problems in aquarium fish.",
          link: "/build/betta"
        }
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "CRITICAL": return "text-red-400 bg-red-500/10 border-red-500/30";
      case "HIGH": return "text-orange-400 bg-orange-500/10 border-orange-500/30";
      case "MEDIUM": return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      default: return "text-slate-400 bg-slate-500/10 border-slate-500/30";
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-sm mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
            Safety First
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            Common <span className="text-red-400">Mistakes</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Learn what NOT to do. These mistakes cause injury, illness, and death. Our builder prevents all of these.
          </p>
        </div>

        {/* Intro Warning */}
        <div className="mb-12 p-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-4">
          <ShieldAlert className="text-red-400 shrink-0 mt-1" size={32} />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Why This Matters</h3>
            <p className="text-slate-300 leading-relaxed">
              These aren't minor issues - they're life-threatening mistakes that cause suffering and death. 
              Our builder automatically blocks dangerous configurations, but understanding WHY helps you make better decisions 
              and recognize when products or advice are unsafe.
            </p>
          </div>
        </div>

        {/* Mistakes by Category */}
        {mistakes.map((category, catIndex) => (
          <div key={catIndex} className="mb-16">
            <h2 className={`text-3xl font-black text-${category.color}-400 mb-8 flex items-center gap-3`}>
              <span>{category.category === "Leopard Gecko" ? "🦎" : "🐟"}</span>
              {category.category}
            </h2>

            <div className="space-y-6">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <XCircle className="text-red-400" size={24} />
                        <h3 className="text-2xl font-bold text-white">{item.mistake}</h3>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(item.severity)}`}>
                        {item.severity} RISK
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-slate-200 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Why It's Dangerous */}
                  <div className="mb-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                      <AlertTriangle size={18} />
                      Why This Is Dangerous
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{item.why}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      Safe Solution
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{item.solution}</p>
                  </div>

                  {/* Research Note */}
                  <div className="mb-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                      <ExternalLink size={18} />
                      Research-Backed
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-sm">{item.research}</p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={item.link}
                    onClick={() => analytics.trackNavClick("builder")}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                      category.color === "emerald"
                        ? "bg-emerald-600 hover:bg-emerald-500"
                        : "bg-blue-600 hover:bg-blue-500"
                    }`}
                  >
                    Build Safe {category.category} Setup
                    <ExternalLink size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Our Builder Prevents All of These
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            You literally cannot build an unsafe habitat using our tool. We block dangerous products, 
            enforce minimum requirements, and guide you to safe, research-backed configurations.
          </p>
          <Link
            href="/"
            onClick={() => analytics.trackNavClick("builder")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            Start Building Safely
          </Link>
        </div>
      </div>
    </main>
  );
}

