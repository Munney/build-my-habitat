"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  ArrowRight,
  Package,
  Calendar,
  DollarSign,
  X
} from "lucide-react";
import { buildStorage } from "../utils/buildStorage";
import { analytics, trackEvent } from "../utils/analytics";
import { ToastContainer } from "../components/Toast";

export default function MyBuildsPage() {
  const [builds, setBuilds] = useState({});
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const savedBuilds = buildStorage.getAllBuilds();
    setBuilds(savedBuilds);
    setLoading(false);
    trackEvent("my_builds_view", {});
  }, []);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleDelete = (buildId, buildName) => {
    buildStorage.deleteBuild(buildId);
    const updatedBuilds = buildStorage.getAllBuilds();
    setBuilds(updatedBuilds);
    trackEvent("build_deleted", { build_id: buildId });
    addToast(`"${buildName}" deleted successfully`, "success");
  };

  const buildArray = Object.values(builds).sort((a, b) => 
    new Date(b.savedAt) - new Date(a.savedAt)
  );

  if (loading) {
    return (
      <main className="relative min-h-screen pt-28 pb-20 px-6">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-white font-medium">Loading your builds...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-3 drop-shadow-lg text-white">
              <Bookmark className="text-emerald-400" size={40} />
              My Saved Builds
            </h1>
            <p className="text-slate-400 font-medium drop-shadow-md">
              View and manage your saved habitat configurations.
            </p>
          </div>
        </div>

        {/* Builds List */}
        {buildArray.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 border border-white/10 mb-6">
              <Bookmark className="text-slate-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No saved builds yet</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Save builds from the summary page to access them here later. You can share, edit, or delete saved builds anytime.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg"
            >
              Start Building <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildArray.map((build) => {
              const speciesColor = build.species === "betta" ? "blue" : "emerald";
              const speciesLabel = build.species === "betta" ? "Betta Fish" : "Leopard Gecko";
              
              return (
                <div 
                  key={build.id}
                  className="group relative p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all shadow-lg hover:-translate-y-1"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(build.id, build.name || `${speciesLabel} Build`)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete build"
                    aria-label={`Delete ${build.name || speciesLabel} build`}
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Build Info */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                          build.species === "betta"
                            ? "text-blue-300 border-blue-500/30 bg-blue-500/10"
                            : "text-emerald-300 border-emerald-500/30 bg-emerald-500/10"
                        }`}>
                          {speciesLabel}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {build.name || `${speciesLabel} Build`}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {new Date(build.savedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className={`text-${speciesColor}-400`} />
                        <div>
                          <p className="text-xs text-slate-500">Total Cost</p>
                          <p className={`text-lg font-bold text-${speciesColor}-400`}>
                            ${build.totalPrice?.toFixed(2) || "0.00"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package size={16} className={`text-${speciesColor}-400`} />
                        <div>
                          <p className="text-xs text-slate-500">Items</p>
                          <p className={`text-lg font-bold text-${speciesColor}-400`}>
                            {build.itemCount || 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {build.shareUrl ? (
                        <Link
                          href={build.shareUrl}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-bold"
                        >
                          View Build <ExternalLink size={14} />
                        </Link>
                      ) : (
                        <Link
                          href={`/build/${build.species}`}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-bold"
                        >
                          Rebuild <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

