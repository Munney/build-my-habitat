"use client";

import { Sparkles, DollarSign, Crown } from "lucide-react";
import templatesData from "../../data/templates.json";

export function SetupTemplates({ species, onApplyTemplate }) {
  const templates = templatesData[species] || {};
  const templateKeys = Object.keys(templates);

  if (templateKeys.length === 0) return null;

  const handleApply = (templateKey) => {
    const template = templates[templateKey];
    if (template && onApplyTemplate) {
      onApplyTemplate(template);
    }
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles size={24} className="text-emerald-400" />
        <h2 className="text-xl font-bold text-white">Quick Start Templates</h2>
      </div>
      <p className="text-slate-300 text-sm mb-4">
        Start with a pre-configured setup and customize as needed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templateKeys.map((key) => {
          const template = templates[key];
          const isBudget = key === "budget";
          return (
            <button
              key={key}
              onClick={() => handleApply(key)}
              className="relative overflow-hidden p-5 rounded-xl border transition-all duration-300 text-left group hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              style={{
                borderColor: isBudget ? "rgba(34, 197, 94, 0.5)" : "rgba(251, 191, 36, 0.5)",
                backgroundColor: isBudget ? "rgba(34, 197, 94, 0.1)" : "rgba(251, 191, 36, 0.1)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  {isBudget ? (
                    <DollarSign size={20} className="text-green-400" />
                  ) : (
                    <Crown size={20} className="text-amber-400" />
                  )}
                  <h3 className="font-bold text-lg text-white">{template.name}</h3>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {template.description}
              </p>
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Click to Apply →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

