import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT || "fnyimilongo@yahoo.fr";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sanitize = (s: string) => s?.trim().slice(0, 500) || "";

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `NTZ & KSD Website <onboarding@resend.dev>`,
      to: [RECIPIENT_EMAIL],
      replyTo: sanitize(email),
      subject: `Website inquiry: ${sanitize(subject)}`,
      text: [
        `Name: ${sanitize(name)}`,
        `Company: ${sanitize(company) || "—"}`,
        `Email: ${sanitize(email)}`,
        `Phone: ${sanitize(phone) || "—"}`,
        "",
        sanitize(message),
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}