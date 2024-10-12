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

export async function getUserByClerkId(clerk_id: string) {
  const dbResult = await db.query(
    `SELECT * FROM week09_users WHERE clerk_id = $1`,
    [clerk_id],
  );
  if (dbResult.rowCount) {
    return dbResult.rows[0] as User;
  } else {
    throw new Error("no user was found with that clerk ID");
  }
}

export async function getUserById(user_id: number) {
  const dbResult = await db.query(
    `SELECT * FROM week09_users WHERE user_id = $1`,
    [user_id],
  );
  if (dbResult.rowCount) {
    return dbResult.rows[0] as User;
  } else {
    throw new Error("no user was found with that user ID");
  }
}

type User = {
  user_id: number;
  username: string;
  clerk_id: string;
};
