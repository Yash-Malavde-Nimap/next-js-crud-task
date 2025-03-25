import PostCard from "@/components/CardPost/PostCard";
import Link from "next/link";
import "./Posts.css";
import { PORTAL } from "@/server-info";

export default function Posts({ posts }) {
  return (
    <div className="posts-container">
      <h6 className="posts-header">All Posts</h6>

      <div>
        <div className="mt-5">
          <Link href="/posts/create-post" className="add-post-link">
            Add Post
          </Link>
        </div>

        <div className="post-list-container">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="no-posts-message">No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const url = PORTAL.api_url + "/posts";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data, status code: ${res.status}`);
    }
    const data = await res.json();
    return {
      props: { posts: data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
