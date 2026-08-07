import { useParams } from "react-router-dom";
import { Alert, Col, Row, Spin } from "antd";

import { MainLayout } from "../layouts";
import { GraphCanvas, SectionCard, SkillCard } from "../components";
import { useSkillGraph } from "../hooks";

import styles from "./Skill.module.css";

export default function Skill() {
  const { name } = useParams();
  const { data: graph, error, isError, isLoading } = useSkillGraph(name);

  return (
    <MainLayout>
      {isLoading && (
        <div className={styles.loader}>
          <Spin size="large" />
        </div>
      )}

      {isError && (
        <div className={styles.error}>
          <Alert
            type="error"
            showIcon
            message="Skill not found"
            description={error?.message || "We could not load this skill."}
          />
        </div>
      )}

      {graph && (
        <div className={styles.content}>
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
              <SectionCard title="Projects" items={graph.projects} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Learning Resources" items={graph.resources} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Roles" items={graph.roles} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Companies" items={graph.companies} />
            </Col>
          </Row>
        </div>
      )}
    </MainLayout>
  );
}
