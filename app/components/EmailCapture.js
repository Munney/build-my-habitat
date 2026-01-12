"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail, Download, CheckCircle2, Sparkles } from "lucide-react";

export function EmailCapturePopup({ onClose, onSuccess, leadMagnet = "Complete Setup Checklist" }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Submit to API route
      const response = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup", leadMagnet }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      if (onSuccess) onSuccess(email);
      
      // Track analytics
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "email_captured",
          source: "popup",
          lead_magnet: leadMagnet,
        });
      }

      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-emerald-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {!isSuccess ? (
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 mb-4">
                <Sparkles className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">
                Get Your Free Setup Checklist
              </h2>
              <p className="text-slate-300 text-sm">
                Join {Math.floor(Math.random() * 5000 + 2000)}+ pet owners getting expert setup guides
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Get Free Checklist
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          </div>
        ) : (
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
              <CheckCircle2 className="text-emerald-400" size={32} />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Check Your Email!</h2>
            <p className="text-slate-300">
              We've sent your free checklist to <strong className="text-white">{email}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function EmailCaptureInline({ onSuccess, leadMagnet = "Complete Setup Checklist", variant = "default" }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "inline", leadMagnet }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setIsSuccess(true);
      if (onSuccess) onSuccess(email);

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "email_captured",
          source: "inline",
          lead_magnet: leadMagnet,
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
        <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
        <p className="text-emerald-200 text-sm">
          <strong>Success!</strong> Check your email for your free checklist.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
        >
          {isSubmitting ? "..." : "Get PDF"}
        </button>
      </form>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-emerald-500/20 rounded-xl">
          <Download className="text-emerald-400" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">Get Your Build Emailed to You</h3>
          <p className="text-slate-300 text-sm">
            Receive a complete PDF checklist with your build details, setup instructions, and care reminders.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isSubmitting ? "Sending..." : "Send PDF"}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <p className="text-xs text-slate-500">
          We'll email you a complete PDF checklist. No spam, unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}

export function ExitIntentTracker({ onExitIntent }) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (hasTriggered.current) return;

    const handleMouseLeave = (e) => {
      // Only trigger if mouse is moving towards top of screen (exiting)
      if (e.clientY <= 0 && !hasTriggered.current) {
        hasTriggered.current = true;
        onExitIntent();
      }
    };

    // Add event listener
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onExitIntent]);

  return null;
}

