import Timestamp from "./Timestamp";
import UsernameWithFollowButton from "./UsernameWithFollowButton";

type Comment = {
  comment_id: number;
  body: string;
  created_at: Date;
  user_id: number;
};

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="m-2 max-w-fit rounded-xl bg-slate-100 p-2">
      <p>{comment.body}</p>
      <Timestamp timestamp={comment.created_at} />
      <UsernameWithFollowButton user_id={comment.user_id} />
    </div>
  );
}
