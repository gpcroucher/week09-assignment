"use server";
import { revalidatePath } from "next/cache";
import connect from "./db";
import { checkAndSubmitUser } from "./dbUtils";
import { redirect } from "next/navigation";

export async function serverSendComment(formData: FormData, post_id: string) {
  const body = formData.get("body") as string;
  const db = connect();

  const user_id = await checkAndSubmitUser();

  await db.query(
    `INSERT INTO week09_comments (body, post_id, user_id) VALUES ($1, $2, $3)`,
    [body, post_id, user_id],
  );

  revalidatePath(`/posts/${post_id}`);
  redirect(`/posts/${post_id}`);
}
