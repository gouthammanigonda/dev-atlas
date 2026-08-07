import { Layout } from "antd";

import styles from "./MainLayout.module.css";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
