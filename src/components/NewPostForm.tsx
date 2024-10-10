"use client";
import { FormEvent } from "react";

type NewPostFormProps = {
  serverAction: (formData: FormData) => Promise<void>;
};

export default function NewPostForm({ serverAction }: NewPostFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await serverAction(formData);
    } catch {
      alert("Please fill in all required fields and submit again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-black bg-slate-400">
      <label htmlFor="titleInput">Title</label>
      <input type="text" name="title" id="titleInput" />
      <br />
      <label htmlFor="bodyInput">Your post</label>
      <textarea name="body" id="bodyInput" />
      <p>
        Optionally, add a link to your deployment and/or your source repository.
      </p>
      <label htmlFor="liveUrlInput">Deployment URL</label>
      <input type="text" name="live_url" id="liveUrlInput" />
      <label htmlFor="titleInput">Repository URL</label>
      <input type="text" name="repo_url" id="repoUrlInput" />
      <button>Submit Post</button>
    </form>
  );
}
