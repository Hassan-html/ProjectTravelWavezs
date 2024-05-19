import { NextResponse } from "next/server";
import { connect } from "@/app/api/dbconfig/mongoseConfig";
import User from "@/app/api/models/userModel";

connect();

export async function POST(req: any) {
  const Token = await req.json();
  const { token } = Token;
  try {
    const user = await User.findOne({ forgotPasswordToken: token });
    console.log(token, user);

    if (user) {
      const Expired = user.forgotPasswordTokenExpire < new Date();
      if (Expired) {
        console.log("Reset password Error: Token Expired");
        return NextResponse.json({ message: "Token Expired" }, { status: 505 });
      }
      return NextResponse.json({ message: token }, { status: 200 });
    } else {
      console.log("Reset password Error: User not found");
      return NextResponse.json({ message: "Invalid Request" }, { status: 505 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Server Expirenced Error While resting PSW",
    });
  }
}
