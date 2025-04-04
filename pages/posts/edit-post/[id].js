// import "./editPost.css";

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { PORTAL } from "@/server-info";
// import Button from "@/components/Buttons/Button";
// import Input from "@/components/Inputs/Input";
// import { editDataAPI } from "@/apiFetchers/api";

// export default function EditPost(post) {
//   // const newTags = `${[...post.tags]}`;
//   const newTags = post.tags.toString();

//   const [formData, setFormData] = useState({ ...post, tags: newTags });

//   const router = useRouter();
//   const { id } = router.query;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const tagsArray = formData.tags.split(",").map((tag) => tag.trim());

//     const newPost = {
//       title: formData.title,
//       description: formData.description,
//       author: formData.author,
//       date: new Date().toLocaleString(),
//       tags: tagsArray,
//       likes: parseInt(formData.likes),
//       comments: parseInt(formData.comments),
//       image_url:
//         "https://img.freepik.com/free-photo/creative-copywriting-commercial-text-seo-editing_107791-15687.jpg?semt=ais_hybrid",
//     };

//     await editDataAPI(newPost, id);

//     router.replace(`/posts/${post.id}`);
//   };

//   return (
//     <div className="edit-post">
//       <div className="edit-post-container">
//         <h2 className="form-title">Edit Post </h2>
//         <form className="edit-post-form" onSubmit={handleSubmit}>
//           <Input
//             label="Title"
//             name="title"
//             type="text"
//             value={formData.title}
//             onChange={handleChange}
//             className="form-input"
//           />

//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <textarea
//               name="description"
//               id="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="form-input"
//               rows="4"
//               lang=""
//               autoComplete="off"
//             />
//           </div>

//           <Input
//             label="Author"
//             name="author"
//             type="text"
//             value={formData.author}
//             onChange={handleChange}
//             className="form-input"
//           />

//           {/* <Input
//             label="Date"
//             name="date"
//             type="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="form-input"
//           /> */}

//           <Input
//             label="Tags (comma separated)"
//             name="tags"
//             type="text"
//             value={formData.tags}
//             onChange={handleChange}
//             className="form-input"
//           />

//           {/* <Input
//             label="Likes"
//             name="likes"
//             type="number"
//             value={formData.likes}
//             onChange={handleChange}
//             className="form-input"
//           />

//           <Input
//             label="Comments"
//             name="comments"
//             type="number"
//             value={formData.comments}
//             onChange={handleChange}
//             className="form-input"
//           /> */}

//           <Button label="Edit Post" type="submit" className="submit-btn" />
//         </form>
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   let url = PORTAL.api_url + `/posts/${id}`;
//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch data, status code: ${res.status}`);
//     }
//     const post = await res.json();
//     return { props: { ...post } };
//   } catch (error) {
//     console.log("GET by ID Error : ", error);
//   }
// }

import "./editPost.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { PORTAL } from "@/server-info";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Inputs/Input";
import { editDataAPI } from "@/apiFetchers/api";

export default function EditPost({ post }) {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title || "",
      description: post.description || "",
      author: post.author || "",
      tags: post.tags ? post.tags.join(", ") : "",
      likes: post.likes || 0,
      comments: post.comments || 0,
    },
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("description", post.description);
      setValue("author", post.author);
      setValue("tags", post.tags ? post.tags.join(", ") : "");
      setValue("likes", post.likes);
      setValue("comments", post.comments);
    }
  }, [post, setValue]);

  const onSubmit = async (data) => {
    const tagsArray = data.tags.split(",").map((tag) => tag.trim());

    const newPost = {
      ...post,
      title: data.title,
      description: data.description,
      author: data.author,
      updatedAt: new Date().toLocaleString(),
      tags: tagsArray,
      likes: parseInt(data.likes),
      comments: parseInt(data.comments),
      image_url:
        "https://img.freepik.com/free-photo/creative-copywriting-commercial-text-seo-editing_107791-15687.jpg?semt=ais_hybrid",
    };

    await editDataAPI(newPost, id);
    router.replace(`/posts/${id}`);
  };

  return (
    <div className="edit-post">
      <div className="edit-post-container">
        <h2 className="form-title">Edit Post</h2>
        <form className="edit-post-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            name="title"
            type="text"
            className="form-input"
            register={register}
            error={errors.title}
          />

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="form-input"
              rows="4"
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </div>

          <Input
            label="Author"
            name="author"
            type="text"
            register={register}
            error={errors.author}
            className="form-input"
          />

          <Input
            label="Tags (comma separated)"
            name="tags"
            type="text"
            register={register}
            error={errors.tags}
            className="form-input"
          />

          <Button label="Edit Post" type="submit" className="submit-btn" />
        </form>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.params;
  let url = `${PORTAL.api_url}/posts/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data, status code: ${res.status}`);
    }
    const post = await res.json();
    return { props: { post } };
  } catch (error) {
    console.log("GET by ID Error: ", error);
    return { props: { post: {} } };
  }
}
