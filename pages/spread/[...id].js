import { useRouter } from 'next/router';

export default function Spread() {
  const router = useRouter();
  const { id } = router.query;

  console.log(router);
  console.log(router.query);

  if (!id) return <div>Loading...</div>; 

  return (
    <div>
      <h1>Post ID: {id.join(" / ")}</h1>
    </div>
  );
}
