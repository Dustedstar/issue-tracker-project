import Pagination from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const params = await searchParams;
  return (
    <Pagination
      currentPage={parseInt(params.page)}
      itemCount={100}
      pageSize={10}
    />
  );
}
