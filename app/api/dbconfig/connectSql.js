import { createPool } from "mysql";

const conn = createPool({
  host: "49.12.122.233",
  user: "travelwavez_hsn-codes",
  password: "-R@t*+ciuev{",
  port: "3306",
  database: "travelwavez_users",
});

export default conn;
