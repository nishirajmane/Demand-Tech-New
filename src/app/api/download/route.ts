import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only key
);

export async function POST(req: Request) {
  try {
    const { email, fileName, resourceType } = await req.json();

    if (!email || !fileName) {
      return NextResponse.json({ error: "Missing email or fileName" }, { status: 400 });
    }

    // Get IP address and user agent from headers
    const ip_address = req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      req.headers.get('cf-connecting-ip') || 
                      'unknown';
    const user_agent = req.headers.get('user-agent') || 'unknown';

    // Save download data to Supabase
    const { data, error } = await supabase
      .from("downloads")
      .insert([{ 
        email, 
        file_name: fileName,
        file_path: null, // Can be added later if needed
        ip_address: ip_address.split(',')[0].trim(), // Get first IP if multiple
        user_agent,
        // Note: created_at will be automatically set by the database
      }])
      .select();

    if (error) throw error;

    // Configure Nodemailer (Zoho SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true, // SSL
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Determine recipient
    const recipient = process.env.MAIL_TO_ADDRESS || process.env.MAIL_FROM_ADDRESS;

    // Build email notification
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: recipient, // Send notification email
      subject: ` New File Download - ${fileName}`,
      html: `
        <h2> New File Download</h2>
        <p><b>Downloaded File:</b> ${fileName}</p>
        <p><b>Resource Type:</b> ${resourceType || "N/A"}</p>
        <p><b>Downloaded by Email:</b> ${email}</p>
        <p><b>IP Address:</b> ${ip_address.split(',')[0].trim()}</p>
        <p><b>User Agent:</b> ${user_agent}</p>
        <p><b>Download Time:</b> ${new Date().toLocaleString()}</p>
        <hr>
        <p><i>This notification was automatically generated when a user downloaded a file from your website.</i></p>
      `,
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Download tracked & notification sent successfully",
      data,
    });
  } catch (err: any) {
    console.error('Download tracking error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
