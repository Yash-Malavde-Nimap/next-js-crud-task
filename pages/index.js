// HELLO YASH I AM FROM GITHUB

import Link from "next/link";
import "./index.css";

export const metaData = {
  title: "Next.js CRUD",
};

export default function Home() {
  return (
    <>
      <section className="main-body">
        <div className="main-heading">
          <h2 >CRUD APP Using Next.js</h2>
        </div>

        <Link className="link-button" href="/posts">See All Posts</Link>
      </section>
    </>
  );
}
