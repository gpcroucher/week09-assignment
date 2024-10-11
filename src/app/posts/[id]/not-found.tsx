import Link from "next/link";

export default function PostNotFoundPage() {
  return (
    <>
      <p>That post could not be found.</p>
      <Link href="/posts">View all posts</Link>
    </>
  );
}
