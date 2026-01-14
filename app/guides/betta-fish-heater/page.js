"use client";

import React from "react";
import Link from "next/link";
import { 
  Thermometer, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight, 
  ArrowLeft,
  HelpCircle,
  ShieldAlert,
  Settings,
  Droplets
} from "lucide-react";
import Footer from "../../components/Footer";
import { FAQSchema } from "../../components/StructuredData";

export default function BettaHeaterPage() {
  const faqs = [
    {
      question: "Do betta fish need a heater?",
      answer: "Yes, betta fish absolutely need a heater. They are tropical fish native to warm waters (78-82°F) and require water temperature between 78-80°F (25.5-26.5°C) at all times. Room temperature water is usually too cold (68-72°F) and causes stress, lethargy, and illness."
    },
    {
      question: "What temperature should a betta fish tank be?",
      answer: "Betta fish need water temperature between 78-80°F (25.5-26.5°C) at all times. This is their optimal temperature range. Temperatures below 75°F cause stress and illness, while temperatures above 82°F can be dangerous. Use an adjustable heater with a thermometer to maintain this range."
    },
    {
      question: "What size heater do I need for a betta fish tank?",
      answer: "Use the '5 watts per gallon' rule. For a 5-gallon tank, use a 25-50W heater. For a 10-gallon tank, use a 50-75W heater. For a 20-gallon tank, use a 100W heater. Always choose an adjustable heater (not pre-set) so you can control the temperature precisely."
    },
    {
      question: "Can betta fish live without a heater?",
      answer: "No, betta fish cannot live without a heater in most homes. Room temperature (68-72°F) is too cold for tropical betta fish. Without a heater, bettas become lethargic, stop eating, and are prone to illness. A heater is essential for betta health and should be considered mandatory equipment."
    },
    {
      question: "What happens if betta fish water is too cold?",
      answer: "If betta fish water is too cold (below 75°F), you'll see: lethargy, loss of appetite, clamped fins, increased susceptibility to illness, slower metabolism, and stress. Cold water suppresses the immune system and can lead to diseases like fin rot and ich. Always maintain 78-80°F."
    },
    {
      question: "Should I use an adjustable or pre-set heater?",
      answer: "Always use an adjustable heater with a temperature dial. Pre-set heaters are unreliable and often don't maintain the correct temperature. An adjustable heater allows you to set the exact temperature (78-80°F) and monitor it with a separate thermometer. This gives you control and accuracy."
    },
    {
      question: "How do I set up a heater for a betta fish tank?",
      answer: "1) Choose the right size (5 watts per gallon), 2) Install the heater fully submerged (never above water line), 3) Position it near water flow (filter outlet) for even heat distribution, 4) Set to 78-80°F, 5) Use a separate thermometer to verify temperature, 6) Wait 24 hours for temperature to stabilize before adding fish."
    },
    {
      question: "Do betta fish need a heater in summer?",
      answer: "Yes, betta fish need a heater year-round, even in summer. Room temperature fluctuates and is usually too cold. Even if your room feels warm, the water temperature is often 5-10°F cooler. A heater maintains stable 78-80°F regardless of room temperature, preventing stress and illness."
    }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <main className="min-h-screen pt-28 pb-20 px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            Complete Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
            Betta Fish Heater Guide 2025
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Learn why betta fish need heaters, what temperature to maintain, and how to choose and set up the right heater for your betta tank.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-blue-500/10 border-2 border-blue-500/30 p-6 rounded-2xl flex items-start gap-4">
            <Thermometer size={32} className="text-blue-400 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-blue-400 mb-3">🌡️ Heaters Are Essential for Betta Fish</h2>
              <p className="text-blue-200 leading-relaxed">
                Betta fish are <strong>tropical fish</strong> that require water temperature between <strong>78-80°F (25.5-26.5°C)</strong> at all times. Room temperature water (68-72°F) is too cold and causes stress, illness, and premature death. A heater is not optional—it's mandatory equipment.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          
          <GuideSection 
            Icon={Thermometer} 
            iconColor="#60a5fa"
            title="1. Why Betta Fish Need Heaters"
          >
            <p className="text-slate-300 mb-4">
              Betta fish are native to warm, tropical waters in Southeast Asia where temperatures stay consistently warm. In captivity, they require the same warm temperatures to thrive.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Tropical Fish:</strong> Bettas are tropical fish that evolved in warm waters (78-82°F). Their metabolism and immune system function best at these temperatures.
              </GuidePoint>
              <GuidePoint>
                <strong>Room Temperature is Too Cold:</strong> Most homes are 68-72°F, which is 10-12°F too cold for bettas. This causes stress, lethargy, and illness.
              </GuidePoint>
              <GuidePoint>
                <strong>Temperature Stability:</strong> Heaters maintain stable temperature, preventing fluctuations that stress fish. Even small temperature swings can weaken the immune system.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Without a Heater:</strong> Bettas become lethargic, stop eating, are prone to diseases like fin rot and ich, and have significantly shorter lifespans.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection 
            Icon={Settings} 
            iconColor="#34d399"
            title="2. Temperature Requirements: 78-80°F"
          >
            <p className="text-slate-300 mb-4">
              The optimal temperature range for betta fish is <strong className="text-white">78-80°F (25.5-26.5°C)</strong>. This range should be maintained at all times, day and night.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Optimal Range:</strong> 78-80°F is where bettas are most active, have strong immune systems, and exhibit natural behaviors.
              </GuidePoint>
              <GuidePoint>
                <strong>Too Cold (Below 75°F):</strong> Causes lethargy, loss of appetite, clamped fins, and increased disease susceptibility.
              </GuidePoint>
              <GuidePoint>
                <strong>Too Hot (Above 82°F):</strong> Can cause stress, reduced oxygen levels, and in extreme cases, death.
              </GuidePoint>
              <GuidePoint>
                <strong>Use a Thermometer:</strong> Always use a separate aquarium thermometer to monitor temperature. Don't rely solely on the heater's built-in thermostat.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection 
            Icon={Droplets} 
            iconColor="#fb923c"
            title="3. Choosing the Right Heater Size"
          >
            <p className="text-slate-300 mb-4">
              Use the <strong className="text-white">"5 watts per gallon"</strong> rule to choose the right heater size. This ensures your heater can maintain temperature even in cooler rooms.
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>5-Gallon Tank:</strong> 25-50W heater (50W recommended for cooler rooms)
              </GuidePoint>
              <GuidePoint>
                <strong>10-Gallon Tank:</strong> 50-75W heater (75W recommended)
              </GuidePoint>
              <GuidePoint>
                <strong>20-Gallon Tank:</strong> 100W heater
              </GuidePoint>
              <GuidePoint>
                <strong>Adjustable vs Pre-Set:</strong> Always choose an adjustable heater with a temperature dial. Pre-set heaters are unreliable and often don't maintain correct temperature.
              </GuidePoint>
              <GuidePoint>
                <strong>Room Temperature Matters:</strong> If your room is consistently cool (below 70°F), choose a slightly larger heater. If your room is warm (above 75°F), you can use a smaller heater.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection 
            Icon={CheckCircle2} 
            iconColor="#a78bfa"
            title="4. Heater Setup and Installation"
          >
            <p className="text-slate-300 mb-4">
              Proper heater installation is crucial for safety and effectiveness. Follow these steps for correct setup:
            </p>
            <ul className="space-y-3">
              <GuidePoint>
                <strong>Fully Submerged:</strong> The heater must be completely underwater. Never operate a heater above the water line—it can shatter or cause burns.
              </GuidePoint>
              <GuidePoint>
                <strong>Position Near Flow:</strong> Place the heater near the filter outlet for even heat distribution throughout the tank.
              </GuidePoint>
              <GuidePoint>
                <strong>Set Temperature:</strong> Adjust the heater dial to 78-80°F, then use a separate thermometer to verify the actual temperature.
              </GuidePoint>
              <GuidePoint>
                <strong>Wait Before Adding Fish:</strong> Let the heater run for 24 hours to stabilize temperature before adding your betta.
              </GuidePoint>
              <GuidePoint>
                <strong>Monitor Regularly:</strong> Check temperature daily with a thermometer. Heaters can malfunction, so regular monitoring is essential.
              </GuidePoint>
            </ul>
          </GuideSection>

          <GuideSection 
            Icon={AlertTriangle} 
            iconColor="#f87171"
            title="5. Common Heater Mistakes to Avoid"
          >
            <p className="text-slate-300 mb-4">
              Avoid these common mistakes that can harm your betta or damage your equipment:
            </p>
            <ul className="space-y-3">
              <GuidePoint alert>
                <strong>Using Pre-Set Heaters:</strong> Pre-set heaters are unreliable and often don't maintain correct temperature. Always use adjustable heaters.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Heater Above Water:</strong> Never operate a heater above the water line. It can shatter, cause burns, or malfunction.
              </GuidePoint>
              <GuidePoint alert>
                <strong>No Thermometer:</strong> Don't rely solely on the heater's thermostat. Use a separate thermometer to verify temperature.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Too Small Heater:</strong> An undersized heater can't maintain temperature, especially in cooler rooms. Use the 5 watts per gallon rule.
              </GuidePoint>
              <GuidePoint alert>
                <strong>Unplugging at Night:</strong> Never unplug the heater at night. Temperature must stay stable 24/7. Use a heater guard if you're concerned about safety.
              </GuidePoint>
            </ul>
          </GuideSection>

        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-lg">Common questions about betta fish heaters</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/build/betta" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Interactive Builder</h3>
              <p className="text-xs text-slate-400">Build your setup</p>
            </Link>
            <Link href="/guides/betta-setup" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Complete Setup Guide</h3>
              <p className="text-xs text-slate-400">Full guide</p>
            </Link>
            <Link href="/guides/betta-fish-tank-size" className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all text-center">
              <h3 className="text-sm font-bold text-white mb-1">Tank Size Guide</h3>
              <p className="text-xs text-slate-400">Tank requirements</p>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-12">
          <h2 className="text-3xl font-black text-white mb-6">Ready to Build Your Betta Setup?</h2>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Use our interactive builder to create a complete betta fish setup with the right heater and all essential equipment.
          </p>
          <Link href="/build/betta" className="inline-flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30 text-sm md:text-lg whitespace-nowrap">
            Launch Betta Builder <ArrowRight size={20} className="shrink-0 md:w-6 md:h-6" />
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}

function GuideSection({ Icon, iconColor, title, children }) {
  return (
    <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-lg">
      <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
        <div className="p-3 bg-slate-900/50 rounded-2xl border border-slate-700 shadow-inner">
          <Icon size={32} style={{ color: iconColor }} />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function GuidePoint({ children, alert }) {
  return (
    <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
      <div className="shrink-0 mt-1">
        {alert ? <ShieldAlert size={18} className="text-red-400" /> : <CheckCircle2 size={18} className="text-blue-400" />}
      </div>
      <div>{children}</div>
    </li>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="card-warm rounded-2xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/30 transition-colors" aria-expanded={isOpen}>
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        <HelpCircle size={20} className={`text-blue-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-4"><p className="text-slate-300 leading-relaxed">{answer}</p></div>}
    </div>
  );
}

