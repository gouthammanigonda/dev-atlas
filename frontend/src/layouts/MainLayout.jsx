import { Layout } from "antd";
import Header from "../components/common/Header";

const { Content } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#0F1117",
      }}
    >
      <Header />

      <Content
        style={{
          padding: "40px",
          maxWidth: 1400,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
