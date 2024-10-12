"use server";

import { currentUser } from "@clerk/nextjs/server";
import connect from "./db";
import { getUserByClerkId } from "./dbUtils";

export default async function followUser(followed_user_id: number) {
  "use server";
  const user = await currentUser(); // todo: save this to localstorage to avoid pinging clerk so often
  const user_id = (await getUserByClerkId(user?.id as string)).user_id;
  console.log("user_id:", user_id);

  const db = connect();
  try {
    await db.query(
      `INSERT INTO week09_follows (user_id, followed_user_id) VALUES ($1, $2)`,
      [user_id, followed_user_id],
    );
  } catch {}
}
