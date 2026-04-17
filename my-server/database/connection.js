import sqlite3 from "sqlite3";
import { open } from "sqlite";

//skaber en forbindelse med navn recipes.db og driver sqlite3
const connection = await open({
  filename: "users.db",
  driver: sqlite3.Database,
});

export default connection;
