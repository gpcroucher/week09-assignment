import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function ProfilePage() {
  const user = await currentUser();
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
      </SignedIn>
      <SignedOut>
        <p>You need to be signed in to view your profile</p>
      </SignedOut>
    </>
  );
}
