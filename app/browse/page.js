"use client";

import { useState, useMemo } from "react";
import { Search, PackageSearch, ArrowUpRight } from "lucide-react";

// These imports will work now that your folder structure is fixed!
import bettaData from "../../data/betta.json";
import geckoData from "../../data/leopard-gecko.json";

// 👇 REPLACE WITH YOUR AMAZON TAG
const AFFILIATE_TAG = "habitatbuilde-20";

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const allProducts = useMemo(() => {
    const products = [];
    
    // Helper to add items safely
    const add = (list, species, categoryLabel) => {
      if (!list || !Array.isArray(list)) return; 

      list.forEach(item => {
        // Link Logic: Prefer direct URL, then ASIN, then Search
        let link = item.url || item.defaultProductUrl || null;
        if (!link) {
            if (item.asin) {
                link = `https://www.amazon.com/dp/${item.asin}?tag=${AFFILIATE_TAG}`;
            } else {
                const query = encodeURIComponent(`${item.label} ${species === "Betta" ? "aquarium" : "reptile"}`);
                link = `https://www.amazon.com/s?k=${query}&tag=${AFFILIATE_TAG}`;
            }
        }

        products.push({
          ...item,
          species,
          category: categoryLabel,
          url: link
        });
      });
    };

    // --- LOAD BETTA DATA ---
    if (bettaData) {
        // We check for both new names ("enclosures") and old names ("tanks") just in case
        add(bettaData.enclosures || bettaData.tanks, "Betta", "Enclosure");
        add(bettaData.filtration || bettaData.equipment, "Betta", "Filtration");
        add(bettaData.heating,    "Betta", "Heating");
        add(bettaData.substrates, "Betta", "Substrate");
        add(bettaData.decor,      "Betta", "Decor");
        add(bettaData.watercare,  "Betta", "Water Care");
        add(bettaData.plants,     "Betta", "Plants");
    }

    // --- LOAD GECKO DATA ---
    if (geckoData) {
        add(geckoData.enclosures,  "Gecko", "Enclosure");
        add(geckoData.heating,     "Gecko", "Heating");
        add(geckoData.substrates,  "Gecko", "Substrate");
        add(geckoData.hides,       "Gecko", "Hides");
        add(geckoData.supplements, "Gecko", "Supplements");
    }

    return products;
  }, []);

  const filteredProducts = allProducts.filter((item) => {
    const label = item.label ? item.label.toLowerCase() : "";
    const matchesSearch = label.includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || item.species.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6 text-slate-200">
      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 drop-shadow-lg text-white">
              <PackageSearch className="text-sky-500" size={36} />
              Part Browser
            </h1>
            <p className="text-slate-400 font-medium drop-shadow-md">
              Browse our entire database of approved habitat supplies.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search parts..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-sm focus:outline-none focus:border-sky-500 w-full sm:w-64 backdrop-blur-md transition-all shadow-lg text-white placeholder:text-slate-500"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-700 rounded-xl p-1 backdrop-blur-md shadow-lg">
              <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === "all" ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white"}`}>ALL</button>
              <button onClick={() => setFilter("gecko")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === "gecko" ? "bg-emerald-600 text-white" : "text-slate-300 hover:text-emerald-400"}`}>GECKO</button>
              <button onClick={() => setFilter("betta")} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === "betta" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-blue-400"}`}>BETTA</button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
             <div className="col-span-full text-center py-20 text-slate-500 font-medium">
                <p>No parts found.</p>
             </div>
          ) : (
            filteredProducts.map((item, i) => {
                const isBetta = item.species === "Betta";
                
                const badgeClass = isBetta 
                    ? "text-blue-300 border-blue-500/30 bg-blue-500/10" 
                    : "text-emerald-300 border-emerald-500/30 bg-emerald-500/10";
                
                const priceClass = isBetta ? "text-blue-400" : "text-emerald-400";
                
                const buttonClass = isBetta
                    ? "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20";

                return (
                <div key={`${item.species}-${item.id}-${i}`} className="group flex flex-col justify-between p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg hover:-translate-y-1">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${badgeClass}`}>{item.category}</span>
                            <span className={`font-mono text-sm font-bold ${priceClass}`}>${item.price}</span>
                        </div>
                        <h3 className="font-bold text-white leading-tight mb-2 text-lg">{item.label}</h3>
                        <p className="text-xs text-slate-400 font-medium">{item.species}</p>
                    </div>

                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={`mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-xs font-bold transition-all shadow-lg ${buttonClass}`}>
                        View Product <ArrowUpRight size={14} />
                    </a>
                </div>
                );
            })
          )}
        </div>
      </div>
    </main>
  );
}