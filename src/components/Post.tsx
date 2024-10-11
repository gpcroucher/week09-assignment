import Timestamp from "@/components/Timestamp";

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
      <p>{clerk_id}</p>
    </div>
  );
}
