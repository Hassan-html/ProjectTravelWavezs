import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/app/api/dbconfig/mongoseConfig";
import { TicketModel } from "@/app/api/models/TicketModel";
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  try {
    await connect();
    console.log(body);
    const data = await TicketModel.findOne({ id: body.id });
    console.log(data);
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    console.log("Error in public ticket getall api: " + error);
    return NextResponse.json({ message: "Error in server" }, { status: 500 });
  }
};
