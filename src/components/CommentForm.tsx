"use client";
import { FormEvent } from "react";
import { serverSendComment } from "@/app/posts/[id]/page";

type CommentFormProps = {
  post_id: string;
  username: string;
};

export default function CommentForm({ post_id, username }: CommentFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    serverSendComment(formData, post_id);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="commentInput">Comment as {username}</label>
      <textarea name="body" id="bodyInput"></textarea>
      <button>Submit</button>
    </form>
  );
}
