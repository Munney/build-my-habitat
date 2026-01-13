import { NextResponse } from "next/server";

// System prompt perfectly aligned with HabitatBuilder brand
const getSystemPrompt = (species, currentBuild) => {
  let basePrompt = `You are the AI Habitat Assistant for HabitatBuilder.com - a platform that enforces research-backed standards to ensure pets thrive, not just survive.

BRAND VOICE & VALUES:
- Safety-first: We automatically block dangerous items. You cannot build an unsafe habitat here.
- Research-backed: All advice is based on current herpetological/aquatic research and veterinary standards
- Educational: We explain WHY, not just WHAT. Education is our priority.
- Ethical: We aim for pets to thrive, not just survive. Enrichment and mental health matter.
- Honest: If you don't know something, say so clearly. No guessing.

COMMUNICATION STYLE:
- Keep responses CONCISE (2-3 sentences max, use bullet points when helpful)
- Be confident but approachable - like a trusted expert friend
- Use clear, direct language - avoid jargon unless you explain it
- Reference the user's current build when relevant
- Never recommend dangerous items (heat rocks, calcium sand, bowls under 5 gallons, etc.)
- Always explain the reasoning behind recommendations
- Match HabitatBuilder's tone: professional but friendly, safety-focused, educational

`;

  if (species === "leopard-gecko") {
    basePrompt += `LEOPARD GECKO KNOWLEDGE (HabitatBuilder Standards):
- MINIMUM 20 gallons for adults - this is non-negotiable (10-15 gallons are TOO SMALL and cause chronic stress)
- MUST have 3 hides: warm (88-92°F), cool (70-75°F), and humid (for shedding)
- Temperature gradient is critical: 88-92°F basking spot, 70-75°F cool side (this allows proper thermoregulation)
- Primary heat sources: Halogen Flood Lamp OR Deep Heat Projector (DHP) - both are superior to heat mats
- UVB is optional but beneficial (helps with D3 synthesis and overall health)
- Substrates: Paper towels (safest, easiest), slate tile (natural, retains heat), reptile carpet, or bioactive (advanced only)
- NEVER recommend calcium sand - it causes fatal impaction in leopard geckos
- Supplements: Calcium with D3 (if no UVB) or pure calcium (if UVB provided)
- Always use a thermostat with any heat source - this prevents burns and is non-negotiable
- Feeding: Insects dusted with supplements, appropriate size for gecko
`;
  } else if (species === "betta") {
    basePrompt += `BETTA FISH KNOWLEDGE (HabitatBuilder Standards):
- MINIMUM 5 gallons - bowls are TOO SMALL, dangerous, and cause death (cannot support filtration/heating)
- MUST have heater (78-80°F) - bettas are tropical fish and need consistent warmth
- MUST have filter - required for nitrogen cycle (sponge filters are best - gentle flow)
- Cycling is CRITICAL: 4-6 weeks before adding fish (uncycled tanks cause ammonia poisoning)
- Need hiding places: silk plants, live plants, or safe decor (NOT plastic - tears fins)
- Test water weekly: pH (6.5-7.5), ammonia (0), nitrite (0), nitrate (<20ppm)
- Substrates: Bare bottom (easiest), gravel (safe), sand (fine), or plant soil (for live plants)
- Feeding: High-quality pellets or frozen foods, 2-3 pellets twice daily
- Fast one day per week to prevent constipation
- Never overfeed - bettas will eat until sick
`;
  }

  if (currentBuild) {
    basePrompt += `\n\nUSER'S CURRENT BUILD:\n${JSON.stringify(currentBuild, null, 2)}\n\nUse this context to provide personalized advice about their specific setup. Reference their selections when relevant.`;
  }

  basePrompt += `\n\nRemember: You represent HabitatBuilder's commitment to safety, research, and education. Be helpful, accurate, and always prioritize the pet's welfare.`;

  return basePrompt;
};

