import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// Define the data file path
const dataFilePath = path.join(process.cwd(), "data", "early-access.json");

// Ensure the data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
};

// Type for form submission
type EarlyAccessSubmission = {
  id: string;
  name: string;
  email: string;
  company: string;
  organizationType: string;
  useCase: string;
  createdAt: string;
};

// Email configuration
const sendEmail = async (submission: Omit<EarlyAccessSubmission, "id" | "createdAt">) => {
  try {
    // This is a simple example. In production, use environment variables for credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "work@aicyclinder.com", // Replace with your actual email
        pass: process.env.EMAIL_PASSWORD, // Set this in your environment variables
      },
    });

    await transporter.sendMail({
      from: '"AICyclinder Platform" <work@aicyclinder.com>',
      to: "work@aicyclinder.com",
      subject: `New Early Access Request from ${submission.name} | AI Agent Solutions`,
      html: `
        <h2>New Early Access Request for AI Agent Solutions</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Company:</strong> ${submission.company}</p>
        <p><strong>Organization Type:</strong> ${submission.organizationType || "Not provided"}</p>
        <p><strong>Use Case:</strong> ${submission.useCase || "Not provided"}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    // Don't throw here, we still want to save the submission even if email fails
  }
};

export async function POST(request: NextRequest) {
  try {
    // Ensure data directory exists
    ensureDataDir();
    
    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { message: "Name, email, and company are required" },
        { status: 400 }
      );
    }
    
    // Create submission object
    const submission: EarlyAccessSubmission = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      company: body.company,
      organizationType: body.organizationType || "",
      useCase: body.useCase || "",
      createdAt: new Date().toISOString(),
    };
    
    // Read existing data
    let submissions: EarlyAccessSubmission[] = [];
    try {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      submissions = JSON.parse(fileData);
    } catch (error) {
      // If file doesn't exist or is invalid, start with empty array
      submissions = [];
    }
    
    // Add new submission
    submissions.push(submission);
    
    // Write updated data back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(submissions, null, 2));
    
    // Send email notification
    await sendEmail({
      name: body.name,
      email: body.email,
      company: body.company,
      organizationType: body.organizationType || "",
      useCase: body.useCase || "",
    });
    
    return NextResponse.json(
      { message: "Early access request submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing early access request:", error);
    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
} 