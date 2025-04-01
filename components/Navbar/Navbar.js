import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white/5 sticky p-5 top-0 left-0 flex justify-between items-center">
      <section>
        <a href="/posts" className="text-white">My Posts</a>
      </section>
      <section >
        <a className="text-neutral-500" href="/"></a>
        <a className="text-neutral-500" href="/posts"></a>
        <a className="text-neutral-500" href="/about"></a>
        <a className="text-neutral-500" href="/training"></a>
      </section>
    </nav>
  );
};

export default Navbar;
