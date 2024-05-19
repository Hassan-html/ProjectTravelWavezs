import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/app/api/dbconfig/mongoseConfig";
import { TicketModel } from "@/app/api/models/TicketModel";
export const POST = async (request: NextRequest) => {
  try {
    await connect();
    const data = await TicketModel.find({});
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.log("Error in public ticket getall api: " + error);
    return NextResponse.json({ message: "Error in server" }, { status: 500 });
  }
};
