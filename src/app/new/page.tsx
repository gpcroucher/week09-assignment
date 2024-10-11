import connect from "@/utils/db";
import NewPostForm from "@/components/NewPostForm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default function NewPostPage() {
  async function serverHandleSubmit(formData: FormData) {
    "use server";
    // get user
    const user = await currentUser();
    const clerk_id = user?.id;

    // get form data, replacing empty strings with null
    const title = formData.get("title") ? formData.get("title") : null;
    const body = formData.get("body") ? formData.get("body") : null;
    const live_url = formData.get("live_url") ? formData.get("live_url") : null;
    const repo_url = formData.get("repo_url") ? formData.get("repo_url") : null;

    const db = connect();
    try {
      await db.query(
        `INSERT INTO week09_users (clerk_id, username) VALUES ($1, $2)`,
        [clerk_id, user?.username],
      );
    } catch {}

    await db.query(
      `INSERT INTO week09_posts (title, body, live_url, repo_url, clerk_id) VALUES ($1, $2, $3, $4, $5)`,
      [title, body, live_url, repo_url, clerk_id],
    );

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignedIn>
        <NewPostForm serverAction={serverHandleSubmit} />
      </SignedIn>
      <SignedOut>
        <Link href="/">Please sign in</Link>
      </SignedOut>
    </div>
  );
}
