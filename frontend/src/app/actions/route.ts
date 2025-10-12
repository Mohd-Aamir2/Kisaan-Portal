import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// ⚠️ Replace with your own DB check
const USERS = [{ email: "farmer@example.com", password: "12345678" }];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  // send cookie
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { httpOnly: true });
  return res;
}
