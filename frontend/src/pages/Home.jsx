import { useState } from "react";
import { Alert, Col, Row, Spin } from "antd";

import { MainLayout } from "../layouts";
import {
  Header,
  SkillCard,
  SectionCard,
  GraphCanvas,
} from "../components";

import { useSkillGraph } from "../hooks";

import styles from "./Home.module.css";

const Home = () => {
  const [selectedSkill, setSelectedSkill] = useState("");

  const {
    data: graph,
    isLoading,
    isError,
    error,
  } = useSkillGraph(selectedSkill);

  return (
    <MainLayout>
      <Header onSkillSelect={setSelectedSkill} />

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
            message="Failed to load skill"
            description={error?.message || "Something went wrong."}
          />
        </div>
      )}

      {!isLoading && graph && (
        <div className={styles.content}>
          {/* Skill Summary */}
          <SkillCard skill={graph.skill} />

          <div className={styles.graphContainer}>
            <GraphCanvas graph={graph} />
          </div>

          {/* Details */}
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
};

export default Home;
