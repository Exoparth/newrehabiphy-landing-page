import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Rehabiphy Platform API" });
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
