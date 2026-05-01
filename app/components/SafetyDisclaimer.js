import { ShieldAlert } from "lucide-react";

export default function SafetyDisclaimer({ className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-3 text-xs text-slate-300 ${className}`}>
      <p className="flex items-start gap-2 leading-relaxed">
        <ShieldAlert size={14} className="text-slate-400 mt-0.5 shrink-0" />
        <span>
          BuildMyHabitat is not a veterinary service. Recommendations are based on published husbandry research, welfare standards, and conservative safety rules. Always consult a qualified reptile, aquatic, or exotic animal veterinarian for medical concerns.
        </span>
      </p>
    </div>
  );
}
