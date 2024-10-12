import LocalStorageSetter from "@/components/LocalStorageSetter";
import connect from "@/utils/db";
import { getCurrentUser } from "@/utils/dbUtils";

export default async function Home() {
  async function getFollowList() {
    const { user_id } = await getCurrentUser();
    const db = connect();
    const dbResult = await db.query(
      `SELECT followed_user_id FROM week09_follows WHERE user_id = $1`,
      [user_id],
    );
    const followList = dbResult.rows || [];
    return JSON.stringify(followList);
  }

  return (
    <div>
      <h1>Welcome to CommentForm</h1>
      <LocalStorageSetter key={"followList"} value={await getFollowList()} />
    </div>
  );
}
