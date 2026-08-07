import { ReadOutlined } from "@ant-design/icons";
import NodeContent from "./NodeContent";

const ResourceNode = ({ data }) => <NodeContent data={data} icon={<ReadOutlined />} type="resource" />;

export default ResourceNode;
