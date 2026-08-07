import { TeamOutlined } from "@ant-design/icons";
import NodeContent from "./NodeContent";

const RoleNode = ({ data }) => <NodeContent data={data} icon={<TeamOutlined />} type="role" />;

export default RoleNode;
