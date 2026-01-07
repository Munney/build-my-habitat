"use client";

// Google Tag Manager Container ID
const GTM_CONTAINER_ID = "GTM-P92HFFRX";

// Initialize dataLayer if it doesn't exist (GTM should create it, but this is a fallback)
export const initGA = () => {
  if (typeof window === "undefined") return;
  
  // Ensure dataLayer exists (GTM creates it, but we ensure it's there)
  window.dataLayer = window.dataLayer || [];
};

// Track page views
export const trackPageView = (url) => {
  if (typeof window === "undefined") return;
  
  const pagePath = url || window.location.pathname;
  
  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 PAGE VIEW: ${pagePath}`);
  }

  // Google Tag Manager - push to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_title: document.title,
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

  // Google Tag Manager - push to dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
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

  // FAQ events
  trackFAQToggle: (category, question) => {
    trackEvent("faq_toggle", {
      category,
      question,
    });
  },

  // Share events
  trackShareClick: (method, species) => {
    trackEvent("share_click", {
      method,
      species,
    });
  },

  // Print events
  trackPrintClick: (species) => {
    trackEvent("print_click", {
      species,
    });
  },
};
