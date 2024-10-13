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
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-black bg-slate-100 p-2"
    >
      <label htmlFor="titleInput">Title</label>
      <input
        type="text"
        name="title"
        id="titleInput"
        className="m-1 rounded-md border border-slate-600"
      />
      <br />
      <div className="flex items-center">
        <label htmlFor="bodyInput">Your post</label>
        <textarea
          name="body"
          id="bodyInput"
          className="m-1 rounded-md border border-slate-600"
        />
      </div>

      <p>
        Optionally, add a link to your deployment and/or your source repository.
      </p>
      <label htmlFor="liveUrlInput">Deployment URL</label>
      <input
        type="text"
        name="live_url"
        id="liveUrlInput"
        className="m-1 rounded-md border border-slate-600"
      />
      <label htmlFor="titleInput">Repository URL</label>
      <input
        type="text"
        name="repo_url"
        id="repoUrlInput"
        className="m-1 rounded-md border border-slate-600"
      />
      <button className="m-1 rounded-md border border-slate-600 p-1">
        Submit Post
      </button>
    </form>
  );
}
