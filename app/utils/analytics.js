"use client";

// Google Analytics 4 Measurement ID
// Set this in your environment variables as NEXT_PUBLIC_GA_ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  // Load gtag script if not already loaded
  if (!window.gtag) {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const trackPageView = (url) => {
  if (typeof window === "undefined") return;
  
  const pagePath = url || window.location.pathname;
  
  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 PAGE VIEW: ${pagePath}`);
  }

  // Google Analytics
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
    });
  }
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window === "undefined") return;

  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 EVENT: [${eventName}]`, eventParams);
  }

  // Google Analytics
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", eventName, eventParams);
  }
};

// Predefined event helpers for common actions
export const analytics = {
  // Navigation
  trackNavClick: (destination) => {
    trackEvent("nav_click", { destination });
  },

  // Builder events
  trackBuilderStart: (species) => {
    trackEvent("builder_start", { species });
  },

  trackProductSelect: (species, category, productId, productName) => {
    trackEvent("product_select", {
      species,
      category,
      product_id: productId,
      product_name: productName,
    });
  },

  trackBuilderComplete: (species, totalPrice, itemCount) => {
    trackEvent("builder_complete", {
      species,
      total_price: totalPrice,
      item_count: itemCount,
    });
  },

  // Summary/Checkout events
  trackSummaryView: (species, totalPrice, itemCount) => {
    trackEvent("summary_view", {
      species,
      total_price: totalPrice,
      item_count: itemCount,
    });
  },

  trackAmazonCartClick: (species, totalPrice, itemCount) => {
    trackEvent("amazon_cart_click", {
      species,
      total_price: totalPrice,
      item_count: itemCount,
      currency: "USD",
    });
  },

  // Guide/Content events
  trackGuideView: (guideType) => {
    trackEvent("guide_view", { guide_type: guideType });
  },

  trackResearchView: (articleTitle) => {
    trackEvent("research_view", { article_title: articleTitle });
  },

  // Browse events
  trackBrowseSearch: (searchTerm) => {
    trackEvent("browse_search", { search_term: searchTerm });
  },

  trackBrowseFilter: (filter) => {
    trackEvent("browse_filter", { filter });
  },

  trackProductClick: (productId, productName, species, category) => {
    trackEvent("product_click", {
      product_id: productId,
      product_name: productName,
      species,
      category,
    });
  },

  // Error/Validation events
  trackValidationError: (species, errorType, errorMessage) => {
    trackEvent("validation_error", {
      species,
      error_type: errorType,
      error_message: errorMessage,
    });
  },

  // Experience level selection
  trackExperienceSelect: (species, experienceLevel) => {
    trackEvent("experience_select", {
      species,
      experience_level: experienceLevel,
    });
  },
};
