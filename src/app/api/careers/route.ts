import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic"; // Required for file uploads

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = formData.get('name') as string;
    const email = formData.get('email') as string;
    const position = formData.get('position') as string || "";
    const file = formData.get('cvFile') as File;

    if (!fullName || !email || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ─── Supabase ──────────────────────────────────────────────
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Create bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === "resumes");
    
    if (!bucketExists) {
      const { error: bucketError } = await supabase.storage.createBucket("resumes", {
        public: false,
        allowedMimeTypes: ["application/pdf"],
        fileSizeLimit: 10485760 // 10MB
      });
      if (bucketError) {
        console.error("Bucket creation error:", bucketError);
        return NextResponse.json({ error: "Storage setup failed" }, { status: 500 });
      }
    }

    const fileBuffer = await file.arrayBuffer();
    const filePath = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, fileBuffer, { contentType: file.type });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("resumes").getPublicUrl(filePath);
    const fileUrl = publicUrlData?.publicUrl || "";

    const { error: dbError } = await supabase.from("cv_submissions").insert([
      { full_name: fullName, email, position, file_url: fileUrl },
    ]);
    if (dbError) throw dbError;

    // ─── Database record created successfully ─────────────────

    // ─── Email Notification ───────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: process.env.MAIL_TO_ADDRESS_HR,
      subject: `New CV Submission: ${fullName}`,
      html: `
        <h2>New CV Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><a href="${fileUrl}">Download CV</a></p>
      `,
    });

    return NextResponse.json({ success: true, message: "CV submitted and CRM notified" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
