import Link from "next/link";
import React from "react";
import "./PostCard.css";

function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`} className="link">
      <div>
        <p className="post-title">{post.title}</p>

        <div className="meta-info">
          <p>
            <span className="author-label">Author: </span>
            {post.author}
          </p>
          <p>❤️ : {post.likes.length}</p>
        </div>
      </div>

      <div>
        <p className="post-description">
          {post.description.slice(0, 70)}
          {post.description.length > 70 ? "..." : ""}
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
