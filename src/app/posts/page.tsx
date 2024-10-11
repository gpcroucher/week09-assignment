import Post from "@/components/Post";
import connect from "@/utils/db";

export default async function PostsPage() {
  const db = connect();

  async function getAllPosts() {
    const dbResult = await db.query(`SELECT * FROM week09_posts`);
    return dbResult.rows;
  }

  return (
    <div className="grid grid-cols-3">
      {(await getAllPosts()).map((post) => {
        return <Post key={post.post_id} post={post} />;
      })}
    </div>
  );
}
