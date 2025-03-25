import "./editPost.css";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { PORTAL } from "@/server-info";

export default function EditPost(post) {
  const newTags = `${[...post.tags]}`;
  console.log(newTags);

  const [formData, setFormData] = useState({ ...post, tags: newTags });

  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = formData.tags.split(",").map((tag) => tag.trim());

    const newPost = {
      // id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      author: formData.author,
      date: formData.date,
      tags: tagsArray,
      likes: parseInt(formData.likes),
      comments: parseInt(formData.comments),
    };

    try {
      await fetch(`http://localhost:3001/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
    } catch (error) {
      console.error("Post Request Error : ", error);
    }

    // setFormData({
    //   title: "",
    //   description: "",
    //   author: "",
    //   date: "",
    //   tags: "",
    //   likes: 0,
    //   comments: 0,
    // });

    router.push(`/posts/${post.id}`);
  };

  return (
    <div className="edit-post">
      <div className="edit-post-container">
        <h2 className="form-title">Edit Post </h2>
        <form className="edit-post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-input"
              rows="4"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="likes">Likes</label>
            <input
              type="number"
              name="likes"
              id="likes"
              value={formData.likes}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <input
              type="number"
              name="comments"
              id="comments"
              value={formData.comments}
              onChange={handleChange}
              required
              className="form-input"
              autoComplete="off"
            />
          </div>

          <button type="submit" className="submit-btn">
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  let url = PORTAL.api_url + `/posts/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data, status code: ${res.status}`);
    }
    const post = await res.json();
    return { props: { ...post } };
  } catch (error) {
    console.log("GET by ID Error : ", error);
  }
}
