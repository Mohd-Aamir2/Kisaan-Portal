import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("📩 Incoming body:", body); // debug log

    // Validate required fields before creating user
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already in use" },
        { status: 400 }
      );
    }

    // ⚠️ In production: hash password with bcrypt
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      farmSize: body.farmSize,
      soilType: body.soilType,
      location: body.location,
      cropPreference: body.cropPreference,
    });

    console.log("✅ User created:", user);

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error: any) {
    console.error("❌ API Register Error:", error); // log full error
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
