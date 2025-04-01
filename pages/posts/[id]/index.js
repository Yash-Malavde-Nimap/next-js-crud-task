import { useRouter } from "next/router";
import Link from "next/link";
import "./PostID.css";
import { PORTAL } from "@/server-info";
import Button from "@/components/Buttons/Button";
import Dialog from "@/components/DialogBox/Dialog";

export default function Post({ post }) {
  const router = useRouter();

  let isAuthenticated = false;

  const handleDelete = async (id) => {
    try {
      await fetch(`${PORTAL.api_url}/posts/${id}`, {
        method: "DELETE",
      });
      router.push("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return <div>No post</div>;
  }

  return (
    <div className="main-body">
      <div className="container">
        <section className="headerSection">
          <h2 className="title">{post.title}</h2>
          <div className="metaInfo">
            <p className="metaText">
              <strong>Author: </strong>
              <span>{post.author}</span>
            </p>
            <p className="metaText">
              <strong>Uploaded On: </strong>
              {post.date}
            </p>
            <p className="metaText">
              <strong>Likes: </strong>
              {post.likes}
            </p>
            <p className="metaText">
              <strong>Comments: </strong>
              {post.comments}
            </p>
          </div>

          <div className="tagsSection">
            <p>
              <strong>Tags:</strong>
            </p>
            <ul className="tagsList">
              {post.tags.map((tag, index) => (
                <li key={index} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="actionButtons">
            {/* <Link href={`/posts/edit-post/${post.id}`} className="editButton">
              Edit
            </Link> */}

            {isAuthenticated && (
              <>
                <Dialog button="edit" className="editButton" id={post.id} />
                <Dialog
                  button="delete"
                  className="deleteButton"
                  method={() => handleDelete(post.id)}
                />
              </>
            )}
            {/* <Button
              label="Delete"
              method={() => handleDelete(post.id)}
              className="deleteButton"
            /> */}
          </div>
        </section>

        <section className="descriptionSection">
          <p className="description">{post.description}</p>
        </section>
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
    return { props: { post } };
  } catch (error) {
    console.log("GET by ID Error : ", error);
  }
}
