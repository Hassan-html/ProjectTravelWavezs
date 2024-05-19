import { connect } from "@/app/api/dbconfig/mongoseConfig";
import { TicketModel } from "@/app/api/models/TicketModel";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  let { tickets } = body;
  const id = tickets._id;
  const data = { tickets: tickets.tickets, details: tickets.details };
  try {
    await connect();
    console.log(body);
    const ticket = await TicketModel.findByIdAndUpdate({ _id: id }, data);
    console.log(ticket);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error iN delete api: " + error);
    return NextResponse.json({ message: "Error in Deleting" }, { status: 500 });
  }
};
