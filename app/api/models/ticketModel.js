import { Schema } from "mongoose";
import mongoose from "mongoose";
const TicketSchema = new Schema({}, { strict: false });

export const TicketModel =
  mongoose.models.tickets || mongoose.model("tickets", TicketSchema);
