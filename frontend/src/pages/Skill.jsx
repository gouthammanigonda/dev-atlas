import { useParams } from "react-router-dom";
import { Breadcrumb, Button, Col, Empty, Result, Row } from "antd";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { MainLayout } from "../layouts";
import {
  GraphCanvas,
  SectionCard,
  SkillCard,
  SkillDetailsSkeleton,
} from "../components";
import { useSkillGraph } from "../hooks";

import styles from "./Skill.module.css";

export default function Skill() {
  const { name } = useParams();
  const { data: graph, isError, isLoading, refetch } = useSkillGraph(name);

  if (isLoading) {
    return (
      <MainLayout>
        <SkillDetailsSkeleton />
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <Result
          status="error"
          title="We couldn’t load this skill"
          subTitle="Please check your connection and try again."
          extra={[
            <Button key="retry" type="primary" icon={<ReloadOutlined />} onClick={refetch}>
              Try again
            </Button>,
            <Button key="home">
              <Link to="/">Back to discovery</Link>
            </Button>,
          ]}
        />
      </MainLayout>
    );
  }

  if (!graph?.skill) {
    return (
      <MainLayout>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No information available for this skill."
          className={styles.emptyState}
        >
          <Button type="primary">
            <Link to="/">Return to Home</Link>
          </Button>
        </Empty>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <Breadcrumb
          className={styles.breadcrumb}
          items={[
            { title: <Link to="/"><HomeOutlined /> Discovery</Link> },
            { title: graph.skill.name },
          ]}
        />

          <SkillCard skill={graph.skill} />

          <div className={styles.graphContainer}>
            <GraphCanvas graph={graph} />
          </div>

          <Row gutter={[16, 16]} className={styles.sectionGrid}>
            <Col xs={24} md={12}>
              <SectionCard title="Prerequisites" items={graph.prerequisites} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Next Skills" items={graph.nextSkills} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Projects" items={graph.projects} variant="project" />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard
                title="Learning Resources"
                items={graph.resources}
                variant="resource"
              />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Roles" items={graph.roles} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Companies" items={graph.companies} variant="company" />
            </Col>
          </Row>
      </div>
    </MainLayout>
  );
}
