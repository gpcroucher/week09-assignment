import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky flex top-0 h-8 bg-slate-500">
      <nav className="pl-4 flex h-full flex-col items-center justify-center">
        <Link href="/">Home</Link>
      </nav>
      <div className="flex-grow" />
      <div className="w-1/6 flex flex-col items-center justify-center">
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
