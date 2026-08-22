"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, PackageSearch, ArrowUpRight, X, Filter, DollarSign, Tag } from "lucide-react";
import Footer from "../components/Footer";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import ProductSafetyBadge from "../components/ProductSafetyBadge";

// These imports will work now that your folder structure is fixed!
import bettaData from "../../data/betta.json";
import geckoData from "../../data/leopard-gecko.json";
import beardedDragonData from "../../data/bearded-dragon.json";
import ballPythonData from "../../data/ball-python.json";
import crestedGeckoData from "../../data/crested-gecko.json";

// 👇 REPLACE WITH YOUR AMAZON TAG
const AFFILIATE_TAG = "habitatbuilde-20";

// Ensure URL has affiliate tag (append or replace existing tag param)
function withAffiliateTag(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    u.searchParams.set("tag", AFFILIATE_TAG);
    return u.toString();
  } catch {
    return url;
  }
}

// Build direct Amazon product link with affiliate tag (prefer ASIN for consistency)
function getProductLink(item) {
  if (item.asin) {
    return `https://www.amazon.com/dp/${item.asin}?tag=${AFFILIATE_TAG}`;
  }
  const direct = item.defaultProductUrl || item.amazonUrl || item.url;
  if (direct && (direct.includes("/dp/") || direct.includes("/gp/product/"))) {
    return withAffiliateTag(direct);
  }
  const query = encodeURIComponent(`${item.label} ${item.species === "Betta" ? "aquarium" : "reptile"}`);
  return `https://www.amazon.com/s?k=${query}&tag=${AFFILIATE_TAG}`;
}

// List of removed product IDs by species that should not appear in browse page
// Keep this updated when products are removed from the builders
const REMOVED_PRODUCT_IDS = {
  "Gecko": [
    "10g", // 10 Gallon Tank removed (too small for leopard geckos)
    // Add more removed product IDs for geckos here as needed
  ],
  "Betta": [
    // Add removed product IDs for bettas here as needed
  ],
  "Bearded Dragon": [
    // Add removed product IDs for bearded dragons here as needed
  ],
};

function getSafetyStatus(item) {
  if (item?.safetyStatus) return item.safetyStatus;
  const id = (item?.id || "").toLowerCase();
  const label = (item?.label || item?.name || "").toLowerCase();

  if (
    id.includes("calcium") && id.includes("sand") ||
    label.includes("calcium sand") ||
    label.includes("walnut shell")
  ) {
    return "blocked";
  }

  if (id.includes("reptile_carpet") || label.includes("reptile carpet")) {
    return "blocked";
  }

  if (item?.badge === "Recommended" || item?.badge === "Best Value") {
    return "recommended";
  }

  return "approved";
}

