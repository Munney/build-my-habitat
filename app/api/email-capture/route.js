import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Simple file-based email storage (no external service needed)
// Emails are saved to data/emails.json for easy access

export async function POST(request) {
  try {
    const { email, source, leadMagnet } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing emails
    const emailsFile = path.join(dataDir, "emails.json");
    let emails = [];
    
    if (existsSync(emailsFile)) {
      try {
        const fileContent = await import(emailsFile + "?update=" + Date.now());
        emails = fileContent.default || [];
      } catch (e) {
        // File might be empty or invalid, start fresh
        emails = [];
      }
    }

    // Try reading synchronously as fallback
    if (emails.length === 0 && existsSync(emailsFile)) {
      const fs = require("fs");
      try {
        const content = fs.readFileSync(emailsFile, "utf8");
        if (content.trim()) {
          emails = JSON.parse(content);
        }
      } catch (e) {
        // Start fresh if file is corrupted
        emails = [];
      }
    }

    // Check if email already exists
    const emailExists = emails.some(e => e.email.toLowerCase() === email.toLowerCase());
    
    if (!emailExists) {
      // Add new email
      emails.push({
        email: email.toLowerCase(),
        source,
        leadMagnet,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
      });

      // Save to file
      const fs = require("fs");
      fs.writeFileSync(emailsFile, JSON.stringify(emails, null, 2), "utf8");

      console.log(`✅ Email captured: ${email} (${source})`);
    } else {
      console.log(`⚠️ Email already exists: ${email}`);
    }

    // Optional: Send yourself an email notification (if you want)
    // You can set up a simple email notification later

    return NextResponse.json(
      { 
        success: true, 
        message: "Email captured successfully",
        total: emails.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to view collected emails (for your use only)
export async function GET(request) {
  try {
    const emailsFile = path.join(process.cwd(), "data", "emails.json");
    
    if (!existsSync(emailsFile)) {
      return NextResponse.json({ emails: [], total: 0 });
    }

    const fs = require("fs");
    const content = fs.readFileSync(emailsFile, "utf8");
    const emails = content.trim() ? JSON.parse(content) : [];

    return NextResponse.json({
      emails,
      total: emails.length
    });
  } catch (error) {
    console.error("Error reading emails:", error);
    return NextResponse.json(
      { error: "Error reading emails" },
      { status: 500 }
    );
  }
}
