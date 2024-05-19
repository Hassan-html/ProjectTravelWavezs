import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/app/api/dbconfig/mongoseConfig";
import { TicketModel } from "@/app/api/models/ticketModel";
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  try {
    await connect();
    const ticket = new TicketModel(body);
    const savedData = await ticket.save();
    console.log(savedData);

    return NextResponse.json(
      { message: "Your request arrive at the server" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while saving Ticket: " + error);
    return NextResponse.json(
      { message: "Server Experienced error" },
      { status: 500 }
    );
  }
};
