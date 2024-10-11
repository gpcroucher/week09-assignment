"use server";
import CommentForm from "@/components/CommentForm";
import Post from "@/components/Post";
import connect from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function IndividualPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post_id = params.id;

  const db = connect();
  const dbResult = await db.query(
    `SELECT * FROM week09_posts WHERE post_id = $1`,
    [post_id],
  );
  if (dbResult.rowCount === 0) notFound();
  const post = await dbResult.rows[0];

  const user = await currentUser(); // todo: save this to localstorage to avoid pinging clerk so often
  const username = user?.username as string;

  return (
    <>
      <Post post={post} />
      {(await getComments()).map(
        ({ comment_id, body, created_at, clerk_id }) => {
          return (
            <div key={comment_id} className="bg-slate-500">
              <p>{body}</p>
              <p>{format(created_at, "E do MMM y, kk:mm:ss")}</p>
              <p>{clerk_id}</p>
            </div>
          );
        },
      )}
      <CommentForm post_id={post_id} username={username} />
    </>
  );

  async function getComments() {
    const dbResult = await db.query(
      `SELECT * FROM week09_comments WHERE post_id = $1`,
      [post_id],
    );
    return await dbResult.rows;
  }
}

export async function serverSendComment(formData: FormData, post_id: string) {
  "use server";
  const body = formData.get("body") as string;
  console.log(body);
  const db = connect();
  const user = await currentUser(); // todo: save this to localstorage to avoid pinging clerk so often
  const clerk_id = user?.id as string;

  await db.query(
    `INSERT INTO week09_comments (body, post_id, clerk_id) VALUES ($1, $2, $3)`,
    [body, post_id, clerk_id],
  );
}
