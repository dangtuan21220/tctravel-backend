// get the client
import mysql from "mysql2/promise";

// create the connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "tctravel",
  // password: "pass"
});

export default pool;
