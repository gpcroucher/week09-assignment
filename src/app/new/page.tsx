import connect from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewPostPage() {
  async function handleSubmit(formData: FormData) {
    "use server";

    // get form data, replacing empty strings with null
    const title = formData.get("title") ? formData.get("title") : null;
    const body = formData.get("body") ? formData.get("body") : null;
    const live_url = formData.get("live_url") ? formData.get("live_url") : null;
    const repo_url = formData.get("repo_url") ? formData.get("repo_url") : null;

    const db = connect();
    try {
      await db.query(
        `INSERT INTO week09_posts (title, body, live_url, repo_url, clerk_id) VALUES ($1, $2, $3, $4, $5)`,
        [title, body, live_url, repo_url, "doesn't matter yet"],
      );
    } catch {}

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form action={handleSubmit} className="border border-black bg-slate-400">
        <label htmlFor="titleInput">Title</label>
        <input type="text" name="title" id="titleInput" />
        <br />
        <label htmlFor="bodyInput">Your post</label>
        <textarea name="body" id="bodyInput" />
        <p>
          Optionally, add a link to your deployment and/or your source
          repository.
        </p>
        <label htmlFor="liveUrlInput">Deployment URL</label>
        <input type="text" name="live_url" id="liveUrlInput" />
        <label htmlFor="titleInput">Repository URL</label>
        <input type="text" name="repo_url" id="repoUrlInput" />
        <button>Submit Post</button>
      </form>
    </div>
  );
}
