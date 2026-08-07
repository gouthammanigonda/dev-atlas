import { MainLayout } from "../layouts";
import { SearchBar } from "../components/common";

export default function Home() {
  return (
    <MainLayout>
      <div
        style={{
          maxWidth: 700,
          margin: "100px auto",
        }}
      >
        <h1>Explore Developer Skills</h1>

        <SearchBar />
      </div>
    </MainLayout>
  );
}
