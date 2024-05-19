import { connect } from "@/app/api/dbconfig/mongoseConfig";
import { TicketModel } from "@/app/api/models/TicketModel";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { id } = body;
  console.log(body, id);
  try {
    await connect();
    const ticket = await TicketModel.findByIdAndDelete({ _id: id });
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error iN delete api: " + error);
    return NextResponse.json({ message: "Error in Deleting" }, { status: 500 });
  }
};
