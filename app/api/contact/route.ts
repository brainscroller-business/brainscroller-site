import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Permissive, any-TLD email check (e.g., a@b.xyz, a+b@sub.domain.io)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, subject, message, email } = body;

    if (!name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BrainScroller Contact" <${process.env.EMAIL_USER}>`,
      to: "brainscroller@gmail.com",
      subject: subject ? `[BrainScroller] ${subject}` : "New message from BrainScroller contact form",
      text: `📩 New BrainScroller Contact Message

From: ${name}
Email: ${email || "(not provided)"}
Subject: ${subject || "(none)"}

Message:
${message}

----------------------------------
Sent via BrainScroller Contact Page`,
      replyTo: email && EMAIL_REGEX.test(email) ? email : undefined,
    };

    await transporter.sendMail(mailOptions);

    const { error: dbError } = await supabase.from("messages").insert([
      {
        name,
        email: email || null,
        subject: subject || null,
        message,
        created_at: new Date().toISOString(),
        source: "contact_page",
      },
    ]);

    if (dbError) console.error("Supabase insert failed:", dbError);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
