"use client";

import { useState } from "react";
import { Download, Sparkles, CheckCircle2, X } from "lucide-react";
import jsPDF from "jspdf";

export function PremiumPDFExport({ buildName, items, total, species = "betta" }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const generatePremiumPDF = async () => {
    setIsGenerating(true);

    try {
      // Dynamic import jsPDF (client-side only)
      const { default: jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPos = 20;

      // Header with gradient effect (simulated)
      doc.setFillColor(16, 185, 129); // emerald-500
      doc.rect(0, 0, pageWidth, 40, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("HabitatBuilder", pageWidth / 2, 15, { align: "center" });
      
      doc.setFontSize(16);
      doc.text(buildName || `${species === "betta" ? "Betta" : "Leopard Gecko"} Setup`, pageWidth / 2, 28, { align: "center" });

      yPos = 50;

      // Build Details Section
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Complete Setup Checklist", 20, yPos);
      
      yPos += 10;
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 8;

      // Items List
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      items.forEach((item, index) => {
        if (yPos > pageHeight - 30) {
          doc.addPage();
          yPos = 20;
        }

        // Item number
        doc.setFillColor(59, 130, 246); // blue-500
        doc.circle(25, yPos, 6, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(String(index + 1), 25, yPos + 2, { align: "center" });

        // Item name
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const itemName = doc.splitTextToSize(item.label || "Unknown Item", pageWidth - 80);
        doc.text(itemName, 35, yPos);
        
        // Price
        doc.setFont("helvetica", "bold");
        doc.text(`$${(item.price || 0).toFixed(2)}`, pageWidth - 30, yPos, { align: "right" });

        yPos += Math.max(itemName.length * 5, 12);
      });

      // Total
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      
      yPos += 10;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 10;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Total:", pageWidth - 60, yPos);
      doc.text(`$${total.toFixed(2)}`, pageWidth - 20, yPos, { align: "right" });

      // Setup Instructions
      yPos += 20;
      if (yPos > pageHeight - 60) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Setup Instructions", 20, yPos);
      yPos += 10;
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const instructions = species === "betta" 
        ? [
            "1. Set up your tank in a stable location away from direct sunlight.",
            "2. Rinse substrate thoroughly before adding to tank.",
            "3. Install heater and set to 78-80°F. Use thermometer to verify.",
            "4. Set up filter (sponge filter recommended for bettas).",
            "5. Add decor and plants (silk or live plants only - no plastic).",
            "6. Fill with dechlorinated water.",
            "7. Cycle tank for 4-6 weeks before adding fish.",
            "8. Test water parameters regularly with API Master Test Kit."
          ]
        : [
            "1. Set up enclosure in a quiet location away from drafts.",
            "2. Install heating (Halogen or DHP) on one side for basking (88-92°F).",
            "3. Set up UVB lighting (ShadeDweller recommended).",
            "4. Add substrate (paper towels for beginners, tile or safe loose substrate for experienced).",
            "5. Place at least 3 hides (warm, cool, and humid hide).",
            "6. Add enrichment items (cork bark, branches).",
            "7. Set up feeding dishes and supplements.",
            "8. Monitor temperature and humidity daily."
          ];

      instructions.forEach(instruction => {
        if (yPos > pageHeight - 20) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(instruction, 25, yPos);
        yPos += 8;
      });

      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Generated by HabitatBuilder.com - Page ${i} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
      }

      // Save PDF
      const fileName = `${buildName || "Habitat Build"}_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);

      // Track analytics
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "premium_pdf_generated",
          species,
          item_count: items.length,
          total_price: total,
        });
      }

      setIsGenerating(false);
    } catch (error) {
      console.error("PDF generation error:", error);
      setIsGenerating(false);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={generatePremiumPDF}
        disabled={isGenerating}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download size={20} />
            Download Premium PDF
          </>
        )}
      </button>

      {showUpgrade && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowUpgrade(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-6">
              <Sparkles className="text-emerald-400 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-black text-white mb-2">Upgrade to Premium</h2>
              <p className="text-slate-300">Get beautiful PDF exports with images and detailed instructions</p>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-slate-800/50 rounded-xl">
                <h3 className="font-bold text-white mb-2">Premium PDF Includes:</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    Professional formatting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    Product images
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    Step-by-step setup instructions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    Care reminders
                  </li>
                </ul>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold rounded-xl">
                Coming Soon - $5 One-Time
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

