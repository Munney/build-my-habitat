"use client";

// Build storage utility using localStorage
const STORAGE_KEY = "habitatbuilder_saved_builds";

export const buildStorage = {
  // Save a build
  saveBuild: (buildData) => {
    if (typeof window === "undefined") return null;
    
    try {
      const builds = buildStorage.getAllBuilds();
      const buildId = buildData.id || `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const build = {
        id: buildId,
        ...buildData,
        savedAt: new Date().toISOString(),
      };
      
      builds[buildId] = build;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
      
      return buildId;
    } catch (error) {
      console.error("Error saving build:", error);
      return null;
    }
  },

  // Get all saved builds
  getAllBuilds: () => {
    if (typeof window === "undefined") return {};
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Error loading builds:", error);
      return {};
    }
  },

  // Get a specific build by ID
  getBuild: (buildId) => {
    if (typeof window === "undefined") return null;
    
    const builds = buildStorage.getAllBuilds();
    return builds[buildId] || null;
  },

  // Delete a build
  deleteBuild: (buildId) => {
    if (typeof window === "undefined") return false;
    
    try {
      const builds = buildStorage.getAllBuilds();
      delete builds[buildId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
      return true;
    } catch (error) {
      console.error("Error deleting build:", error);
      return false;
    }
  },

  // Generate a shareable URL from build data
  generateShareUrl: (species, selections) => {
    if (typeof window === "undefined") return "";
    
    const params = new URLSearchParams();
    
    // Add each selection to URL params
    Object.entries(selections).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.append(key, value.map(item => item.id || item).join(","));
          }
        } else if (typeof value === "object" && value.id) {
          params.append(key, value.id);
        } else if (value) {
          params.append(key, value);
        }
      }
    });
    
    return `/summary/${species}?${params.toString()}`;
  },

  // Create build data from summary page
  createBuildData: (species, selections, totalPrice, allItems) => {
    return {
      species,
      selections,
      totalPrice: parseFloat(totalPrice),
      itemCount: allItems.length,
      items: allItems.map(item => ({
        id: item.id,
        label: item.label,
        price: item.price,
        category: item.category || item.type,
      })),
    };
  },
};

