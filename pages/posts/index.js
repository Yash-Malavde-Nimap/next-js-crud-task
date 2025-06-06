import Link from "next/link";
import "./Posts.css";
import useSWR from "swr";
import { PORTAL } from "@/server-info";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import PostCard from "@/components/CardPost/PostCard";


const fetcher = (url) => fetch(url).then((res) => res.json());
// const fetcher = async (url) => await axios.get(url);

export default function Posts() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(`${PORTAL.api_url}/posts`, fetcher);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
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
