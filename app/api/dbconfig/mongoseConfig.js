import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.mongo_url);
    const connection = mongoose.connection;
    connection.on("conneted", () => {
      console.log("connected mongodb");
    });
    connection.on("error", (err) => {
      console.log("ERROR WHILE CONNECTING MONGO: " + err);
      process.exit();
    });
  } catch (error) {
    console.log("An error occured: " + error);
  }
}
