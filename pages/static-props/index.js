export async function getStaticProps() {
  // This function runs server-side at build time
  const data = { message: "Hello from Static Generation 12345!" };

  return {
    props: {
      data,
    },
  };
}

const StaticPropsPage = ({ data }) => {
  return (
    <div>
      <h1>Welcome to Next.js</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default StaticPropsPage;