function getBlockedReason(item) {
  const id = (item?.id || "").toLowerCase();
  const label = (item?.label || item?.name || "").toLowerCase();

  if (id.includes("calcium") && id.includes("sand") || label.includes("calcium sand")) {
    return "Blocked: calcium sand is not recommended because it can create husbandry and ingestion risks.";
  }
  if (id.includes("reptile_carpet") || label.includes("reptile carpet")) {
    return "Blocked: reptile carpet can trap waste and bacteria and may catch claws. Use safer substrate options instead.";
  }
  if (label.includes("walnut shell")) {
    return "Blocked: walnut shell substrates can be abrasive and carry ingestion risk for many species.";
  }
  return "Blocked: this product conflicts with conservative habitat safety guidance.";
}

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const allProducts = useMemo(() => {
    const products = [];
    const seenProductKeys = new Set();
    
    // Helper to add items safely
    const add = (list, species, categoryLabel) => {
      if (!list || !Array.isArray(list)) return; 

      list.forEach(item => {
        const normalizedItem = {
          ...item,
          label: item.label || item.name,
        };

        // Skip removed products for this species
        const removedForSpecies = REMOVED_PRODUCT_IDS[species] || [];
        if (removedForSpecies.includes(normalizedItem.id)) {
          return;
        }

        // Direct Amazon link with affiliate tag (ASIN → dp link, else direct URL with tag, else search)
        const link = getProductLink({ ...normalizedItem, species });
        const dedupeKey = (normalizedItem.asin || link || normalizedItem.label || normalizedItem.id || "")
          .toString()
          .trim()
          .toLowerCase();
        if (dedupeKey && seenProductKeys.has(dedupeKey)) {
          return;
        }
        if (dedupeKey) {
          seenProductKeys.add(dedupeKey);
        }

        products.push({
          ...normalizedItem,
          species,
          category: categoryLabel,
          url: link,
          safetyStatus: getSafetyStatus(normalizedItem)
        });
      });
    };

    // --- LOAD BETTA DATA ---
    if (bettaData) {
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

    // --- LOAD BEARDED DRAGON DATA ---
    if (beardedDragonData) {
        add(beardedDragonData.enclosures,  "Bearded Dragon", "Enclosure");
        add(beardedDragonData.heating,     "Bearded Dragon", "Heating");
        add(beardedDragonData.lighting,    "Bearded Dragon", "Lighting");
        add(beardedDragonData.substrates,  "Bearded Dragon", "Substrate");
        add(beardedDragonData.hides,       "Bearded Dragon", "Hides");
        add(beardedDragonData.decor,       "Bearded Dragon", "Decor");
        add(beardedDragonData.supplements, "Bearded Dragon", "Supplements");
        add(beardedDragonData.feeding,     "Bearded Dragon", "Feeding");
    }

    if (ballPythonData) {
        add(ballPythonData.enclosures,  "Ball Python", "Enclosure");
        add(ballPythonData.heating,     "Ball Python", "Heating");
        add(ballPythonData.uvb,         "Ball Python", "UVB");
        add(ballPythonData.substrates,  "Ball Python", "Substrate");
        add(ballPythonData.humidity,    "Ball Python", "Humidity");
        add(ballPythonData.hides,       "Ball Python", "Hides");
        add(ballPythonData.water,       "Ball Python", "Water");
        add(ballPythonData.monitoring,  "Ball Python", "Monitoring");
    }

    if (crestedGeckoData) {
        add(crestedGeckoData.enclosures,  "Crested Gecko", "Enclosure");
        add(crestedGeckoData.heating,     "Crested Gecko", "Heating");
        add(crestedGeckoData.uvb,         "Crested Gecko", "UVB");
        add(crestedGeckoData.lighting,    "Crested Gecko", "Lighting");
        add(crestedGeckoData.substrates,  "Crested Gecko", "Substrate");
        add(crestedGeckoData.humidity,    "Crested Gecko", "Humidity");
        add(crestedGeckoData.decor,       "Crested Gecko", "Decor");
        add(crestedGeckoData.supplements, "Crested Gecko", "Supplements");
        add(crestedGeckoData.monitoring,  "Crested Gecko", "Monitoring");
    }

    return products.sort((a, b) => {
      const aBlocked = a.safetyStatus === "blocked";
      const bBlocked = b.safetyStatus === "blocked";
      if (aBlocked === bBlocked) return 0;
      return aBlocked ? 1 : -1;
    });
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allProducts.map(p => p.category));
    return Array.from(cats).sort();
  }, [allProducts]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 0) {
      const suggestions = allProducts
        .filter(item => 
          item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
        .map(item => ({
          label: item.label,
          category: item.category,
          species: item.species
        }));
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, allProducts]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      // Search filter
      const label = item.label ? item.label.toLowerCase() : "";
      const category = item.category ? item.category.toLowerCase() : "";
      const matchesSearch = 
        label.includes(searchTerm.toLowerCase()) ||
        category.includes(searchTerm.toLowerCase());

      // Species filter
      const matchesSpecies = 
        filter === "all" || 
        item.species.toLowerCase() === filter.toLowerCase();

      // Category filter
      const matchesCategory = 
        selectedCategory === "all" || 
        item.category === selectedCategory;

      // Price filter
      const price = item.price || 0;
      const matchesPrice = 
        price >= priceRange.min && 
        price <= priceRange.max;

      return matchesSearch && matchesSpecies && matchesCategory && matchesPrice;
    });
  }, [allProducts, searchTerm, filter, selectedCategory, priceRange]);

  // Calculate price range from products
  const maxPrice = useMemo(() => {
    return Math.max(...allProducts.map(p => p.price || 0), 100);
  }, [allProducts]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.label);
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilter("all");
    setSelectedCategory("all");
    setPriceRange({ min: 0, max: maxPrice });
  };

  const hasActiveFilters = 
    searchTerm !== "" || 
    filter !== "all" || 
    selectedCategory !== "all" || 
    priceRange.min !== 0 || 
    priceRange.max !== maxPrice;

  return (
    <>
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
              Browse research-backed habitat supplies with clearly labeled safety status.
            </p>
          </div>
        </div>
        <AffiliateDisclosure />
        <div className="w-full mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-300 text-sm">
            Want a complete compatible setup? The builder selects and
            checks everything for you.
          </p>
          <div className="flex gap-3 shrink-0">
            <Link href="/build/leopard-gecko" 
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-full transition-all">
              Gecko Builder →
            </Link>
            <Link href="/build/betta"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all">
              Betta Builder →
            </Link>
            <Link href="/build/bearded-dragon"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-bold rounded-full transition-all">
              Dragon Builder →
            </Link>
            <Link href="/build/ball-python"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded-full transition-all">
              Python Builder →
            </Link>
            <Link href="/build/crested-gecko"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-full transition-all">
              Crested Gecko Builder →
            </Link>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="space-y-4">
          {/* Search Bar with Autocomplete */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search parts by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-sm focus:outline-none focus:border-sky-500 backdrop-blur-md transition-all shadow-lg text-white placeholder:text-slate-500"
            />
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto"
              >
                {searchSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                    <div className="font-bold text-white text-sm">{suggestion.label}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {suggestion.category} • {suggestion.species}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Species Filter */}
            <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-700 rounded-xl p-1 backdrop-blur-md shadow-lg">
              <button 
                onClick={() => setFilter("all")} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === "all" 
                    ? "bg-slate-700 text-white" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                ALL
              </button>
              <button 
                onClick={() => setFilter("gecko")} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === "gecko" 
                    ? "bg-emerald-600 text-white" 
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                GECKO
              </button>
              <button 
                onClick={() => setFilter("betta")} 
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === "betta" 
                    ? "bg-blue-600 text-white" 
                    : "text-slate-300 hover:text-blue-400"
                }`}
              >
                BETTA
              </button>
              <button
                onClick={() => setFilter("bearded dragon")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === "bearded dragon"
                    ? "bg-orange-600 text-white"
                    : "text-slate-300 hover:text-orange-400"
                }`}
              >
                BEARDED
              </button>
              <button
                onClick={() => setFilter("ball python")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === "ball python"
                    ? "bg-amber-600 text-white"
                    : "text-slate-300 hover:text-amber-400"
                }`}
              >
                PYTHON
              </button>
              <button
                onClick={() => setFilter("crested gecko")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === "crested gecko"
                    ? "bg-purple-600 text-white"
                    : "text-slate-300 hover:text-purple-400"
                }`}
              >
                CRESTED
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                showFilters
                  ? "bg-sky-600 text-white"
                  : "bg-slate-900/70 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md"
              }`}
            >
              <Filter size={16} />
              Filters
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-all"
              >
                <X size={16} />
                Clear All
              </button>
            )}
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-700 backdrop-blur-md space-y-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Filter size={16} />
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                    <Tag size={14} className="inline mr-1" />
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                    <DollarSign size={14} className="inline mr-1" />
                    Price Range: ${priceRange.min} - ${priceRange.max}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>$0</span>
                      <span>${maxPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-slate-400 text-sm">
            Showing <span className="font-bold text-white">{filteredProducts.length}</span> of {allProducts.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
             <div className="col-span-full text-center py-20 text-slate-500 font-medium">
                <p className="text-lg mb-2">No parts found.</p>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
             </div>
          ) : (
            filteredProducts.map((item, i) => {
                const badgeClass =
                  item.species === "Betta"
                    ? "text-blue-300 border-blue-500/30 bg-blue-500/10"
                    : item.species === "Ball Python"
                    ? "text-amber-300 border-amber-500/30 bg-amber-500/10"
                    : item.species === "Crested Gecko"
                    ? "text-purple-300 border-purple-500/30 bg-purple-500/10"
                    : "text-emerald-300 border-emerald-500/30 bg-emerald-500/10";

                const priceClass =
                  item.species === "Betta"
                    ? "text-blue-400"
                    : item.species === "Ball Python"
                    ? "text-amber-400"
                    : item.species === "Crested Gecko"
                    ? "text-purple-400"
                    : "text-emerald-400";

                const isBlocked = item.safetyStatus === "blocked";
                const buttonClass = isBlocked
                    ? "bg-slate-700 hover:bg-slate-600 shadow-slate-900/20"
                    : item.species === "Betta"
                    ? "bg-blue-600 hover:bg-blue-500 shadow-blue-900/20"
                    : item.species === "Ball Python"
                    ? "bg-amber-600 hover:bg-amber-500 shadow-amber-900/20"
                    : item.species === "Crested Gecko"
                    ? "bg-purple-600 hover:bg-purple-500 shadow-purple-900/20"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20";

                return (
                <a
                  key={`${item.species}-${item.id}-${i}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${badgeClass}`}>{item.category}</span>
                            <span className={`font-mono text-sm font-bold ${priceClass}`}>${item.price?.toFixed(2) || "0.00"}</span>
                        </div>
                        <h3 className="font-bold text-white leading-tight mb-2 text-lg">{item.label}</h3>
                        <p className="text-xs text-slate-400 font-medium">{item.species}</p>
                        <div className="mt-2">
                          <ProductSafetyBadge status={item.safetyStatus} />
                        </div>
                        {isBlocked && (
                          <p className="text-xs text-red-300 mt-2 leading-relaxed">
                            {getBlockedReason(item)}
                          </p>
                        )}
                    </div>

                    <span className={`mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-xs font-bold transition-all shadow-lg ${buttonClass}`}>
                        {isBlocked ? "Blocked / Learn More" : "View Product"} <ArrowUpRight size={14} />
                    </span>
                </a>
                );
            })
          )}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
