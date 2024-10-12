import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import PostsByUser from "@/components/PostsByUser";
import { getUserByClerkId } from "@/utils/dbUtils";

export default async function ProfilePage() {
  const user = await currentUser();
  const user_id = (await getUserByClerkId(user?.id as string)).user_id;
  return (
    <>
      <h1>My profile</h1>
      <SignedIn>
        {user?.hasImage ? (
          <Image alt="" src={user?.imageUrl} width={64} height={64} />
        ) : (
          ""
        )}
        <p>Welcome, {user?.username}</p>
        <h2>Your posts</h2>
        <PostsByUser user_id={user_id} />
      </SignedIn>
      <SignedOut>
        <p>You need to be signed in to view your profile</p>
      </SignedOut>
    </>
  );
}
