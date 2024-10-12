import Timestamp from "@/components/Timestamp";
import UsernameWithFollowButton from "@/components/UsernameWithFollowButton";

export type Post = {
  post_id: number;
  title: string;
  body: string;
  live_url: string | null;
  repo_url: string | null;
  created_at: Date;
  user_id: number;
};

type PostProps = {
  post: Post;
};

export default function PostCard({ post }: PostProps) {
  const { title, body, live_url, repo_url, created_at, user_id } = post;
  return (
    <div className="flex max-h-[70svh] flex-col border-2 border-blue-950">
      <h2 className="text-center text-4xl">{title}</h2>
      <p className="flex-1 overflow-y-scroll">{body}</p>
      {live_url ? (
        <p>
          <span className="italic">Website: </span>
          <a href={live_url} className="text-cyan-800 underline">
            {live_url}
          </a>
        </p>
      ) : (
        <></>
      )}
      {repo_url ? (
        <p>
          <span className="italic">Repo: </span>
          <a href={repo_url} className="text-cyan-800 underline">
            {repo_url}
          </a>
        </p>
      ) : (
        <></>
      )}
      <Timestamp timestamp={created_at} />
      <UsernameWithFollowButton user_id={user_id} />
    </div>
  );
}
