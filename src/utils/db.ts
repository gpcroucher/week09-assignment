import pg from "pg";
let db: pg.Pool;

export default function connect() {
  if (!db) {
    db = new pg.Pool({
      connectionString: process.env.DB_CONN_STRING,
    });
    return db;
  }
  return db;
}
