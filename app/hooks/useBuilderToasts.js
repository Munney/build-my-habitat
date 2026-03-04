"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Shared toast and progress-pulse logic for builder pages.
 * @param {object} options
 * @param {object} options.sectionCompletion - { [sectionId]: boolean }
 * @param {number} options.progress - 0-100
 * @param {Record<string, string>} options.labelMap - section id -> toast message when section completes
 * @returns {{ toast: { title: string, msg: string } | null, setToast: (t: { title: string, msg: string } | null) => void, progressPulse: boolean }}
 */
export function useBuilderToasts({ sectionCompletion, progress, labelMap = {} }) {
  const [toast, setToast] = useState(null);
  const [progressPulse, setProgressPulse] = useState(false);
  const prevCompletionRef = useRef(null);
  const prevProgressRef = useRef(0);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const prev = prevCompletionRef.current;
    const curr = sectionCompletion;
    if (!prev) {
      prevCompletionRef.current = curr ? { ...curr } : {};
      return;
    }
    const changes = Object.keys(curr || {}).filter((k) => !prev[k] && curr[k]);
    if (changes.length) {
      const key = changes[0];
      setToast({ title: "Nice!", msg: labelMap[key] || "Section complete" });
    }
    prevCompletionRef.current = curr ? { ...curr } : {};
  }, [sectionCompletion, labelMap]);

  useEffect(() => {
    if (progress > prevProgressRef.current) {
      prevProgressRef.current = progress;
      setProgressPulse(true);
      const t = setTimeout(() => setProgressPulse(false), 600);
      return () => clearTimeout(t);
    }
    prevProgressRef.current = progress;
  }, [progress]);

  return { toast, setToast, progressPulse };
}
