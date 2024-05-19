import { connect } from "@/app/api/dbconfig/mongoseConfig";
import User from "@/app/api/models/userModel";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token, password } = body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await connect();
    const user = await User.findOne({ forgotPasswordToken: token });

    if (user.forgotPasswordTokenExpire < new Date()) {
      console.log("Expired Pasword reset token");
      return NextResponse.json({ message: "token expired" }, { status: 500 });
    } else {
      user.password = hashedPassword;
      const saved = await user.save();
      console.log(saved);
      return NextResponse.json(
        { message: "Password changed" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error in updating psw: " + error);

    return NextResponse.json({ message: "server Error" }, { status: 500 });
  }
}
