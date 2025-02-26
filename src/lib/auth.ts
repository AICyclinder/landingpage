import crypto from "crypto";

// In a real application, use a proper JWT library and store secrets in environment variables
const SECRET_KEY = "your-secret-key-change-this-in-production";
const ADMIN_PASSWORD = "admin123"; // Change this to a secure password in production

// Generate a simple token (in production, use proper JWT)
export function generateToken(): string {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    iat: Math.floor(Date.now() / 1000),
  };
  
  const payloadStr = JSON.stringify(payload);
  const hash = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payloadStr)
    .digest("hex");
  
  return Buffer.from(`${payloadStr}.${hash}`).toString("base64");
}

// Verify token
export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const [payloadStr, hash] = decoded.split(".");
    
    const expectedHash = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(payloadStr)
      .digest("hex");
    
    if (hash !== expectedHash) {
      return false;
    }
    
    const payload = JSON.parse(payloadStr);
    const now = Math.floor(Date.now() / 1000);
    
    return payload.exp > now;
  } catch (error) {
    return false;
  }
}

// Verify admin password
export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
} 