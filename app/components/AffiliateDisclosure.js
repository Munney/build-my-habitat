import { Info } from "lucide-react";

export default function AffiliateDisclosure({ className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-700/70 bg-slate-900/60 px-4 py-3 text-xs text-slate-300 ${className}`}>
      <p className="flex items-start gap-2">
        <Info size={14} className="text-slate-400 mt-0.5 shrink-0" />
        <span>
          Disclosure: Some product links are affiliate links. We may earn a small commission at no extra cost to you.
        </span>
      </p>
    </div>
  );
}
