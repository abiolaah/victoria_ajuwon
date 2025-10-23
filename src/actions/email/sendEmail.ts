"use server";

import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import ContactTemplate from "@/emails/ContactTemplate";
import { contactFormSchema } from "@/types/contactSchema";

type EmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo: string;
};

// Replace with your SMTP credentials
const smtpOptions = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "victoria.ajuwon0@gmail.com",
    pass: process.env.SMTP_PASSWORD || "password",
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    ...data,
  });
};

export async function sendContactEmailAction(formData: unknown) {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      issues: parsed.error.format(),
    };
  }

  const { name, email, phone, subject, message } = parsed.data;

  try {
    const html = await render(
      ContactTemplate({ name, subject, phone, email, message })
    );

    await sendEmail({
      from: email,
      to: process.env.SMTP_USER || "victoria.ajuwon0@gmail.com",
      subject,
      html,
      replyTo: email,
    });

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "Failed to send email",
    };
  }
}
