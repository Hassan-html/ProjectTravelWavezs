import { NextResponse } from "next/server";
import { connect } from "../../dbconfig/mongoseConfig";
import User from "../../models/userModel";

connect();

export async function POST(req: any) {
  const Token = await req.json();
  const { token } = Token;
  try {
    const user = await User.findOne({ verifyToken: token });

    if (user) {
      const Expired = user.verifyTokenExpirey < new Date();
      if (Expired) {
        return NextResponse.json({ message: "Token Expired" }, { status: 505 });
      } else {
        user.isVerified = true;
        const updatedUser = await user.save();
        return NextResponse.json(
          { message: "Verification successfull" },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json({ message: "Invalid Request" }, { status: 505 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "some message" });
  }
}
