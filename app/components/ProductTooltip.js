"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

export default function ProductTooltip({ explanation, category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!explanation) return null;

  // Show tooltip on hover (desktop) or when clicked (mobile)
  const showTooltip = isOpen || isHovered;

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`relative flex items-center justify-center w-8 h-8 md:w-6 md:h-6 rounded-full transition-all touch-manipulation ${
          showTooltip
            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50" 
            : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:scale-110 border border-blue-500/30"
        }`}
        aria-label="Product information"
        title="Learn why this product matters"
      >
        <Info size={20} className="md:w-[18px] md:h-[18px] shrink-0" />
      </button>

      {showTooltip && (
        <>
          {/* Backdrop - only on mobile/click */}
          {isOpen && (
            <div
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 md:w-64 p-4 bg-slate-900 border border-white/20 rounded-xl shadow-2xl z-50 pointer-events-auto">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-bold text-white text-sm">Why This Matters</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsHovered(false);
                }}
                className="text-slate-400 hover:text-white transition-colors shrink-0 md:hidden"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{explanation}</p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-900" />
          </div>
        </>
      )}
    </div>
  );
}

