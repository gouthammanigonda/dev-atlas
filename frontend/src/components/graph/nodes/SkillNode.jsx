import { CodeOutlined } from "@ant-design/icons";
import NodeContent from "./NodeContent";

const SkillNode = ({ data }) => <NodeContent data={data} icon={<CodeOutlined />} type="skill" selected={data.isSelected} />;

export default SkillNode;
