import { getUserById } from "@/utils/dbUtils";
import FollowButton from "./FollowButton";

export default async function UsernameWithFollowButton({
  user_id,
}: {
  user_id: number;
}) {
  const user = await getUserById(user_id);
  return (
    <div className="flex gap-2">
      <p className="font-bold">{user.username}</p>
      <FollowButton user_id={user_id} />
    </div>
  );
}
