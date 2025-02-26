import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyToken } from "@/lib/auth";

// Define the data file path
const dataFilePath = path.join(process.cwd(), "data", "early-access.json");

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(" ")[1];
    const isValid = verifyToken(token);
    
    if (!isValid) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Check if data file exists
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json([]);
    }
    
    // Read data file
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    const submissions = JSON.parse(fileData);
    
    // Sort by date (newest first)
    submissions.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { message: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
} 