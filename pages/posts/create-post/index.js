import React from "react";
import { useForm } from "react-hook-form";
import "./createPost.css";
import { useRouter } from "next/router";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import { postDataAPI } from "@/pages/posts/_actions/post_actions.js";

export default function CreatePost() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      author: "",
      createdAt: "",
      tags: "",
      likes: [],
      comments: [],
    },
  });

  const onSubmit = async (data) => {
    // Split tags by comma and trim spaces
    const tagsArray = data.tags.split(",").map((tag) => tag.trim());

    // const name = FormData.get("name")

    const newPost = {
      id: "" + Date.now().toString(),
      title: data.title,
      description: data.description,
      author: data.author,
      createdAt: "" + new Date().toLocaleString(),
      tags: tagsArray,
      likes: data.likes,
      comments: data.comments,
      image_url:
        "https://img.freepik.com/free-photo/creative-copywriting-commercial-text-seo-editing_107791-15687.jpg?semt=ais_hybrid",
    };

    await postDataAPI(newPost);
    router.push("/posts");
  };

  return (
    <div className="create-post">
      <div className="create-post-container">
        <h2 className="form-title">Create New Post</h2>
        <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            name="title"
            type="text"
            register={register}
            required
            className="form-input"
            error={errors.title}
          />
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              {...register("description", { required: true })}
              className="form-input"
              rows="3"
            />
            {errors.description && (
              <span className="error-message">Description is required</span>
            )}
          </div>

          <Input
            label="Author"
            name="author"
            type="text"
            register={register}
            required
            className="form-input"
            error={errors.author}
          />

          {/* <Input
            label="Date"
            name="date"
            type="date"
            register={register}
            required
            className="form-input"
            error={errors.date}
          /> */}

          <Input
            label="Tags (comma separated)"
            name="tags"
            type="text"
            register={register}
            required
            className="form-input"
            error={errors.tags}
          />

          {/* <Input
            label="Likes"
            name="likes"
            type="number"
            register={register}
            required
            className="form-input"
            error={errors.likes}
          />

          <Input
            label="Comments"
            name="comments"
            type="number"
            register={register}
            required
            className="form-input"
            error={errors.comments}
          /> */}

          <Button label="Create Post" type="submit" className="submit-btn" />
        </form>
      </div>
    </div>
  );
}
