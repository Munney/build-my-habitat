import { NextResponse } from "next/server";

// System prompt with your research data
const getSystemPrompt = (species, currentBuild) => {
  let basePrompt = `You are an expert habitat assistant for HabitatBuilder.com. You provide research-backed, vet-verified advice about pet habitat setup and care.

IMPORTANT RULES:
- Always prioritize safety and animal welfare
- Reference current herpetological/aquatic research
- Be specific and actionable
- If you don't know something, say so
- Never recommend dangerous items (heat rocks, calcium sand, small bowls, etc.)
- Explain WHY, not just WHAT

`;

  if (species === "leopard-gecko") {
    basePrompt += `LEOPARD GECKO KNOWLEDGE:
- Minimum 20 gallons for adults (10-15 gallons are TOO SMALL)
- Require 3 hides: warm, cool, and humid
- Temperature gradient: 88-92°F basking, 70-75°F cool side
- Halogen or DHP (Deep Heat Projector) are best heat sources
- UVB is optional but beneficial
- Paper towels, slate tile, or safe loose substrate only
- NEVER recommend calcium sand (causes impaction)
- Supplements: Calcium with D3 (if no UVB) or pure calcium (if UVB)
- Feed insects dusted with supplements
`;
  } else if (species === "betta") {
    basePrompt += `BETTA FISH KNOWLEDGE:
- Minimum 5 gallons (bowls are TOO SMALL and dangerous)
- Require heater (78-80°F) and filter
- Sponge filters are best for bettas (gentle flow)
- Need hiding places (silk or live plants, not plastic)
- Cycle tank for 4-6 weeks before adding fish
- Test water parameters regularly
- Feed high-quality pellets or frozen foods
- Avoid overfeeding
`;
  }

  if (currentBuild) {
    basePrompt += `\nUSER'S CURRENT BUILD:\n${JSON.stringify(currentBuild, null, 2)}\n\nUse this context when answering questions about their specific setup.`;
  }

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
      temperature: 0.7,
      max_tokens: 500,
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

// Fallback responses when AI is not available
function getFallbackResponse(message, species, currentBuild) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! I'm here to help with your habitat setup. What would you like to know?";
  }

  if (lowerMessage.includes("temperature") || lowerMessage.includes("temp") || lowerMessage.includes("heat")) {
    if (species === "leopard-gecko") {
      return "Leopard geckos need a temperature gradient:\n\n• Basking spot: 88-92°F (use halogen or DHP)\n• Cool side: 70-75°F\n• Night: Can drop to 65-70°F\n\n⚠️ IMPORTANT: Always use a thermostat with any heat source to prevent burns!";
    } else if (species === "betta") {
      return "Betta fish need consistent water temperature:\n\n• Ideal: 78-80°F\n• Use an adjustable heater with a thermometer\n• Never let temperature drop below 75°F\n\nA heater is essential - bettas are tropical fish!";
    }
  }

  if (lowerMessage.includes("substrate") || lowerMessage.includes("floor")) {
    if (species === "leopard-gecko") {
      return "Safe substrates for leopard geckos:\n\n✅ Paper towels (safest, easiest)\n✅ Slate tile (natural look, easy clean)\n✅ Reptile carpet\n✅ Bioactive (advanced)\n\n❌ NEVER use calcium sand - it causes fatal impaction!";
    } else if (species === "betta") {
      return "Substrate options for betta tanks:\n\n✅ Bare bottom (easiest to clean)\n✅ Gravel (inert, safe)\n✅ Sand (fine, smooth)\n✅ Active plant soil (for live plants)\n\nAvoid sharp edges that could tear fins.";
    }
  }

  if (lowerMessage.includes("size") || lowerMessage.includes("gallon") || lowerMessage.includes("tank")) {
    if (species === "leopard-gecko") {
      return "Leopard gecko enclosure sizes:\n\n• Minimum: 20 gallons (30\" x 12\" x 12\")\n• Recommended: 40-gallon breeder (36\" x 18\" x 18\")\n• Ideal: 4x2x2 PVC (120 gallons)\n\n⚠️ 10-15 gallon tanks are TOO SMALL for adults!";
    } else if (species === "betta") {
      return "Betta fish tank sizes:\n\n• Minimum: 5 gallons\n• Recommended: 10 gallons or larger\n• Better: 20 gallons (more stable, easier to maintain)\n\n❌ Bowls and tanks under 5 gallons are dangerous and cause stress!";
    }
  }

  return "I'm still learning! For now, I can help with:\n\n• Temperature requirements\n• Substrate options\n• Tank/enclosure sizes\n• General setup questions\n\nTry asking about one of these topics, or check our guides page for detailed information!";
}

