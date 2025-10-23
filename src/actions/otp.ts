"use server";

import { sendEmail } from "./email/sendEmail";

export async function sendOtpEmail(email: string, otp: string) {
  try {
    const emailPayload = {
      from: process.env.SMTP_USER || "noreply@example.com",
      to: email,
      subject: "Admin Access - OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); padding: 40px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #e50914; font-size: 28px; margin: 0;">Admin Access</h1>
              <p style="color: #ffffff; font-size: 16px; margin: 10px 0 0 0;">Netflix Portfolio Platform</p>
            </div>
            
            <div style="background: #1a1a1a; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
              <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 20px 0;">Your OTP Code</h2>
              <div style="background: #e50914; color: #ffffff; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; border-radius: 8px; letter-spacing: 8px; margin: 20px 0;">
                ${otp}
              </div>
              <p style="color: #cccccc; font-size: 14px; margin: 20px 0 0 0; text-align: center;">
                This code will expire in 10 minutes
              </p>
            </div>
            
            <div style="text-align: center;">
              <p style="color: #cccccc; font-size: 14px; margin: 0;">
                If you didn't request this code, please ignore this email.
              </p>
              <p style="color: #666666; font-size: 12px; margin: 20px 0 0 0;">
                This is an automated message from the Netflix Portfolio Admin System.
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: process.env.SMTP_USER || "noreply@example.com",
    };

    await sendEmail(emailPayload);

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return {
      success: false,
      error: "Failed to send OTP email",
    };
  }
}
