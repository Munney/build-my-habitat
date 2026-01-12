import { NextResponse } from "next/server";

// This endpoint collects emails and can integrate with Mailchimp, ConvertKit, etc.
// For now, it just stores them. You can add Mailchimp API integration later.

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

    // TODO: Integrate with your email service
    // Option 1: Mailchimp
    // Option 2: ConvertKit
    // Option 3: SendGrid
    // Option 4: Store in database for now

    // For now, just log it (you can add Mailchimp API call here)
    console.log("Email captured:", { email, source, leadMagnet, timestamp: new Date().toISOString() });

    // Example Mailchimp integration (uncomment and add your API key):
    /*
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    
    if (MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID) {
      const response = await fetch(
        `https://us1.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            tags: [source, leadMagnet],
          }),
        }
      );
      
      if (!response.ok) {
        const error = await response.json();
        console.error("Mailchimp error:", error);
      }
    }
    */

    // Return success
    return NextResponse.json(
      { success: true, message: "Email captured successfully" },
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

