import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabaseServer";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Save data to Supabase
    const { data, error } = await supabaseServer
      .from("enquiries")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          work_email: body.workEmail,
          phone_country: body.phoneCountry,
          phone_number: body.phoneNumber,
          project_type: body.projectType,
          project_details: body.projectDetails,
          priority: body.priority,
          company_name: body.companyName,
          website: body.website,
          industry: body.industry,
          company_size: body.companySize,
          meeting_date: body.meetingDate || null,
          meeting_time: body.meetingTime || null,
          meeting_format: body.meetingFormat || null,
        },
      ])
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

    // Build email
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: recipient, // Send notification email
      subject: ` New Form Submission - ${body.firstName} ${body.lastName}`,
      html: `
        <h2> New Form Submission</h2>
        <p><b>Name:</b> ${body.firstName} ${body.lastName}</p>
        <p><b>Email:</b> ${body.workEmail}</p>
        <p><b>Phone:</b> ${body.phoneCountry} ${body.phoneNumber}</p>
        <p><b>Company:</b> ${body.companyName}</p>
        <p><b>Website:</b> ${body.website}</p>
        <p><b>Industry:</b> ${body.industry}</p>
        <p><b>Company Size:</b> ${body.companySize}</p>
        <p><b>Project Type:</b> ${body.projectType}</p>
        <p><b>Project Details:</b> ${body.projectDetails}</p>
        <p><b>Priority:</b> ${body.priority}</p>
        <p><b>Meeting Date:</b> ${body.meetingDate || "N/A"}</p>
        <p><b>Meeting Time:</b> ${body.meetingTime || "N/A"}</p>
        <p><b>Meeting Format:</b> ${body.meetingFormat || "N/A"}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Form submitted & email sent successfully",
      data,
    });
  } catch (err: any) {
    console.error("Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
