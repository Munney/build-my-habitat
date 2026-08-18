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
 * Bearded Dragon: 100 pts — Enclosure 18, UVB 22, Basking+thermostat 22, Substrate 10, Hides 13, Enrichment 10, Supplements 5
 * Minimum 120 gallon equivalent; UVB required; basking heat + thermostat required; 2+ hides; proper substrate.
 */
export function calculateBeardedDragonHabitatScore(selections) {
  const checks = [];
  const warnings = [];
  const missingEssentials = [];
  let score = 0;

  const enclosure = selections?.enclosure;
  const enclosureSize =
    enclosure?.size ??
    (enclosure?.label ? parseInt(enclosure.label.match(/\d+/)?.[0], 10) : 0);

  // Enclosure: 18 pts — 120+ full, 75+ partial, below fail
  const encMax = 18;
  let encPoints = 0;
  let encMessage;
  if (enclosureSize >= 120) {
    encPoints = 18;
    encMessage = `You received full points for enclosure size (${enclosureSize} gallon equivalent). Bearded dragons need 4×2×2 ft minimum.`;
  } else if (enclosureSize >= 75) {
    encPoints = 8;
    encMessage = "A 4×2×2 ft (120 gallon equivalent) enclosure is the minimum for an adult bearded dragon.";
    missingEssentials.push("Larger enclosure (120 gal / 4×2×2 ft minimum)");
  } else if (enclosureSize > 0) {
    encPoints = 0;
    encMessage = "Select at least a 120 gallon equivalent (4×2×2 ft) enclosure for a bearded dragon.";
    missingEssentials.push("Larger enclosure (120 gal minimum)");
  } else {
    encMessage = "Select an enclosure to get started.";
    missingEssentials.push("Enclosure");
  }
  score += encPoints;
  checks.push({ key: "enclosure", label: "Enclosure size", passed: encPoints >= 18, points: encPoints, maxPoints: encMax, message: encMessage });

  // UVB: 22 pts — required; 0 if missing
  const lighting = selections?.lighting || [];
  const hasUvb = lighting.some((l) => l && (l.id?.startsWith("uvb_t5") || l.id?.startsWith("uvb")));
  const uvbMax = 22;
  const uvbPoints = hasUvb ? 22 : 0;
  const uvbMessage = hasUvb
    ? "T5 UVB lighting selected. Essential for calcium metabolism and preventing metabolic bone disease."
    : "UVB is required for bearded dragons. Without it they develop metabolic bone disease. Add a T5 UVB 10–12% tube covering ~50% of the enclosure.";
  if (!hasUvb) missingEssentials.push("UVB lighting (T5 10–12%)");
  score += uvbPoints;
  checks.push({ key: "uvb", label: "UVB lighting", passed: hasUvb, points: uvbPoints, maxPoints: uvbMax, message: uvbMessage });

  // Basking + thermostat: 22 pts
  const heating = selections?.heating || [];
  const hasThermostat = heating.some((h) => h && h.id === "thermostat");
  const hasBasking = heating.some((h) => h && (h.id?.startsWith("halogen") || h.id?.startsWith("che_")));
  const heatMax = 22;
  let heatPoints = 0;
  let heatMessage;
  if (hasBasking && hasThermostat) {
    heatPoints = 22;
    heatMessage = "Basking heat source and thermostat selected for safe temperature control (95–105°F basking).";
  } else if (hasBasking) {
    heatPoints = 0;
    heatMessage = "A thermostat is required. Unregulated heat causes burns and overheating.";
    missingEssentials.push("Thermostat");
  } else if (hasThermostat) {
    heatPoints = 5;
    heatMessage = "Add a basking heat source (halogen or CHE) with your thermostat.";
    missingEssentials.push("Basking heat source");
  } else {
    heatMessage = "Add a basking heat source and thermostat for proper temperature gradient.";
    missingEssentials.push("Basking heat source", "Thermostat");
  }
  score += heatPoints;
  checks.push({ key: "heating", label: "Basking + thermostat", passed: heatPoints >= 22, points: heatPoints, maxPoints: heatMax, message: heatMessage });

  // Substrate: 10 pts — safe full, risky low
  const sub = selections?.substrate;
  const subMax = 10;
  let subPoints = 0;
  let subMessage;
  if (sub) {
    const id = (sub.id || "").toLowerCase();
    const risky = id.includes("calcium") && id.includes("sand") && !id.includes("mix");
    if (risky) {
      subPoints = 3;
      subMessage = "Loose calcium sand alone is unsafe (impaction risk). Use tile, paper towel, or a proper topsoil/sand mix.";
      warnings.push("Substrate may pose impaction risk.");
    } else {
      subPoints = 10;
      subMessage = "Safe substrate selected.";
    }
  } else {
    subMessage = "Select a safe substrate (e.g. tile, paper towel, shelf liner, or 50/50 mix).";
    missingEssentials.push("Substrate");
  }
  score += subPoints;
  checks.push({ key: "substrate", label: "Substrate", passed: subPoints >= 10, points: subPoints, maxPoints: subMax, message: subMessage });

  // Hides: 13 pts — 2+ full, 1 partial, 0 fail
  const hides = selections?.hides || [];
  const hideCount = hides.length;
  const hideMax = 13;
  let hidePoints = hideCount >= 2 ? 13 : hideCount === 1 ? 6 : 0;
  let hideMessage;
  if (hideCount >= 2) hideMessage = "At least 2 hides selected for thermoregulation and security.";
  else if (hideCount === 1) {
    hideMessage = "Add at least one more hide (warm and cool side recommended).";
    missingEssentials.push("Second hide");
  } else {
    hideMessage = "Add at least 2 hides (warm and cool side).";
    missingEssentials.push("2+ hides");
  }
  score += hidePoints;
  checks.push({ key: "hides", label: "Hides (2+)", passed: hideCount >= 2, points: hidePoints, maxPoints: hideMax, message: hideMessage });

  // Enrichment: 10 pts — basking platform and/or decor
  const decor = selections?.decor || [];
  const hasBaskingPlatform = decor.some((d) => d && (d.id === "basking_platform" || d.label?.toLowerCase().includes("basking")));
  const enrichPoints = hasBaskingPlatform && decor.length >= 1 ? 10 : decor.length >= 1 ? 6 : 0;
  const enrichMessage = hasBaskingPlatform
    ? "Basking platform and enrichment selected."
    : decor.length >= 1
      ? "Consider adding a basking platform so your dragon can get within proper range of the heat/UVB."
      : "Add climbing decor and a basking platform for enrichment.";
  if (decor.length === 0) warnings.push("Climbing decor and basking platform recommended.");
  score += enrichPoints;
  checks.push({ key: "enrichment", label: "Enrichment", passed: enrichPoints >= 6, points: enrichPoints, maxPoints: 10, message: enrichMessage });

  // Supplements: 5 pts
  const supps = selections?.supplements || [];
  const hasCalcium = supps.some((s) => s && (s.id === "calcium_d3" || s.id === "calcium_no_d3"));
  const hasMulti = supps.some((s) => s && s.id === "multivitamin");
  const suppMax = 5;
  let suppPoints = hasCalcium && hasMulti ? 5 : hasCalcium || hasMulti ? 2 : 0;
  const suppMessage = hasCalcium && hasMulti ? "Calcium and multivitamin selected." : hasCalcium || hasMulti ? "Add both calcium and multivitamin." : "Add calcium and multivitamin supplements.";
  if (!hasCalcium) missingEssentials.push("Calcium supplement");
  if (!hasMulti) missingEssentials.push("Multivitamin");
  score += suppPoints;
  checks.push({ key: "supplements", label: "Supplements", passed: suppPoints >= 5, points: suppPoints, maxPoints: suppMax, message: suppMessage });

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
 * Ball Python: 100 pts — Enclosure 20, Heating+thermostat 25, Humidity 15, Hides 15, Substrate 10, Water+monitoring 10, UVB 5
 * Adult minimum 4×2×2; overhead heat + thermostat required; 3 hides; 60–80% humidity.
 */
export function calculateBallPythonHabitatScore(selections) {
  const checks = [];
  const warnings = [];
  const missingEssentials = [];
  let score = 0;

  const enclosure = selections?.enclosure;
  const enclosureSize =
    enclosure?.size ??
    (enclosure?.name ? parseInt(enclosure.name.match(/\d+/)?.[0], 10) : 0) ??
    (enclosure?.label ? parseInt(enclosure.label.match(/\d+/)?.[0], 10) : 0);

  const encMax = 20;
  let encPoints = 0;
  let encMessage;
  if (enclosureSize >= 120 || enclosure?.id === "pvc4x2x2" || enclosure?.id === "pvc4x4x2" || enclosure?.id === "120gal") {
    encPoints = 20;
    encMessage = "You received full points for enclosure size. ReptiFiles adult minimum is 4×2×2 (48\"L x 24\"W x 24\"H).";
  } else if (enclosure?.id === "40gal" || enclosureSize === 40) {
    encPoints = 6;
    encMessage = "40 gallon is below the ReptiFiles minimum for adult ball pythons. We recommend at least a 4x2x2.";
    missingEssentials.push("Larger enclosure (4×2×2 / 120 gal minimum)");
    warnings.push("40 gallon is juvenile-only.");
  } else if (enclosure) {
    encPoints = 8;
    encMessage = "Select at least a 4×2×2 (120 gallon) enclosure for an adult ball python.";
    missingEssentials.push("Larger enclosure (4×2×2 minimum)");
  } else {
    encMessage = "Select an enclosure to get started.";
    missingEssentials.push("Enclosure");
  }
  score += encPoints;
  checks.push({ key: "enclosure", label: "Enclosure size", passed: encPoints >= 20, points: encPoints, maxPoints: encMax, message: encMessage });

  const heating = selections?.heating || [];
  const hasThermostat = heating.some((h) => h && h.id === "thermostat");
  const hasPrimaryHeat = heating.some((h) =>
    h && ["halogen-flood", "deep-heat-projector", "ceramic-heat-emitter", "radiant-heat-panel"].includes(h.id)
  );
  const hasHeatMat = heating.some((h) => h && h.id === "heat-mat");
  const heatMax = 25;
  let heatPoints = 0;
  let heatMessage;
  if (hasPrimaryHeat && hasThermostat) {
    heatPoints = 25;
    heatMessage = "Overhead heat source and thermostat selected. Warm hide target: 90-95°F. Cool side: 75-80°F.";
    if (hasHeatMat) warnings.push("Heat mat is supplemental only in adult enclosures.");
  } else if (hasHeatMat && hasThermostat && !hasPrimaryHeat) {
    heatPoints = 8;
    heatMessage = "Heat mats are supplemental only in adult enclosures. Add a primary overhead heat source.";
    missingEssentials.push("Primary overhead heat source");
  } else if (hasPrimaryHeat) {
    heatPoints = 0;
    heatMessage = "A thermostat is required. Unregulated heat causes burns and overheating.";
    missingEssentials.push("Thermostat");
  } else if (hasThermostat) {
    heatPoints = 8;
    heatMessage = "Add a primary overhead heat source with your thermostat.";
    missingEssentials.push("Primary overhead heat source");
  } else {
    heatMessage = "Add overhead heat and a thermostat. Probe goes inside the warm hide at snake level.";
    missingEssentials.push("Primary overhead heat source", "Thermostat");
  }
  score += heatPoints;
  checks.push({ key: "heating", label: "Heating + thermostat", passed: heatPoints >= 25, points: heatPoints, maxPoints: heatMax, message: heatMessage });

  const humidity = selections?.humidity || [];
  const hasMoss = humidity.some((h) => h && h.id === "sphagnum-moss");
  const hasHygrometer = humidity.some((h) => h && h.id === "hygrometer");
  const hasMister = humidity.some((h) => h && (h.id === "pressure-sprayer" || h.id === "auto-mister"));
  const humidMax = 15;
  let humidPoints = 0;
  let humidMessage;
  if (hasMoss && hasHygrometer && hasMister) {
    humidPoints = 15;
    humidMessage = "Humidity tools selected. Target 60-80% ambient daytime and 80-100% in the humid hide.";
  } else if (humidity.length > 0) {
    humidPoints = 6;
    humidMessage = "Add sphagnum moss, a hygrometer, and a sprayer or automatic mister to hold 60-80% humidity.";
    if (!hasMoss) missingEssentials.push("Sphagnum moss");
    if (!hasHygrometer) missingEssentials.push("Hygrometer");
    if (!hasMister) missingEssentials.push("Misting tool");
  } else {
    humidMessage = "Add humidity tools. Target 60-80% ambient humidity and 80-100% in the humid hide.";
    missingEssentials.push("Humidity tools");
  }
  score += humidPoints;
  checks.push({ key: "humidity", label: "Humidity tools", passed: humidPoints >= 15, points: humidPoints, maxPoints: humidMax, message: humidMessage });

  const hides = selections?.hides || [];
  const hideIds = new Set(hides.map((h) => h?.id).filter(Boolean));
  const hasWarm = hideIds.has("warm-hide");
  const hasCool = hideIds.has("cool-hide");
  const hasHumid = hideIds.has("humid-hide");
  const hideMax = 15;
  let hidePoints = hasWarm && hasCool && hasHumid ? 15 : (hasWarm || hasCool || hasHumid) ? 6 : 0;
  let hideMessage;
  if (hasWarm && hasCool && hasHumid) hideMessage = "All 3 essential hides (warm 90-95°F, cool 75-80°F, humid) selected.";
  else if (hides.length > 0) {
    hideMessage = "Warm, cool, and humid hides are all required.";
    if (!hasWarm) missingEssentials.push("Warm hide");
    if (!hasCool) missingEssentials.push("Cool hide");
    if (!hasHumid) missingEssentials.push("Humid hide");
  } else {
    hideMessage = "Add warm, cool, and humid hides.";
    missingEssentials.push("3 essential hides");
  }
  score += hidePoints;
  checks.push({ key: "hides", label: "Essential hides", passed: hidePoints >= 15, points: hidePoints, maxPoints: hideMax, message: hideMessage });

  const sub = selections?.substrate;
  const subMax = 10;
  let subPoints = 0;
  let subMessage;
  if (sub) {
    if (sub.id === "paper-towels") {
      subPoints = 4;
      subMessage = "Paper towels are quarantine/hatchling use only and do not hold humidity for adults.";
      warnings.push("Adults need 4\" of moisture-retentive substrate.");
    } else {
      subPoints = 10;
      subMessage = "Moisture-retentive substrate selected. Keep at least 4\" deep.";
    }
  } else {
    subMessage = "Select a 4\"+ moisture-retentive substrate. Avoid cedar, pine, and reptile carpet.";
    missingEssentials.push("Substrate");
  }
  score += subPoints;
  checks.push({ key: "substrate", label: "Substrate", passed: subPoints >= 10, points: subPoints, maxPoints: subMax, message: subMessage });

  const water = selections?.water || [];
  const monitoring = selections?.monitoring || [];
  const hasBowl = water.some((w) => w && w.id === "large-water-bowl");
  const hasGun = monitoring.some((m) => m && m.id === "temp-gun");
  const waterMax = 10;
  let waterPoints = hasBowl && hasGun ? 10 : hasBowl || hasGun ? 5 : 0;
  let waterMessage;
  if (hasBowl && hasGun) waterMessage = "Soaking water bowl and infrared temp gun selected.";
  else {
    waterMessage = "Add a large soaking water bowl and a temperature gun (warm hide 90-95°F, cool side 75-80°F).";
    if (!hasBowl) missingEssentials.push("Large soaking water bowl");
    if (!hasGun) missingEssentials.push("Infrared temperature gun");
  }
  score += waterPoints;
  checks.push({ key: "water", label: "Water & monitoring", passed: waterPoints >= 10, points: waterPoints, maxPoints: waterMax, message: waterMessage });

  const uvb = selections?.uvb;
  const uvbMax = 5;
  let uvbPoints = 0;
  let uvbMessage;
  if (uvb && uvb.id && uvb.id !== "no-uvb") {
    uvbPoints = 5;
    uvbMessage = "UVB selected. ReptiFiles recommends T5 HO 6% spanning the warm half of the enclosure.";
  } else if (uvb?.id === "no-uvb") {
    uvbPoints = 1;
    uvbMessage = "UVB skipped. Ball pythons can survive without it, but ReptiFiles strongly recommends UVB for welfare.";
    warnings.push("UVB is strongly recommended.");
  } else {
    uvbMessage = "Add T5 HO 6% UVB spanning the warm half of the enclosure.";
    warnings.push("UVB is strongly recommended.");
  }
  score += uvbPoints;
  checks.push({ key: "uvb", label: "UVB lighting", passed: uvbPoints >= 5, points: uvbPoints, maxPoints: uvbMax, message: uvbMessage });

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
  if (species === "bearded-dragon") return calculateBeardedDragonHabitatScore(selections);
  if (species === "ball-python") return calculateBallPythonHabitatScore(selections);
  return {
    score: 0,
    maxScore: MAX_SCORE,
    label: "Unsafe / Incomplete",
    checks: [],
    warnings: [],
    missingEssentials: [],
  };
}
