import PostCard from "@/components/CardPost/PostCard";
import Link from "next/link";
import "./Posts.css";
import useSWR from "swr";
import { PORTAL } from "@/server-info";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Posts() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(`${PORTAL.api_url}/posts`, fetcher);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-neutral-700 text-4xl flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-700 text-4xl flex justify-center items-center">
        Error loading posts.
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h2 className="posts-header">All Posts</h2>

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

// export async function getServerSideProps() {
//   const url = PORTAL.api_url + "/posts";
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch data, status code: ${res.status}`);
//     }
//     const data = await res.json();
//     return {
//       props: { posts: data },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         posts: [],
//       },
//     };
//   }
// }
