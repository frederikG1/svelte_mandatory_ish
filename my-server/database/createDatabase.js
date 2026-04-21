import db from "./connection.js";

const deleteMode = process.argv.includes("--delete");

if (deleteMode) {
  await db.exec(`DROP TABLE IF EXISTS users`);
}

await db.exec(`
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )
`);

export default db;
