import { BankOutlined } from "@ant-design/icons";
import NodeContent from "./NodeContent";

const CompanyNode = ({ data }) => <NodeContent data={data} icon={<BankOutlined />} type="company" />;

export default CompanyNode;
