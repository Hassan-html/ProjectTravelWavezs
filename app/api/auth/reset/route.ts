import { sendEmail } from "@/app/api/helpers/mailer/nodeMailerTransport";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/app/api/dbconfig/mongoseConfig";
import User from "@/app/api/models/userModel";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;
  try {
    await connect();
    const user = await User.findOne({ email: email });
    await sendEmail(email, user._id, "reset");
    return NextResponse.json({ message: "Reset Password email sent" });
  } catch (error) {
    console.log("Error while sending rest psw mail: " + error);

    return NextResponse.json({ message: "Server experienced and error: " });
  }
}
