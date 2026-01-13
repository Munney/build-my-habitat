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

        <div className="space-y-6">
          {care.sections.map((section, idx) => (
            <div key={idx} className="bg-slate-900/40 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <div className={`${colors.text} opacity-80`}>
                  {section.icon}
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-2 ml-7">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                    <span className={`${colors.text} shrink-0 -mt-0.5`}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

