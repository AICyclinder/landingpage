import { NextRequest, NextResponse } from "next/server";
import { generateToken, verifyAdminPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }
    
    const isValid = verifyAdminPassword(body.password);
    
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    
    const token = generateToken();
    
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
} 