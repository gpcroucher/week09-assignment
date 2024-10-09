import connect from "@/utils/db";

export default async function PostsPage() {
  const db = connect();

  async function getAllPosts() {
    const dbResult = await db.query(`SELECT * FROM week09_posts`);
    return dbResult.rows;
  }

  return (
    <>
      {(await getAllPosts()).map((post) => {
        return (
          <div key={post.post_id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        );
      })}
    </>
  );
}
