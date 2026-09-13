import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const sanitize = (s: string) => s?.trim().slice(0, 500) || "";

    await db.message.create({
      data: {
        name: sanitize(name),
        company: sanitize(company),
        email: sanitize(email),
        phone: sanitize(phone),
        subject: sanitize(subject),
        message: sanitize(message),
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
