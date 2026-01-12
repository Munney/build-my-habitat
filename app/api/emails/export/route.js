import { NextResponse } from "next/server";
import { existsSync } from "fs";
import path from "path";

// Simple endpoint to export emails as CSV
// Access at: /api/emails/export

export async function GET(request) {
  try {
    const emailsFile = path.join(process.cwd(), "data", "emails.json");
    
    if (!existsSync(emailsFile)) {
      return NextResponse.json({ error: "No emails collected yet" }, { status: 404 });
    }

    const fs = require("fs");
    const content = fs.readFileSync(emailsFile, "utf8");
    const emails = content.trim() ? JSON.parse(content) : [];

    // Convert to CSV
    const csvHeader = "Email,Source,Lead Magnet,Date,Timestamp\n";
    const csvRows = emails.map(e => 
      `"${e.email}","${e.source || ""}","${e.leadMagnet || ""}","${e.date || ""}","${e.timestamp || ""}"`
    ).join("\n");

    const csv = csvHeader + csvRows;

    // Return as downloadable file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=emails-export.csv",
      },
    });
  } catch (error) {
    console.error("Error exporting emails:", error);
    return NextResponse.json(
      { error: "Error exporting emails" },
      { status: 500 }
    );
  }
}

