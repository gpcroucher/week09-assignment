import connect from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
const db = connect();

export async function checkAndSubmitUser() {
  const user = await currentUser(); // todo: save this to localstorage to avoid pinging clerk so often
  const clerk_id = user?.id as string;
  let dbResult;
  try {
    dbResult = await db.query(
      `INSERT INTO week09_users (clerk_id, username) VALUES ($1, $2) RETURNING user_id`,
      [clerk_id, user?.username],
    );
  } catch {
    dbResult = await db.query(
      `SELECT user_id FROM week09_users WHERE clerk_id = $1`,
      [clerk_id],
    );
  }
  return dbResult.rows[0].user_id as number;
}
