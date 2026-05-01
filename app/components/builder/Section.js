"use client";

import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

const THEMES = {
  blue: {
    border: "border-blue-500/50",
    borderLocked: "border-white/5",
    borderDefault: "border-white/10",
    gradient: "from-blue-500/5 via-transparent to-transparent",
    iconCompleted: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 shadow-emerald-500/10",
    iconLocked: "from-slate-700/20 to-slate-800/20 border-slate-700/30",
    iconDefault: "from-blue-500/20 to-blue-600/20 border-blue-500/30 shadow-blue-500/10",
    iconColor: "text-blue-400",
    iconColorLocked: "text-slate-500",
    iconColorCompleted: "text-emerald-400",
    button: "bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 text-blue-300",
  },
  emerald: {
    border: "border-emerald-500/50",
    borderLocked: "border-white/5",
    borderDefault: "border-white/10",
    gradient: "from-emerald-500/5 via-transparent to-transparent",
    iconCompleted: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 shadow-emerald-500/10",
    iconLocked: "from-slate-700/20 to-slate-800/20 border-slate-700/30",
    iconDefault: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 shadow-emerald-500/10",
    iconColor: "text-emerald-400",
    iconColorLocked: "text-slate-500",
    iconColorCompleted: "text-emerald-400",
    button: "bg-emerald-500/10 border border-emerald-400/20 hover:bg-emerald-500/20 text-emerald-300",
  },
};

export function Section({
  title,
  icon,
  description,
  children,
  sectionId,
  isCompleted,
  sectionRef,
  isLocked = false,
  nextSectionId,
  nextSectionTitle,
  isSectionLocked = {},
  scrollToSection,
  theme = "blue",
}) {
  const t = THEMES[theme] || THEMES.blue;

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      tabIndex={-1}
      className={`relative bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-3xl border-2 shadow-xl overflow-hidden transition-all duration-500 ${
        isCompleted ? t.border : isLocked ? t.borderLocked : t.borderDefault
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} pointer-events-none`} />

      {isCompleted && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/30 z-10">
          <CheckCircle2 size={16} className="text-white" />
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 bg-slate-900/75 rounded-3xl flex items-center justify-center z-20 pointer-events-none">
          <div className="text-center px-6 py-4 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-xl">
            <AlertCircle size={28} className="text-slate-300 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm">Complete previous sections to unlock</p>
          </div>
        </div>
      )}

      <div className="relative mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-3 flex flex-wrap items-center gap-3 sm:gap-4">
          <div
            className={`p-2.5 sm:p-3 bg-gradient-to-br rounded-xl border-2 shadow-lg transition-all duration-300 shrink-0 ${
              isCompleted ? t.iconCompleted : isLocked ? t.iconLocked : t.iconDefault
            }`}
          >
            <div
              className={
                isCompleted ? t.iconColorCompleted : isLocked ? t.iconColorLocked : t.iconColor
              }
            >
              {icon}
            </div>
          </div>
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent drop-shadow-sm min-w-0 ${
              isLocked ? "from-slate-500 to-slate-600" : "from-white to-slate-200"
            }`}
          >
            {title}
          </span>
        </h2>
        {description && (
          <p
            className={`text-sm mt-1 sm:mt-0 sm:ml-[52px] leading-relaxed font-medium ${
              isLocked ? "text-slate-500" : "text-slate-300"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      <div className={`relative ${isLocked ? "pointer-events-none" : ""}`}>{children}</div>
      {isCompleted &&
        nextSectionId &&
        !isSectionLocked[nextSectionId] &&
        scrollToSection && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => scrollToSection(nextSectionId)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-bold ${t.button} transition flex items-center gap-2 touch-manipulation`}
              aria-label={nextSectionTitle ? `Next step: ${nextSectionTitle}` : "Go to next section"}
            >
              {nextSectionTitle ? `Next Step → ${nextSectionTitle}` : "Next Step"}{" "}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
    </section>
  );
}
