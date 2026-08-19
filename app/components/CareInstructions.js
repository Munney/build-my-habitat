"use client";

import { Heart, Calendar, Droplet, Thermometer, Utensils, AlertCircle } from "lucide-react";

export function CareInstructions({ species }) {
  const instructions = {
    "leopard-gecko": {
      title: "When You Get Your Leopard Gecko",
      icon: <Heart size={24} className="text-emerald-400" />,
      color: "emerald",
      sections: [
        {
          title: "Acclimation Period",
          icon: <Calendar size={18} />,
          items: [
            "Give your gecko 3-7 days to adjust before handling",
            "Keep handling minimal during the first week",
            "Observe from a distance to reduce stress",
            "Ensure all equipment is running properly before bringing them home"
          ]
        },
        {
          title: "Temperature Setup",
          icon: <Thermometer size={18} />,
          items: [
            "Set up your heating 24-48 hours before bringing your gecko home",
            "Verify basking spot reaches 88-92°F",
            "Cool side should be 70-75°F",
            "Use a digital thermometer to monitor temperatures",
            "Always use a thermostat with any heat source"
          ]
        },
        {
          title: "Feeding Schedule",
          icon: <Utensils size={18} />,
          items: [
            "Juveniles: Feed daily (5-7 small insects)",
            "Adults: Feed every 2-3 days (8-10 insects)",
            "Dust insects with calcium + D3 (if no UVB) or pure calcium (if UVB)",
            "Offer multivitamin 1-2 times per week",
            "Feed in the evening when geckos are most active"
          ]
        },
        {
          title: "Humidity & Hydration",
          icon: <Droplet size={18} />,
          items: [
            "Maintain humid hide at 70-80% humidity (use damp paper towel or sphagnum moss)",
            "Provide fresh water in a shallow dish daily",
            "Mist the humid hide daily, not the entire enclosure",
            "Monitor for proper shedding (should happen in one piece)"
          ]
        },
        {
          title: "Important Reminders",
          icon: <AlertCircle size={18} />,
          items: [
            "Never use heat rocks - they cause severe burns",
            "Avoid calcium sand - it causes fatal impaction",
            "Provide 3 hides minimum: warm, cool, and humid",
            "Spot clean daily, full substrate change weekly (if using paper towels)",
            "Watch for signs of stress: hiding constantly, not eating, tail dropping"
          ]
        }
      ]
    },
    "bearded-dragon": {
      title: "When You Get Your Bearded Dragon",
      icon: <Heart size={24} className="text-emerald-400" />,
      color: "emerald",
      sections: [
        {
          title: "Acclimation Period",
          icon: <Calendar size={18} />,
          items: [
            "Give your dragon 5–7 days to settle before handling",
            "Keep handling minimal the first week",
            "Ensure basking (95–105°F) and cool side (75–80°F) are correct before bringing them home",
            "UVB and heat should be on 10–12 hours per day",
          ]
        },
        {
          title: "Temperature & UVB",
          icon: <Thermometer size={18} />,
          items: [
            "Basking surface: 95–105°F (use a thermostat)",
            "Cool side: 75–80°F",
            "Night: 70–75°F (no basking light at night)",
            "T5 UVB 10–12% covering ~50% of enclosure; replace every 6–12 months",
            "Always use a thermostat with your heat source",
          ]
        },
        {
          title: "Feeding Schedule",
          icon: <Utensils size={18} />,
          items: [
            "Juveniles: 80% insects, 20% greens; feed insects 2–3x daily",
            "Adults: 20% insects, 80% greens; feed insects every 1–2 days",
            "Dust insects with calcium (no D3 if using UVB) 5x/week; multivitamin 2x/week",
            "Staple greens: collard, mustard, dandelion, turnip greens; avoid spinach/lettuce as staples",
          ]
        },
        {
          title: "Humidity & Hydration",
          icon: <Droplet size={18} />,
          items: [
            "Humidity 20–40%; avoid prolonged high humidity",
            "Provide a shallow water bowl; many dragons get hydration from greens and baths",
            "Optional: shallow bath 1–2x per week for hydration and shedding",
          ]
        },
        {
          title: "Important Reminders",
          icon: <AlertCircle size={18} />,
          items: [
            "UVB is required — without it they develop metabolic bone disease",
            "Never use heat without a thermostat",
            "Minimum enclosure: 4×2×2 ft (120 gallon equivalent)",
            "At least 2 hides (warm and cool side)",
            "Provide a basking platform so they can get within proper range of heat and UVB",
          ]
        }
      ]
    },
    "crested-gecko": {
      title: "When You Get Your Crested Gecko",
      icon: <Heart size={24} className="text-emerald-400" />,
      color: "emerald",
      sections: [
        {
          title: "Acclimation Period",
          icon: <Calendar size={18} />,
          items: [
            "Give your gecko 5–7 days to settle before handling",
            "Keep handling minimal the first week",
            "Confirm temps stay at or below 85°F before bringing them home",
            "Offer CGD on a lid or shallow dish after they have settled"
          ]
        },
        {
          title: "Temperature Setup",
          icon: <Thermometer size={18} />,
          items: [
            "Basking: 82-85°F maximum — never hotter",
            "Ambient daytime: 72-78°F",
            "Night: 65-72°F",
            "Always use a thermostat or dimmer; temps above 90°F can be fatal",
            "Place the probe at the gecko's highest basking point"
          ]
        },
        {
          title: "Humidity & Hydration",
          icon: <Droplet size={18} />,
          items: [
            "Mist morning and evening to spike humidity to 80%+",
            "Allow the enclosure to dry to 40-50% before the next misting",
            "Constant high humidity causes respiratory infection and mold",
            "Geckos drink droplets off leaves; keep a small water dish as backup"
          ]
        },
        {
          title: "Feeding Schedule",
          icon: <Utensils size={18} />,
          items: [
            "CGD is the primary diet — mix with water 1:2 and replace every 24–48 hours",
            "Juveniles: offer CGD daily",
            "Adults: offer CGD every other day",
            "Dust feeder insects with calcium without D3 if providing UVB",
            "Do not use calcium with D3 if UVB is present"
          ]
        },
        {
          title: "Important Reminders",
          icon: <AlertCircle size={18} />,
          items: [
            "Adult minimum enclosure is 18\"x18\"x24\" tall — never horizontal",
            "Temperature must NEVER exceed 85°F",
            "Provide hides and foliage at top, middle, and bottom",
            "Do not cohabitate males",
            "Watch for stuck shed, lethargy, and loss of appetite"
          ]
        }
      ]
    },
    "ball-python": {
      title: "When You Get Your Ball Python",
      icon: <Heart size={24} className="text-emerald-400" />,
      color: "emerald",
      sections: [
        {
          title: "Acclimation Period",
          icon: <Calendar size={18} />,
          items: [
            "Give your snake 7–14 days to settle before handling",
            "Keep handling minimal during the first two weeks",
            "Confirm temperatures and humidity before bringing them home",
            "Do not offer food until they have had several days to settle"
          ]
        },
        {
          title: "Temperature Setup",
          icon: <Thermometer size={18} />,
          items: [
            "Warm hide: 90-95°F",
            "Warm side ambient: 88-92°F",
            "Cool side: 75-80°F",
            "Night drop: no lower than 72°F",
            "Always use a thermostat; place the probe inside the warm hide at snake level — not on a heat mat surface"
          ]
        },
        {
          title: "Humidity & Hydration",
          icon: <Droplet size={18} />,
          items: [
            "Ambient humidity: 60-80% daytime, 80-100% at night",
            "Humid hide: 80-100% always, lined with damp sphagnum moss",
            "Keep substrate at least 4\" deep to hold moisture",
            "Provide a large soaking water bowl and change water every 2-3 days"
          ]
        },
        {
          title: "Feeding Schedule",
          icon: <Utensils size={18} />,
          items: [
            "Hatchlings: feed every 5–7 days",
            "Adults: feed every 10–14 days",
            "Offer appropriately sized prey (about as wide as the thickest part of the snake)",
            "Do not handle for 48 hours after feeding"
          ]
        },
        {
          title: "Important Reminders",
          icon: <AlertCircle size={18} />,
          items: [
            "Adult minimum enclosure is 4x2x2 (48\"L x 24\"W x 24\"H)",
            "Never use heat without a thermostat",
            "Heat mats are supplemental only — not a primary heat source for adults",
            "3 hides minimum: warm, cool, and humid",
            "Avoid cedar, pine, reptile carpet, aspen shavings, calcium sand, and gravel"
          ]
        }
      ]
    },
    "betta": {
      title: "When You Get Your Betta Fish",
      icon: <Heart size={24} className="text-blue-400" />,
      color: "blue",
      sections: [
        {
          title: "Tank Cycling (Critical!)",
          icon: <Calendar size={18} />,
          items: [
            "Cycle your tank for 4-6 weeks BEFORE adding your betta",
            "Add beneficial bacteria starter to kickstart the cycle",
            "Test water parameters daily during cycling",
            "Never add fish to an uncycled tank - it will cause ammonia poisoning"
          ]
        },
        {
          title: "Temperature & Water Quality",
          icon: <Thermometer size={18} />,
          items: [
            "Set up heater 24 hours before adding fish",
            "Maintain water temperature at 78-80°F",
            "Use water conditioner to remove chlorine/chloramine",
            "Test water weekly: pH (6.5-7.5), ammonia (0), nitrite (0), nitrate (<20ppm)",
            "Perform 25-30% water changes weekly"
          ]
        },
        {
          title: "Feeding Schedule",
          icon: <Utensils size={18} />,
          items: [
            "Feed 2-3 pellets twice daily (only what they can eat in 2 minutes)",
            "Fast one day per week to prevent constipation",
            "Soak pellets before feeding to prevent bloating",
            "Offer frozen or live foods 1-2 times per week as treats",
            "Never overfeed - bettas will eat until they're sick"
          ]
        },
        {
          title: "Acclimation Process",
          icon: <Droplet size={18} />,
          items: [
            "Float the betta's bag in the tank for 15-20 minutes",
            "Add small amounts of tank water to the bag every 5 minutes",
            "After 20 minutes, gently release the betta into the tank",
            "Turn off lights for the first 24 hours to reduce stress",
            "Don't feed for the first 24 hours"
          ]
        },
        {
          title: "Important Reminders",
          icon: <AlertCircle size={18} />,
          items: [
            "Never keep bettas in bowls - minimum 5 gallons required",
            "Avoid plastic plants - they tear fins (use silk or live plants)",
            "Ensure filter flow is gentle (bettas prefer calm water)",
            "Provide hiding places to reduce stress",
            "Watch for signs of illness: clamped fins, loss of color, not eating"
          ]
        }
      ]
    }
  };

  const care = instructions[species];
  if (!care) return null;

  const colorClasses = {
    emerald: {
      bg: "from-emerald-500/15 to-slate-900/60",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      iconBg: "bg-emerald-500/20",
      iconBorder: "border-emerald-500/30"
    },
    blue: {
      bg: "from-blue-500/15 to-slate-900/60",
      border: "border-blue-500/30",
      text: "text-blue-400",
      iconBg: "bg-blue-500/20",
      iconBorder: "border-blue-500/30"
    }
  };

  const colors = colorClasses[care.color];

  return (
    <div className={`relative p-6 rounded-3xl bg-gradient-to-br ${colors.bg} border-2 ${colors.border} shadow-xl overflow-hidden print-receipt-only-hidden`}>
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${care.color === "emerald" ? "from-emerald-400 via-cyan-400 to-emerald-500" : "from-blue-400 via-cyan-400 to-blue-500"} opacity-100`} />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 ${colors.iconBg} ${colors.text} rounded-xl shadow-lg border-2 ${colors.iconBorder}`}>
            {care.icon}
          </div>
          <h2 className={`${colors.text} font-black text-xl drop-shadow-sm`}>
            {care.title}
          </h2>
        </div>

        <div className="space-y-3 care-details-print">
          {care.sections.map((section, idx) => (
            <details key={idx} className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden group">
              <summary className="flex items-center gap-2 p-4 cursor-pointer list-none font-bold text-white text-sm tracking-wide hover:bg-white/5 transition-colors [&::-webkit-details-marker]:hidden">
                <div className={`${colors.text} opacity-80 shrink-0`}>
                  {section.icon}
                </div>
                <span>{section.title}</span>
              </summary>
              <div className="care-section-body px-4 pb-4 pt-0 ml-7">
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                      <span className={`${colors.text} shrink-0 -mt-0.5`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

