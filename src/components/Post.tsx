import { format } from "date-fns";

type Post = {
  post_id: number;
  title: string;
  body: string;
  live_url: string | null;
  repo_url: string | null;
  created_at: Date;
  clerk_id: string;
};

type PostProps = {
  post: Post;
};

export default function Post({ post }: PostProps) {
  const { title, body, live_url, repo_url, created_at, clerk_id } = post;
  console.log(created_at);
  return (
    <div className="flex max-h-[70svh] flex-col border-2 border-blue-950">
      <h2 className="text-center text-4xl">{title}</h2>
      <p className="flex-1 overflow-y-scroll">{body}</p>
      {live_url ? (
        <p>
          <span className="italic">Website: </span>
          {live_url}
        </p>
      ) : (
        <></>
      )}
      {repo_url ? (
        <p>
          <span className="italic">Repo: </span>
          {repo_url}
        </p>
      ) : (
        <></>
      )}
      <p className="italic text-gray-500">
        {format(created_at, "E do MMM y, kk:mm:ss")}
      </p>
      <p>{clerk_id}</p>
    </div>
  );
}
