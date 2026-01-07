"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

export default function ProductTooltip({ explanation, category }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!explanation) return null;

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-slate-400 hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-white/5"
        aria-label="Product information"
      >
        <Info size={16} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-slate-900 border border-white/20 rounded-xl shadow-2xl z-50">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-bold text-white text-sm">Why This Matters</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
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

