import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, source } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const response = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        unsubscribed: false,
        audience_id: process.env.RESEND_AUDIENCE_ID,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      // Contact already exists — treat as success
      if (error.name === "validation_error") {
        return NextResponse.json({ success: true });
      }
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
