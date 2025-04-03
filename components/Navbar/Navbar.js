import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white/5 sticky p-5 top-0 left-0 flex justify-between items-center">
      <section>
        <Link href="/posts" className="text-white">
          My Posts
        </Link>
      </section>
      <section>
        <Link className="text-neutral-500" href="/">Home</Link>
        <Link className="text-neutral-500" href="/posts">Posts</Link>
        <Link className="text-neutral-500" href="/about">About</Link>
        <Link className="text-neutral-500" href="/training">Training</Link>
      </section>
    </nav>
  );
};

export default Navbar;
