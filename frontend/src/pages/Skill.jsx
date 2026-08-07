import { useParams } from "react-router-dom";

import { MainLayout } from "../layouts";
import { useSkillGraph } from "../hooks";

export default function Skill() {
  const { name } = useParams();

  const { data, isLoading, error } = useSkillGraph(name);

  return (
    <MainLayout>
      <h1>{name}</h1>
    </MainLayout>
  );
}
