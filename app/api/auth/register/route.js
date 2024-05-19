import { NextResponse } from "next/server";
import validator from "@/app/api/auth/middelwares/userValidation/valid";
import bcrypt from "bcryptjs";
import { connect } from "@/app/api/dbconfig/mongoseConfig";
import User from "@/app/api/models/userModel";
import { errors } from "@vinejs/vine";
import { sendEmail } from "@/app/api/helpers/mailer/nodeMailerTransport";

// connecting mongo db

export async function POST(req) {
  await connect();
  let output = await req.json();

  try {
    const check = await validator.validate(output);
    const { FirstName, LastName, email, password } = check;

    // check if user exist

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 505 }
      );
    }

    // hasing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user and save it to the database

    const newUser = new User({
      username: FirstName + " " + LastName,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const userInfo = await User.findOne({ email: email });
    const userId = userInfo._id.valueOf();

    const mail = await sendEmail(email, userId, "verify");

    return NextResponse.json(
      { message: "We sent you an Email verify your email" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      const ValidError = error.messages[0].message;
      return NextResponse.json({ message: ValidError }, { status: 505 });
    }
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 505 }
    );
  }
}
