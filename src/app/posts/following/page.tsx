import PostCard from "@/components/PostCard";
import { Post } from "@/components/PostCard";
import connect from "@/utils/db";
import { getCurrentUser } from "@/utils/dbUtils";

export default async function FollowingPage() {
  const db = connect();

  async function getFollowList() {
    const { user_id } = await getCurrentUser();
    const db = connect();
    const dbResult = await db.query(
      `SELECT followed_user_id FROM week09_follows WHERE user_id = $1`,
      [user_id],
    );
    const followList = [] as number[];
    for (const record of dbResult.rows as { followed_user_id: number }[]) {
      followList.push(record.followed_user_id);
    }
    return followList;
  }

  async function getAllFollowingPosts(followList: number[]) {
    const posts = [] as Post[];
    for (const entry of followList) {
      const dbResult = await db.query(
        `SELECT * FROM week09_posts WHERE user_id = $1`,
        [entry],
      );
      posts.push(...(dbResult.rows as Post[]));
    }
    return posts;
  }

  return (
    <div className="grid grid-cols-3">
      {(await getAllFollowingPosts(await getFollowList())).map((post) => {
        return <PostCard key={post.post_id} post={post} />;
      })}
    </div>
  );
}
