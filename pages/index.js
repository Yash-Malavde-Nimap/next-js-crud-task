// /* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import "./index.css";

export const metaData = {
  title: "Next.js CRUD",
};

import { Button } from "@/components/ui/button";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  // const router = useRouter();

  // let user;

  // useEffect(() => {
  //   user = JSON.parse(localStorage.getItem("authToken"));
  //   console.log(user);

  //   if (!user) {
  //     router.push("/login");
  //   }
  // }, [1]);

  return (
    <>
      <section className="main-body">
        <div className="left-div">
          <h2 className="left-heading">
            Empowering You with Knowledge in Tech and Beyond
          </h2>

          <p className="left-desc">
            Stay Ahead with the Latest in Tech, Trends, and Innovation
          </p>

          <div className="left-buttons">
            <Button variant="secondary" className="left-button">
              <Link href="/posts">Learn More</Link>
            </Button>

              <Button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  // window.location.reload();
                }}
                variant="destructive"
                className="logout-button"
              >
                Logout
              </Button>
                {/* {user && user.email ? (
                  ""
                ) : (
            )} */}
          </div>
        </div>

        <div className="right-div">
          <Image
            className="right-image hidden lg:flex"
            width={300}
            height={300}
            src="https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy_335657-2386.jpg?semt=ais_hybrid"
            alt=""
          />
        </div>
      </section>
    </>
  );
}
