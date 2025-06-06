import "./PostID.css";
import { PORTAL } from "@/server-info";
import Dialog from "@/components/DialogBox/Dialog";
import { deleteAPI } from "@/pages/posts/_actions/post_actions";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
  let isAuthenticated = true;
  // console.log(isAuthenticated);

  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteAPI(id);
    router.push("/posts");
  };

  if (!post) {
    return <div>No post</div>;
  }

  return (
    <div className="main-body">
      <div className="container">
        <section className="headerSection">
          <h2 className="title">{post.title}</h2>
          <div className="details">
            <div className="left">
              <div className="metaInfo">
                <p className="metaText">
                  <strong>Author : </strong>
                  <span>{post.author}</span>
                </p>
                <p className="metaText">
                  <strong>Uploaded On : </strong>
                  <span>{post.createdAt}</span>
                </p>
                {post.updatedAt && (
                  <p className="metaText">
                    <strong>Updated At : </strong>
                    <span>{post.updatedAt}</span>
                  </p>
                )}
                <p className="metaText">
                  <strong>Likes : </strong>
                  <span>{post.likes.length}</span>
                </p>
                <p className="metaText">
                  <strong>Comments : </strong>
                  <span>{post.comments.length}</span>
                </p>
              </div>

              <div className="tagsSection">
                <strong>Tags :</strong>

                <ul className="tagsList">
                  {post.tags &&
                    post.tags.map((tag, index) => (
                      <Link
                        href={`/posts/category/${tag.split(" ").join("-").toLowerCase()}`}
                        key={index}
                        className="tag"
                      >
                        {tag}
                      </Link>
                    ))}
                </ul>
              </div>

              <div className="actionButtons">
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
              </div>
            </div>

            <div className="right">
              {/* <div className="like-share-buttons">
                <button className="like">Like</button>
                <button className="share">Share</button>
              </div> */}
              <Image
                className="right-image"
                src={post.image_url}
                height={200}
                width={200}
                priority={true}
                alt="1234"
              />
            </div>
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
