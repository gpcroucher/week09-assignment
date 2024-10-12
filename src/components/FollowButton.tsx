"use client";

import followUser from "@/utils/followUser";
import { useState } from "react";

export default function FollowButton({ user_id }: { user_id: number }) {
  const [following, setFollowing] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if (following) {
      return;
    }
    followUser(user_id);
    setFollowing(true);
  }

  return (
    <button
      className="rounded-md border-2 border-slate-600 bg-slate-300 text-black"
      onClick={handleClick}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
