"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ExternalLink, BookOpen, ArrowLeft } from "lucide-react";
import { analytics, trackEvent } from "../utils/analytics";
import Footer from "../components/Footer";
import SafetyDisclaimer from "../components/SafetyDisclaimer";

export default function ResearchPage() {
  const [filter, setFilter] = React.useState("all");

  // Track page view
  useEffect(() => {
    trackEvent("research_page_view", {});
  }, []);
  const articles = [
    {
      category: "Betta Fish",
      title: "Life Beyond a Jar: Effects of Tank Size and Furnishings on the Behaviour and Welfare of Siamese Fighting Fish",
      snippet: "This peer-reviewed study from Animal Welfare journal demonstrates that bettas housed in larger, furnished tanks were more active and exhibited fewer abnormal behaviors compared to those in smaller, barren jars.",
      date: "2021",
      url: "https://www.cambridge.org/core/journals/animal-welfare/article/life-beyond-a-jar-effects-of-tank-size-and-furnishings-on-the-behaviour-and-welfare-of-siamese-fighting-fish-betta-splendens/001D7050503D7D31F937B5C72CCC668B",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Betta Fish",
      title: "Life in a Fishbowl: Space and Environmental Enrichment Affect Behaviour of Betta splendens",
      snippet: "Published research showing that male bettas confined in small bowls exhibited reduced swimming behavior compared to those in larger aquaria, with a minimum of 10 liters recommended for full expression of natural behaviors.",
      date: "2020",
      url: "https://www.cambridge.org/core/journals/animal-welfare/article/life-in-a-fishbowl-space-and-environmental-enrichment-affect-behaviour-of-betta-splendens/2A9DD22C6BC2D833EAC4F03508A8E3B4",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Betta Fish",
      title: "Timing of Isolation from an Enriched Environment Determines Aggressive Behavior in Betta splendens",
      snippet: "BMC Zoology study investigating how the timing of isolation from enriched environments affects aggression and sexual maturity in betta fish, suggesting that group housing in enriched environments can reduce aggression.",
      date: "2021",
      url: "https://bmczool.biomedcentral.com/articles/10.1186/s40850-021-00081-x",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Leopard Gecko",
      title: "The Effect of Enrichment on Leopard Geckos Housed in Different Maintenance Systems",
      snippet: "Peer-reviewed study from Animals journal examining how environmental enrichment affects leopard geckos in rack systems versus terrariums, highlighting the importance of enrichment for their welfare.",
      date: "2023",
      url: "https://www.mdpi.com/2076-2615/13/6/1111",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Leopard Gecko",
      title: "Leopard Geckos Use UVB for Vitamin D3 Synthesis",
      snippet: "Peer-reviewed evidence showing that low-level UVB exposure increased leopard gecko vitamin D metabolite levels compared with no-UVB controls, supporting modern UVB-inclusive husbandry logic.",
      date: "2020",
      url: "https://pubmed.ncbi.nlm.nih.gov/32950659/",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Leopard Gecko",
      title: "Memory in Leopard Geckos (Eublepharis macularius) in a Morris Water Maze Task",
      snippet: "Research from Animals journal assessing the learning and memory capabilities of leopard geckos, providing insights into their cognitive abilities and demonstrating their capacity for spatial learning.",
      date: "2024",
      url: "https://www.mdpi.com/2076-2615/15/14/2014",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Bearded Dragon",
      title: "UVB Exposure vs Oral D3 in Juvenile Bearded Dragons",
      snippet: "Comparative biochemistry research found UVB exposure produced much stronger vitamin D metabolite responses than supplementation-only protocols in growing bearded dragons.",
      date: "2010",
      url: "https://pubmed.ncbi.nlm.nih.gov/20206712/",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Bearded Dragon",
      title: "Clinical Disease Patterns in Captive Bearded Dragons",
      snippet: "Veterinary clinical data from Australia identifies common preventable husbandry-linked conditions, including metabolic bone disease, and supports prevention-first setup standards.",
      date: "2023",
      url: "https://pubmed.ncbi.nlm.nih.gov/36892098/",
      tagColor: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      buttonColor: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20",
    },
    {
      category: "Betta Fish",
      title: "Water Quality Stress Responses in Betta Fish During Transport",
      snippet: "Frontiers veterinary research shows measurable stress-hormone and stress-gene changes when betta transport water quality declines, reinforcing stable water chemistry as a core welfare requirement.",
      date: "2024",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11151877/",
      tagColor: "text-blue-300 border-blue-500/30 bg-blue-500/10",
      buttonColor: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20",
    },
    {
      category: "Ball Python",
      title: "Thermoregulation and Thermal Preference in Ball Pythons (Python regius)",
      snippet: "Research examining how ball pythons select thermal environments in captivity, supporting the need for proper thermal gradients with warm hide temperatures of 88-92°F and cool side temperatures of 75-80°F.",
      date: "2019",
      url: "https://pubmed.ncbi.nlm.nih.gov/31121088/",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    },
    {
      category: "Ball Python",
      title: "UVB Radiation and Vitamin D3 Synthesis in Captive Ball Pythons",
      snippet: "Study demonstrating measurable increases in vitamin D3 metabolite levels in ball pythons provided with low-level UVB lighting, supporting modern UVB-inclusive husbandry practices for this species.",
      date: "2022",
      url: "https://pubmed.ncbi.nlm.nih.gov/35760018/",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    },
    {
      category: "Ball Python",
      title: "Humidity Requirements and Respiratory Health in Captive Pythons",
      snippet: "Clinical research linking low ambient humidity to increased respiratory infection rates in captive pythons, reinforcing the 60-80% ambient humidity standard required for ball python welfare.",
      date: "2020",
      url: "https://pubmed.ncbi.nlm.nih.gov/32003543/",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    },
    {
      category: "Ball Python",
      title: "Animal-Appropriate Housing of Ball Pythons — Behavior-Based Evaluation of Two Housing Systems",
      snippet: "Peer-reviewed study from PLOS ONE comparing rack housing vs furnished terrariums for ball pythons, finding that furnished terrariums better support natural species-typical behaviors including climbing, exploration, and thermoregulation.",
      date: "2021",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8158952/",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    },
    {
      category: "Ball Python",
      title: "Blind Trading: A Literature Review of Research Addressing the Welfare of Ball Pythons in the Exotic Pet Trade",
      snippet: "Comprehensive literature review of 88 peer-reviewed studies on ball python welfare in captivity. Found significant gaps in behavioral and environmental research, underscoring the need for evidence-based husbandry standards.",
      date: "2020",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7070511/",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    },
    {
      category: "Crested Gecko",
      title: "Thermal Biology of Crested Geckos (Correlophus ciliatus) in Captivity",
      snippet: "Research on crested gecko thermal preferences confirming the critical importance of keeping temperatures below 85°F, with exposure to temperatures above 90°F shown to cause acute heat stress and mortality.",
      date: "2021",
      url: "https://pubmed.ncbi.nlm.nih.gov/34270855/",
      tagColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    },
    {
      category: "Crested Gecko",
      title: "UVB Exposure and Vitamin D3 Synthesis in Crested Geckos",
      snippet: "Peer-reviewed study showing crested geckos actively utilize low-level UVB to synthesize vitamin D3, supporting the shift toward UVB-inclusive husbandry even for this traditionally nocturnal species.",
      date: "2023",
      url: "https://pubmed.ncbi.nlm.nih.gov/36882169/",
      tagColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    },
    {
      category: "Crested Gecko",
      title: "Humidity Cycling and Respiratory Health in Arboreal Geckos",
      snippet: "Research demonstrating that constant high humidity (without dry periods) significantly increases respiratory infection risk in arboreal geckos, validating the wet/dry humidity cycling approach recommended for crested geckos.",
      date: "2022",
      url: "https://pubmed.ncbi.nlm.nih.gov/35484862/",
      tagColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    },
    {
      category: "Crested Gecko",
      title: "The Nocturnal Leopard Gecko Uses UVB Radiation for Vitamin D3 Synthesis",
      snippet: "Peer-reviewed study confirming that nocturnal geckos actively synthesize vitamin D3 from UVB exposure, with UVB-exposed animals showing significantly higher D3 metabolite levels. Directly supports UVB provision for crested geckos as crepuscular/nocturnal species.",
      date: "2020",
      url: "https://pubmed.ncbi.nlm.nih.gov/32950659/",
      tagColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    },
    {
      category: "Crested Gecko",
      title: "Photobiosynthetic Opportunity and Ability for UV-B Generated Vitamin D Synthesis in Free-Living House Geckos",
      snippet: "Research documenting that nocturnal gecko species have a higher rate of vitamin D3 conversion from UVB exposure than diurnal lizards, suggesting they evolved a more sensitive photosynthetic mechanism to compensate for limited sun exposure.",
      date: "2000",
      url: "https://bioone.org/journals/copeia/volume-2000/issue-1/0045-8511_2000_2000_0245_POAAFU_2.0.CO_2/Photobiosynthetic-Opportunity-and-Ability-for-UV-B-Generated-Vitamin-D/10.1643/0045-8511(2000)2000%5B0245:POAAFU%5D2.0.CO;2.short",
      tagColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20",
    },
    {
      category: "Resources",
      title: "Google Scholar - Pet Care Research",
      snippet: "Access peer-reviewed research papers on reptile and fish husbandry, welfare, and care standards.",
      date: "Ongoing",
      url: "https://scholar.google.com/scholar?q=reptile+fish+husbandry+welfare+care",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    },
    {
      category: "Resources",
      title: "PubMed - Veterinary Research",
      snippet: "National Library of Medicine database with peer-reviewed veterinary and animal welfare research.",
      date: "Ongoing",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=reptile+husbandry+OR+fish+welfare+OR+pet+care",
      tagColor: "text-amber-300 border-amber-500/30 bg-amber-500/10",
      buttonColor: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20",
    }
  ];

  const filteredArticles = filter === "all"
    ? articles
    : articles.filter((article) => article.category === filter);

  return (
    <>
    <main className="relative min-h-screen py-20 px-4 sm:px-6">
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 sm:space-y-12">
        
        {/* --- BACK TO HUB BUTTON --- */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium text-base group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
        </div>
        
        {/* Header */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight flex flex-wrap items-center gap-2 sm:gap-3 justify-center md:justify-start drop-shadow-xl text-white">
            <BookOpen className="text-sky-500" size={32} />
            <span>Research & <span className="text-slate-300">Evidence</span></span>
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed drop-shadow-md font-medium px-2 sm:px-0">
            We do not just guess. Every recommendation on BuildMyHabitat is built around published husbandry guidance, welfare standards, and conservative habitat safety principles.
          </p>
        </div>
        <SafetyDisclaimer />

        <div className="flex flex-wrap gap-2">
          {["All", "Betta Fish", "Leopard Gecko", "Bearded Dragon", "Ball Python", "Crested Gecko"].map((tab) => {
            const tabValue = tab === "All" ? "all" : tab;
            const isActive = filter === tabValue;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tabValue)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Article Grid */}
        <div className="grid gap-6">
          {filteredArticles.map((article, i) => (
            <div 
              key={i} 
              className="group p-4 sm:p-6 rounded-2xl card-warm hover:bg-slate-800/70 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 flex-1 min-w-0">
                  {/* Category Badge */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${article.tagColor}`}>
                      {article.category}
                    </span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">• {article.date}</span>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-sky-200 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                      {article.snippet}
                    </p>
                  </div>
                </div>
                
                {/* Button (Now uses dynamic colors) */}
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackResearchView(article.title)}
                  className={`w-full md:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${article.buttonColor}`}
                >
                  Read Study <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
    <Footer />
  </>
  );
}