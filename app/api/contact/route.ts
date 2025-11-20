import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "edge";

// Read env vars (provided by Cloudflare Pages)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // This will only show in server logs, not the client
  console.error(
    "Supabase env vars are missing. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  );
}

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

// Permissive, any-TLD email check (e.g., a@b.xyz, a+b@sub.domain.io)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, subject, message, email } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Supabase (DB log of all contact messages)
    if (supabase) {
      const { error: dbError } = await supabase.from("messages").insert([
        {
          name,
          email: email && EMAIL_REGEX.test(email) ? email : null,
          subject: subject || null,
          message,
          created_at: new Date().toISOString(),
          source: "contact_page",
        },
      ]);

      if (dbError) {
        console.error("Supabase insert failed:", dbError);
      }
    } else {
      console.error("Supabase client not initialised; skipping DB insert.");
    }

    // TODO (later): call an email API via fetch here (Resend / SendGrid).
    // Cannot use nodemailer in Edge runtime.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact route failed:", err);
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
