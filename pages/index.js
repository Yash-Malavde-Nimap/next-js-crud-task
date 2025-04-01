// HELLO YASH I AM FROM GITHUB

import Link from "next/link";
import "./index.css";

export const metaData = {
  title: "Next.js CRUD",
};

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <section className="main-body">
        <div className="main-heading">
          <h2>CRUD APP Using Next.js</h2>
        </div>

        <Button variant="secondary">
          <Link href="/posts">See All Posts</Link>
        </Button>
      </section>
    </>
  );
}
