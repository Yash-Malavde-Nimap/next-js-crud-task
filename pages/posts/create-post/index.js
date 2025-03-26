import React, { useState } from "react";
import "./createPost.css";
import { useRouter } from "next/router";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    date: "",
    tags: "",
    likes: 0,
    comments: 0,
  });

  const router = useRouter();
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
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      author: formData.author,
      date: formData.date,
      tags: tagsArray,
      likes: parseInt(formData.likes),
      comments: parseInt(formData.comments),
    };

    try {
      await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
    } catch (error) {
      console.error("Post Request Error : ", error);
    }

    router.push("/posts");
  };

  return (
    <div className="create-post">
      <div className="create-post-container">
        <h2 className="form-title">Create New Post</h2>
        <form className="create-post-form" onSubmit={handleSubmit}>
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

          <Button label="Create Post" type="submit" className="submit-btn" />
        </form>
      </div>
    </div>
  );
}
