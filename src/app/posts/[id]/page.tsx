"use server";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import PostCard from "@/components/PostCard";
import connect from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
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
      <PostCard post={post} />
      {(await getComments()).map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
      <CommentForm post_id={post_id} username={username} />
    </>
  );

  async function getComments() {
    const dbResult = await db.query(
      `SELECT * FROM week09_comments WHERE post_id = $1`,
      [post_id],
    );
    return dbResult.rows;
  }
}
