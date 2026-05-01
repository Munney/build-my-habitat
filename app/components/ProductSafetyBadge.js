export default function ProductSafetyBadge({ status = "recommended", className = "" }) {
  const normalized = String(status || "recommended").toLowerCase();

  if (normalized === "blocked") {
    return (
      <span className={`inline-flex items-center rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-300 ${className}`}>
        Blocked / Not Recommended
      </span>
    );
  }

  if (normalized === "allowed_with_caution") {
    return (
      <span className={`inline-flex items-center rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 ${className}`}>
        Allowed with Caution
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 ${className}`}>
      Recommended
    </span>
  );
}
