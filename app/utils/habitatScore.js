/**
 * Habitat Safety Score — rule-based scoring for betta and leopard gecko builds.
 * Used on summary pages to show a real, validated score and actionable feedback.
 */

const MAX_SCORE = 100;

function getScoreLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Needs Improvement";
  return "Unsafe / Incomplete";
}

/**
 * Betta: 100 pts — Tank 25, Filtration 20, Heating 20, Substrate 10, Enrichment 10, Water care 15
 */
export function calculateBettaHabitatScore(selections) {
  const checks = [];
  const warnings = [];
  const missingEssentials = [];
  let score = 0;

  const enclosure = selections?.enclosure;
  const tankSize =
    enclosure?.size ??
    (enclosure?.label ? parseInt(enclosure.label.match(/\d+/)?.[0], 10) : 0);

  // Tank size: 25 pts — 10+ full, 5 partial, under 5 fail
  const tankMax = 25;
  let tankPoints = 0;
  let tankMessage;
  if (tankSize >= 10) {
    tankPoints = 25;
    tankMessage = `You received full points for tank size because you selected a ${tankSize} gallon aquarium.`;
  } else if (tankSize >= 5) {
    tankPoints = 12;
    tankMessage = "A 10+ gallon tank is recommended for betta health. Your current size meets minimum.";
  } else if (tankSize > 0) {
    tankPoints = 0;
    tankMessage = "Select at least a 5 gallon tank; 10+ gallons is recommended for a healthy betta.";
    missingEssentials.push("Larger tank (10+ gallons recommended)");
  } else {
    tankMessage = "Select an aquarium to get started.";
    missingEssentials.push("Aquarium");
  }
  score += tankPoints;
  checks.push({ key: "tank", label: "Tank size", passed: tankPoints >= 12, points: tankPoints, maxPoints: tankMax, message: tankMessage });

  // Filtration: 20 pts — sponge full, HOB/gentle full or medium, none fail
  const filt = selections?.filtration;
  const filtMax = 20;
  let filtPoints = 0;
  let filtMessage;
  if (filt) {
    const id = (filt.id || "").toLowerCase();
    if (id === "sponge") {
      filtPoints = 20;
      filtMessage = "Sponge filter is an excellent choice for betta-safe flow.";
    } else if (id === "hob" || id === "internal") {
      filtPoints = 16;
      filtMessage = "Gentle flow filtration is selected. Ensure flow is not too strong for betta fins.";
    } else {
      filtPoints = 14;
      filtMessage = "Filtration selected. Verify flow is gentle for bettas.";
    }
  } else {
    filtMessage = "Add a filter. Sponge or low-flow options are safest for bettas.";
    missingEssentials.push("Filtration");
  }
  score += filtPoints;
  checks.push({ key: "filtration", label: "Filtration", passed: filtPoints >= 14, points: filtPoints, maxPoints: filtMax, message: filtMessage });

  // Heating + thermometer: 20 pts
  const heating = selections?.heating || [];
  const hasHeater = heating.some((h) => h && (h.id === "50w" || h.id === "100w"));
  const hasThermometer = heating.some((h) => h && h.id === "thermometer");
  const heatMax = 20;
  let heatPoints = 0;
  let heatMessage;
  if (hasHeater && hasThermometer) {
    heatPoints = 20;
    heatMessage = "Heater and thermometer selected for stable 78–80°F.";
  } else if (hasHeater) {
    heatPoints = 12;
    heatMessage = "Add a thermometer to verify stable water temperature.";
    warnings.push("Thermometer recommended to monitor temperature.");
  } else if (heating.length > 0) {
    heatPoints = 8;
    heatMessage = "Add an aquarium heater to maintain 78–80°F.";
    missingEssentials.push("Heater");
  } else {
    heatMessage = "Add a heater and thermometer for stable 78–80°F water temperature.";
    missingEssentials.push("Heater", "Thermometer");
  }
  score += heatPoints;
  checks.push({ key: "heating", label: "Temperature", passed: heatPoints >= 12, points: heatPoints, maxPoints: heatMax, message: heatMessage });

  // Substrate: 10 pts — any safe or bare = full
  const sub = selections?.substrate;
  const subMax = 10;
  const subPoints = sub ? 10 : 0;
  const subMessage = sub ? "Substrate selected." : "Substrate or bare bottom adds to habitat completeness.";
  if (!sub) missingEssentials.push("Substrate (or choose bare bottom)");
  score += subPoints;
  checks.push({ key: "substrate", label: "Substrate", passed: subPoints === 10, points: subPoints, maxPoints: subMax, message: subMessage });

  // Enrichment: 10 pts — plants/decor
  const decor = selections?.decor || [];
  const enrichMax = 10;
  let enrichPoints = decor.length >= 2 ? 10 : decor.length === 1 ? 6 : 0;
  const enrichMessage = decor.length >= 2 ? "Enrichment and hiding spots selected." : decor.length === 1 ? "Add more plants or decor for a happier betta." : "Consider adding plants or decor for enrichment.";
  if (decor.length === 0) warnings.push("Plants or decor help reduce stress.");
  score += enrichPoints;
  checks.push({ key: "enrichment", label: "Enrichment", passed: enrichPoints >= 6, points: enrichPoints, maxPoints: enrichMax, message: enrichMessage });

  // Water care: 15 pts — conditioner + test kit full, one partial, none fail
  const care = selections?.care || [];
  const hasConditioner = care.some((c) => c && c.id === "conditioner");
  const hasTestKit = care.some((c) => c && c.id === "testkit");
  const careMax = 15;
  let carePoints = 0;
  let careMessage;
  if (hasConditioner && hasTestKit) {
    carePoints = 15;
    careMessage = "Water conditioner and test kit selected for safe water.";
  } else if (hasConditioner || hasTestKit) {
    carePoints = 8;
    careMessage = hasTestKit ? "Add water conditioner to remove chlorine." : "Your score is reduced because no test kit was selected.";
    if (!hasTestKit) missingEssentials.push("Test kit");
    if (!hasConditioner) missingEssentials.push("Water conditioner");
  } else {
    careMessage = "Add water conditioner and a test kit for safe, cycled water.";
    missingEssentials.push("Water conditioner", "Test kit");
  }
  score += carePoints;
  checks.push({ key: "watercare", label: "Water care", passed: carePoints >= 8, points: carePoints, maxPoints: careMax, message: careMessage });

  return {
    score: Math.min(score, MAX_SCORE),
    maxScore: MAX_SCORE,
    label: getScoreLabel(score),
    checks,
    warnings,
    missingEssentials: [...new Set(missingEssentials)],
  };
}

