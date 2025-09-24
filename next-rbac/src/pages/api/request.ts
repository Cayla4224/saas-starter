import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { projectType, description, userEmail } = req.body;

  // Configure Nodemailer for MailerSend SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.MAILERSEND_SMTP_HOST,
    port: Number(process.env.MAILERSEND_SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.MAILERSEND_SMTP_USER,
      pass: process.env.MAILERSEND_SMTP_PASS,
    },
  });

  try {
    // Save project request to database
    await prisma.projectRequest.create({
      data: {
        projectType,
        description,
        userEmail,
      },
    });

    // Send notification email
    await transporter.sendMail({
      from: process.env.MAILERSEND_FROM,
  to: "admin@example.com",
      subject: `New Project Request: ${projectType}`,
      text: `Project Type: ${projectType}\nDescription: ${description}\nSubmitted by: ${userEmail}`,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to send email or save request" });
  }
}
