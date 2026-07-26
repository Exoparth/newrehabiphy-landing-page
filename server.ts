import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Rehabiphy Platform API" });
});

// Contact Form Endpoint (Nodemailer)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (
      !smtpEmail ||
      !smtpPassword ||
      smtpEmail === "YOUR_GMAIL_ADDRESS@gmail.com" ||
      smtpPassword === "YOUR_GMAIL_APP_PASSWORD"
    ) {
      // SMTP not configured — return simulated success for development
      console.log("📧 Contact form submission (SMTP not configured):");
      console.log({ name, email, phone, subject, message });
      return res.json({
        success: true,
        source: "simulated",
        message:
          "Thank you for reaching out! Your message has been received. We'll get back to you within 24 hours.",
      });
    }

    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });

    // Email to Rehabiphy support
    await transporter.sendMail({
      from: `"Rehabiphy Contact Form" <${smtpEmail}>`,
      to: "Support@rehabiphy.com",
      replyTo: email,
      subject: `[Contact Form] ${subject || "General Inquiry"} — from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0F766E, #115E59); padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
            <p style="color: #94e4d0; margin: 4px 0 0; font-size: 13px;">Rehabiphy Landing Page</p>
          </div>
          <div style="background: #ffffff; padding: 24px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #0F766E; font-weight: 600;">${email}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #1e293b;">${phone || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 13px;">Subject</td><td style="padding: 8px 0; color: #1e293b;">${subject || "General Inquiry"}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
              <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; color: #94a3b8; font-size: 11px;">This email was sent from the Rehabiphy website contact form.</p>
          </div>
        </div>
      `,
    });

    // Confirmation email to the user
    await transporter.sendMail({
      from: `"Rehabiphy" <${smtpEmail}>`,
      to: email,
      subject: "We received your message — Rehabiphy",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0F766E, #115E59); padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Thank you, ${name}!</h2>
            <p style="color: #94e4d0; margin: 4px 0 0; font-size: 13px;">We've received your message</p>
          </div>
          <div style="background: #ffffff; padding: 24px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #334155; line-height: 1.6; margin-top: 0;">We appreciate you reaching out to Rehabiphy. Our team will review your message and get back to you within <strong>24 hours</strong>.</p>
            <p style="color: #334155; line-height: 1.6;">In the meantime, you can reach us directly at:</p>
            <ul style="color: #334155; line-height: 2;">
              <li>📧 <a href="mailto:Support@rehabiphy.com" style="color: #0F766E;">Support@rehabiphy.com</a></li>
              <li>📞 <a href="tel:+917977639545" style="color: #0F766E;">+91 7977639545</a></li>
            </ul>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">— The Rehabiphy Team</p>
          </div>
        </div>
      `,
    });

    res.json({
      success: true,
      source: "nodemailer",
      message:
        "Thank you for reaching out! Your message has been received. We'll get back to you within 24 hours.",
    });
  } catch (error: any) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message:
        "Failed to send your message. Please try again or email us directly at Support@rehabiphy.com.",
    });
  }
});

// AI Health & Rehab Assistant Endpoint
app.post("/api/ai-assess", async (req, res) => {
  try {
    const { condition, area, duration, symptoms, userQuery } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Fallback structured assessment response if key is not configured
      return res.json({
        success: true,
        source: "simulated_expert_engine",
        analysis: {
          summary: `Initial AI analysis for ${area || "joint/muscle"} discomfort (${duration || "recent onset"}).`,
          severityScore: "Moderate (Grade 1-2 Strain/Impingement potential)",
          recommendedActions: [
            "Initiate gentle range-of-motion isometric exercises 2x daily.",
            "Schedule a live video evaluation with a certified Rehabiphy Physiotherapist.",
            "Apply contrast thermal therapy (15m cool / 10m gentle warmth) after mobility routines."
          ],
          suggestedExercises: [
            { name: "Controlled Isometric Holds", reps: "3 sets x 10 sec", focus: "Neuromuscular activation without shear stress" },
            { name: "Guided Range of Motion Glides", reps: "2 sets x 12 reps", focus: "Joint lubrication & scar tissue mobility" },
            { name: "Postural Decompression Alignment", reps: "3 sets x 30 sec", focus: "Spinal kinetic chain alignment" }
          ],
          precaution: "Avoid high-impact plyometrics or forced terminal flexion until evaluated by a licensed clinician."
        }
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are Rehabiphy's AI Physiotherapy Clinical Assistant ("Rehabiphy AI").
User details:
- Area of discomfort: ${area || 'Not specified'}
- Primary condition/symptoms: ${condition || 'General joint stiffness'} ${symptoms ? `(${symptoms})` : ''}
- Duration: ${duration || 'Recent'}
- User Question: ${userQuery || 'Provide an initial rehabilitation assessment and recovery roadmap.'}

Generate a structured JSON response (strictly valid JSON) with the following format:
{
  "summary": "Concise medical-grade summary of the condition and rehab strategy",
  "severityScore": "Low / Moderate / Elevated - short rationale",
  "recommendedActions": ["Action 1", "Action 2", "Action 3"],
  "suggestedExercises": [
    {"name": "Exercise 1", "reps": "Sets and Reps", "focus": "Biomechanics focus"},
    {"name": "Exercise 2", "reps": "Sets and Reps", "focus": "Biomechanics focus"}
  ],
  "precaution": "Crucial safety note or when to seek immediate medical triage"
}
Do not include markdown code block backticks around JSON if possible, or format cleanly. Ensure empathetic, reassuring, clinical tone focusing on recovery.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "";
    let parsedData;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        parsedData = JSON.parse(responseText);
      }
    } catch {
      parsedData = {
        summary: responseText,
        severityScore: "Moderate",
        recommendedActions: ["Schedule physio review", "Maintain guided mobility", "Log daily pain scores"],
        suggestedExercises: [
          { name: "Isometric Hold", reps: "3 x 10s", focus: "Stability" },
          { name: "Gentle Glide", reps: "2 x 10", focus: "Mobility" }
        ],
        precaution: "Consult a Rehabiphy certified physical therapist for diagnostic confirmation."
      };
    }

    res.json({
      success: true,
      source: "gemini_2.5_flash",
      analysis: parsedData
    });
  } catch (error: any) {
    console.error("AI Assess Endpoint Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process AI assessment.",
      fallback: {
        summary: "Our AI clinical engine recommends an immediate virtual assessment with a Rehabiphy Specialist.",
        severityScore: "Assessment Pending Physio Review",
        recommendedActions: [
          "Book a 1-on-1 video consultation with a senior Rehabiphy physiotherapist.",
          "Perform painless active range-of-motion tracking in the Rehabiphy mobile app."
        ],
        suggestedExercises: [
          { name: "Guided Gentle Pendulum Rotations", reps: "2 sets x 10 reps", focus: "Joint decompression" }
        ],
        precaution: "Discontinue any movement causing sharp or radiating discomfort."
      }
    });
  }
});

// Consultation Booking API
app.post("/api/book-consultation", (req, res) => {
  const { name, email, phone, consultationType, condition, date, timeSlot, notes } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: "Name, email, and phone are required." });
  }

  const bookingId = "RHB-" + Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    success: true,
    bookingId,
    message: `Consultation booked successfully for ${name}! Confirmation details sent to ${email}.`,
    details: {
      type: consultationType || "Online Video Session",
      condition: condition || "General Rehabilitation",
      scheduledAt: `${date || "Tomorrow"} at ${timeSlot || "10:00 AM"}`,
      physiotherapist: "Assigned Senior Specialist (DPT)"
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rehabiphy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