/**
 * Gecko: 100 pts — Enclosure 20, Heating+thermostat 25, UVB 10, Substrate 15, Hides 20, Supplements 10
 */
export function calculateGeckoHabitatScore(selections) {
  const checks = [];
  const warnings = [];
  const missingEssentials = [];
  let score = 0;

  const enclosure = selections?.enclosure;
  const enclosureSize =
    enclosure?.size ??
    (enclosure?.label ? parseInt(enclosure.label.match(/\d+/)?.[0], 10) : 0);

  // Enclosure: 20 pts — 40+ full, 20 partial, undersized fail
  const encMax = 20;
  let encPoints = 0;
  let encMessage;
  if (enclosureSize >= 40) {
    encPoints = 20;
    encMessage = `You received full points for enclosure size (${enclosureSize} gallon).`;
  } else if (enclosureSize >= 20) {
    encPoints = 12;
    encMessage = "A 40 gallon or larger enclosure is recommended for an adult leopard gecko.";
  } else if (enclosureSize > 0) {
    encPoints = 5;
    encMessage = "Select at least a 20 gallon enclosure; 40 gallon is recommended.";
    missingEssentials.push("Larger enclosure (40 gal recommended)");
  } else {
    encMessage = "Select an enclosure to get started.";
    missingEssentials.push("Enclosure");
  }
  score += encPoints;
  checks.push({ key: "enclosure", label: "Enclosure size", passed: encPoints >= 12, points: encPoints, maxPoints: encMax, message: encMessage });

  // Heating + thermostat: 25 pts — heat source + thermostat = full, missing thermo = fail
  const heating = selections?.heating || [];
  const hasThermostat = heating.some((h) => h && h.id === "thermostat");
  const hasHeatSource = heating.some((h) => h && (h.id?.startsWith("halogen") || h.id?.startsWith("dhp") || h.id?.startsWith("heatmat")));
  const heatMax = 25;
  let heatPoints = 0;
  let heatMessage;
  if (hasHeatSource && hasThermostat) {
    heatPoints = 25;
    heatMessage = "Primary heat source and thermostat selected for safe temperature control.";
  } else if (hasHeatSource) {
    heatPoints = 0;
    heatMessage = "Add a thermostat. A thermostat is required to prevent overheating and burns.";
    missingEssentials.push("Thermostat");
  } else if (hasThermostat) {
    heatPoints = 5;
    heatMessage = "Add a primary heat source (halogen, DHP, or heat mat) with your thermostat.";
    missingEssentials.push("Heat source");
  } else {
    heatMessage = "Add a heat source and thermostat for proper temperature gradient.";
    missingEssentials.push("Heat source", "Thermostat");
  }
  score += heatPoints;
  checks.push({ key: "heating", label: "Temperature control", passed: heatPoints >= 25, points: heatPoints, maxPoints: heatMax, message: heatMessage });

  // UVB: 10 pts — present full, missing partial
  const hasUvb = heating.some((h) => h && h.id?.startsWith("uvb"));
  const uvbMax = 10;
  const uvbPoints = hasUvb ? 10 : 5;
  const uvbMessage = hasUvb ? "UVB lighting selected for natural vitamin D3 support." : "UVB is optional but recommended for leopard geckos. Add UVB to improve your score.";
  if (!hasUvb) warnings.push("UVB lighting recommended for vitamin D3 synthesis.");
  score += uvbPoints;
  checks.push({ key: "uvb", label: "UVB / lighting", passed: hasUvb, points: uvbPoints, maxPoints: uvbMax, message: uvbMessage });

  // Substrate: 15 pts — safe full, risky low, none fail
  const sub = selections?.substrate;
  const subMax = 15;
  let subPoints = 0;
  let subMessage;
  if (sub) {
    const id = (sub.id || "").toLowerCase();
    // Calcium sand and loose sand are risky for leopard geckos
    const isRisky = id.includes("sand") && !id.includes("topsoil") && !id.includes("bioactive");
    if (isRisky) {
      subPoints = 5;
      subMessage = "Some substrates can cause impaction. Consider paper towel, slate, or bioactive for safety.";
      warnings.push("Substrate choice may pose impaction risk.");
    } else {
      subPoints = 15;
      subMessage = "Safe substrate selected.";
    }
  } else {
    subMessage = "Select a safe substrate (e.g. paper towel, slate, bioactive).";
    missingEssentials.push("Substrate");
  }
  score += subPoints;
  checks.push({ key: "substrate", label: "Substrate safety", passed: subPoints >= 15, points: subPoints, maxPoints: subMax, message: subMessage });

  // Hides: 20 pts — warm + cool + humid = full, missing one = partial, multiple = fail
  const requiredHideIds = ["warmhide", "coolhide", "humidhide"];
  const hides = selections?.hides || [];
  const hasWarm = hides.some((h) => h && h.id === "warmhide");
  const hasCool = hides.some((h) => h && h.id === "coolhide");
  const hasHumid = hides.some((h) => h && h.id === "humidhide");
  const hideCount = [hasWarm, hasCool, hasHumid].filter(Boolean).length;
  const hideMax = 20;
  let hidePoints = hideCount === 3 ? 20 : hideCount === 2 ? 12 : hideCount === 1 ? 5 : 0;
  let hideMessage;
  if (hideCount === 3) hideMessage = "All 3 essential hides (warm, cool, humid) selected.";
  else if (hideCount > 0) {
    hideMessage = "Add a humid hide to improve your gecko habitat score.";
    if (!hasHumid) missingEssentials.push("Humid hide");
  } else {
    hideMessage = "Add warm, cool, and humid hides for a complete setup.";
    missingEssentials.push("3 essential hides");
  }
  score += hidePoints;
  checks.push({ key: "hides", label: "Essential hides", passed: hideCount === 3, points: hidePoints, maxPoints: hideMax, message: hideMessage });

  // Supplements: 10 pts
  const supps = selections?.supplements || [];
  const hasCalcium = supps.some((s) => s && (s.id === "calcium_d3" || s.id === "calcium_no_d3"));
  const hasMulti = supps.some((s) => s && s.id === "multivitamin");
  const suppMax = 10;
  let suppPoints = hasCalcium && hasMulti ? 10 : hasCalcium || hasMulti ? 5 : 0;
  const suppMessage = hasCalcium && hasMulti ? "Calcium and multivitamin selected." : hasCalcium || hasMulti ? "Add both calcium and multivitamin for proper nutrition." : "Add calcium and multivitamin supplements.";
  if (!hasCalcium) missingEssentials.push("Calcium supplement");
  if (!hasMulti) missingEssentials.push("Multivitamin");
  score += suppPoints;
  checks.push({ key: "supplements", label: "Supplement support", passed: suppPoints >= 10, points: suppPoints, maxPoints: suppMax, message: suppMessage });

  return {
    score: Math.min(score, MAX_SCORE),
    maxScore: MAX_SCORE,
    label: getScoreLabel(score),
    checks,
    warnings,
    missingEssentials: [...new Set(missingEssentials)],
  };
}

/**
 * Shared wrapper: returns score result for the given species.
 */
export function calculateHabitatScore(species, selections) {
  if (species === "betta") return calculateBettaHabitatScore(selections);
  if (species === "leopard-gecko") return calculateGeckoHabitatScore(selections);
  return {
    score: 0,
    maxScore: MAX_SCORE,
    label: "Unsafe / Incomplete",
    checks: [],
    warnings: [],
    missingEssentials: [],
  };
}
