"use client";

export const trackEvent = (eventName, data = {}) => {
  // 1. Log to console (For development)
  console.log(`📊 TRACKING: [${eventName}]`, data);

  // 2. TODO: Later, send this to Google Analytics/Plausible
  // if (window.gtag) { window.gtag('event', eventName, data) }
};