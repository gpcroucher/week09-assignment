"use server";
import connect from "./db";
import { checkAndSubmitUser } from "./dbUtils";

export async function serverSendComment(formData: FormData, post_id: string) {
  "use server";
  const body = formData.get("body") as string;
  const db = connect();

  const user_id = await checkAndSubmitUser();

  await db.query(
    `INSERT INTO week09_comments (body, post_id, user_id) VALUES ($1, $2, $3)`,
    [body, post_id, user_id],
  );
}
