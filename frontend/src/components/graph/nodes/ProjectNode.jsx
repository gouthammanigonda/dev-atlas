import { RocketOutlined } from "@ant-design/icons";
import NodeContent from "./NodeContent";

const ProjectNode = ({ data }) => <NodeContent data={data} icon={<RocketOutlined />} type="project" />;

export default ProjectNode;
