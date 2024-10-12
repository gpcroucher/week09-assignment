import PostCard, { Post } from "./PostCard";
import connect from "@/utils/db";

export default async function PostsByUser({ user_id }: { user_id: number }) {
  const db = connect();
  const dbResult = await db.query(
    `SELECT * FROM week09_posts WHERE user_id = $1`,
    [user_id],
  );
  const posts = dbResult.rows;

  return (
    <div className="grid grid-cols-3">
      {posts.map((post: Post) => {
        return <PostCard key={post.post_id} post={post} />;
      })}
    </div>
  );
}
