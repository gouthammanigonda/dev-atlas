import CompanyNode from "./CompanyNode";
import ProjectNode from "./ProjectNode";
import ResourceNode from "./ResourceNode";
import RoleNode from "./RoleNode";
import SkillNode from "./SkillNode";

export const nodeTypes = {
  skill: SkillNode,
  project: ProjectNode,
  resource: ResourceNode,
  role: RoleNode,
  company: CompanyNode,
};
