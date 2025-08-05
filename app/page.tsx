import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={10} itemCount={100} pageSize={10} />;
}
