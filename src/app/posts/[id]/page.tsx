import Post from "@/components/Post";
import connect from "@/utils/db";
import { notFound } from "next/navigation";

export default async function IndividualPostPage({
  params,
}: {
  params: { id: string | string[] };
}) {
  const id = params.id;
  const db = connect();

  const dbResult = await db.query(
    `SELECT * FROM week09_posts WHERE post_id = $1`,
    [id],
  );
  if (dbResult.rowCount === 0) notFound();
  const post = await dbResult.rows[0];

  return <Post post={post} />;
}
