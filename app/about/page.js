import React from "react";
import { ShieldCheck, BookOpen, Heart, Activity } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black text-white mb-6 drop-shadow-lg">
          The HabitatBuilder <span className="text-emerald-400">Standard</span>
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We don't just sell parts. We enforce <span className="text-white font-bold">veterinary standards</span> to ensure your pet thrives, not just survives.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <StandardCard 
          icon={<ShieldCheck size={32} className="text-emerald-400" />}
          title="Safety First"
          desc="Our algorithm automatically blocks dangerous items. You literally cannot build an unsafe habitat here. No heat rocks, no calcium sand, no small bowls."
        />
        <StandardCard 
          icon={<Activity size={32} className="text-blue-400" />}
          title="Husbandry Verified"
          desc="Every configuration matches the specific temperature, humidity, and space requirements of the species, backed by current herpetological research."
        />
        <StandardCard 
          icon={<BookOpen size={32} className="text-amber-400" />}
          title="Education Focused"
          desc="We explain WHY an item is needed. We don't just say 'buy this lamp,' we explain 'this simulates the sun to process calcium.'"
        />
        <StandardCard 
          icon={<Heart size={32} className="text-red-400" />}
          title="Ethical Keeping"
          desc="We prioritize enrichment and mental health. A bare tank is technically 'alive,' but we aim for 'thriving.'"
        />
      </div>

      {/* Affiliate Disclosure */}
      <div className="max-w-5xl mx-auto mt-16 mb-8">
        <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-amber-400">💰</span>
            Affiliate Disclosure
          </h3>
          <p className="text-slate-300 leading-relaxed">
            HabitatBuilder uses Amazon affiliate links. When you purchase products through our links, we earn a small commission at no extra cost to you. This helps us keep the site free and maintain our research-backed recommendations. We only recommend products we've verified as safe and appropriate for your pets.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link 
          href="/"
          className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all"
        >
          Start Building Now
        </Link>
      </div>
    </main>
  );
}

function StandardCard({ icon, title, desc }) {
  return (
    <div className="card-warm p-8 rounded-2xl hover:bg-slate-800/70 transition-colors text-left">
      <div className="mb-4 bg-slate-900/50 w-fit p-3 rounded-xl border border-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}