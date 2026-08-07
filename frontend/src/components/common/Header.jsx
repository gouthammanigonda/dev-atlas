import { Layout, Typography, Space, Button } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export default function Header() {
  return (
    <AntHeader
      style={{
        background: "#171A21",
        borderBottom: "1px solid #2A2F3A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 32,
      }}
    >
      <Title
        level={3}
        style={{
          color: "#fff",
          margin: 0,
        }}
      >
        DevAtlas
      </Title>

      <Space>
        <Button type="text">Documentation</Button>

        <Button type="primary">GitHub</Button>
      </Space>
    </AntHeader>
  );
}
