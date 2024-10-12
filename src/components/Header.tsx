import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-8 bg-slate-500">
      <nav className="flex h-full items-center justify-center gap-4 pl-4">
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/posts/following">Following</Link>
        <Link href="/new">New Post</Link>
        <Link href="/profile">Profile</Link>
      </nav>
      <div className="flex-grow" />
      <div className="flex w-1/6 flex-col items-center justify-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
