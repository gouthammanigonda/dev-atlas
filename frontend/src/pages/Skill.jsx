import { useParams } from "react-router-dom";

import { MainLayout } from "../layouts";

export default function Skill() {
  const { name } = useParams();

  return (
    <MainLayout>
      <h1>{name}</h1>
    </MainLayout>
  );
}
