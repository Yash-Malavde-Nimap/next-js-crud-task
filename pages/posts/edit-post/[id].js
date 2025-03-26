import "./editPost.css";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { PORTAL } from "@/server-info";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";

export default function EditPost(post) {
  // const newTags = `${[...post.tags]}`;
  const newTags = post.tags.toString();
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

    router.replace(`/posts/${post.id}`);
  };

  return (
    <div className="edit-post">
      <div className="edit-post-container">
        <h2 className="form-title">Edit Post </h2>
        <form className="edit-post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              label="Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
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
              lang=""
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <Input
              label="Author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Input
              label="Tags (comma separated)"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Input
              label="Likes"
              name="likes"
              type="number"
              value={formData.likes}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Input
              label="Comments"
              name="comments"
              type="number"
              value={formData.comments}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <Button label="Edit Post" type="submit" className="submit-btn" />
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