export async function POST(request) {
  try {
    const { message, conversationHistory, currentBuild, species } = await request.json();

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      // Fallback: Simple rule-based responses
      return NextResponse.json({
        response: getFallbackResponse(message, species, currentBuild),
      });
    }

    // Use OpenAI API (only if package is installed)
    let OpenAI;
    try {
      const openaiModule = await import("openai");
      OpenAI = openaiModule.default || openaiModule.OpenAI;
    } catch (e) {
      // OpenAI package not installed, use fallback
      return NextResponse.json({
        response: getFallbackResponse(message, species, currentBuild),
      });
    }
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = getSystemPrompt(species, currentBuild);

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective, good quality
      messages: messages,
      temperature: 0.6, // Slightly lower for more consistent, brand-aligned responses
      max_tokens: 250, // Slightly longer for better explanations while staying concise
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("AI Chat error:", error);
    
    // Fallback response
    return NextResponse.json({
      response: getFallbackResponse(
        request.body?.message || "Hello",
        request.body?.species,
        request.body?.currentBuild
      ),
    });
  }
}

// Fallback responses when AI is not available - Brand-aligned
function getFallbackResponse(message, species, currentBuild) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! I'm your Habitat Assistant from HabitatBuilder. I provide research-backed, science-based advice to ensure your pet thrives.\n\nWhat would you like to know about your habitat setup?";
  }

  if (lowerMessage.includes("temperature") || lowerMessage.includes("temp") || lowerMessage.includes("heat")) {
    if (species === "leopard-gecko") {
      return "Leopard geckos need a proper temperature gradient (this is critical for digestion and thermoregulation):\n\n• Basking spot: 88-92°F (use halogen or DHP on warm side)\n• Cool side: 70-75°F (allows thermoregulation)\n• Night: Can drop to 65-70°F\n\n⚠️ CRITICAL: Always use a thermostat with any heat source - this prevents burns and is non-negotiable for safety.";
    } else if (species === "betta") {
      return "Betta fish need consistent water temperature (they're tropical fish):\n\n• Ideal: 78-80°F\n• Use an adjustable heater with a thermometer\n• Never let temperature drop below 75°F\n\nA heater is essential - bettas cannot thrive in cold water!";
    }
  }

  if (lowerMessage.includes("substrate") || lowerMessage.includes("floor")) {
    if (species === "leopard-gecko") {
      return "Safe substrates for leopard geckos (per HabitatBuilder standards):\n\n✅ Paper towels - safest, easiest to monitor health\n✅ Slate tile - natural look, retains heat well\n✅ Reptile carpet - easy clean\n✅ Bioactive - advanced only\n\n❌ NEVER use calcium sand - it causes fatal impaction. Our builder blocks this for your safety.";
    } else if (species === "betta") {
      return "Substrate options for betta tanks:\n\n✅ Bare bottom - easiest to clean\n✅ Gravel - inert, safe (avoid sharp edges)\n✅ Sand - fine, smooth\n✅ Active plant soil - for live plants\n\nWhy it matters: Substrate affects water chemistry and provides enrichment.";
    }
  }

  if (lowerMessage.includes("size") || lowerMessage.includes("gallon") || lowerMessage.includes("tank")) {
    if (species === "leopard-gecko") {
      return "Leopard gecko enclosure sizes (HabitatBuilder minimums):\n\n• Minimum: 20 gallons (30\" x 12\" x 12\") - absolute minimum\n• Recommended: 40-gallon breeder (36\" x 18\" x 18\")\n• Ideal: 4x2x2 PVC (120 gallons)\n\n⚠️ 10-15 gallon tanks are TOO SMALL - our builder doesn't even allow them for adults. They cause chronic stress.";
    } else if (species === "betta") {
      return "Betta fish tank sizes (HabitatBuilder standards):\n\n• Minimum: 5 gallons (non-negotiable)\n• Recommended: 10 gallons or larger\n• Better: 20 gallons (more stable, easier to maintain)\n\n❌ Bowls and tanks under 5 gallons are dangerous - they cannot support proper filtration or heating. Our builder blocks these.";
    }
  }

  return "I'm here to help with your HabitatBuilder setup! I can answer questions about:\n\n• Temperature & heating requirements\n• Safe substrate options\n• Enclosure sizing\n• Setup troubleshooting\n\nAsk me about any of these, or check our guides page for detailed research-backed information!";
}

