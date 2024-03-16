import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";


import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email} = reqBody;
    console.log(reqBody);

    //check if user is aleardy exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not  exist" },
        { status: 200 }
      );
    }


    //send verification email
    sendEmail({ email, emailtype: "RESET", userId: user._id });
    return NextResponse.json(
      { message: "Mail send  successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
