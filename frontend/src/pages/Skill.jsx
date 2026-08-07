import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Button, Col, Empty, message, Result, Row } from "antd";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { MainLayout } from "../layouts";
import {
  GraphCanvas,
  CareerOpportunities,
  LearningRoadmap,
  NodeDetailsPanel,
  RelatedSkills,
  SectionCard,
  SkillCard,
  SkillDetailsSkeleton,
} from "../components";
import { useBookmarks, useSkillGraph } from "../hooks";

import styles from "./Skill.module.css";

export default function Skill() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { data: graph, isError, isLoading, refetch } = useSkillGraph(name);
  const { bookmarks, toggleBookmark } = useBookmarks();
  const [displayedGraph, setDisplayedGraph] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (!graph) return undefined;

    const frameId = window.requestAnimationFrame(() => setDisplayedGraph(graph));
    return () => window.cancelAnimationFrame(frameId);
  }, [graph]);

  const handleSkillSelect = useCallback(
    (skillName) => navigate(`/skill/${encodeURIComponent(skillName)}`),
    [navigate],
  );

  const handleBack = useCallback(() => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/");
  }, [navigate]);

  const graphToDisplay = graph || displayedGraph;

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      message.success("Skill link copied to clipboard");
    } catch {
      message.error("Unable to copy the skill link");
    }
  }, []);

  if (isLoading && !graphToDisplay) {
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

  if (!graphToDisplay?.skill) {
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
            { title: graphToDisplay.skill.name },
          ]}
        />

        <Button className={styles.backButton} onClick={handleBack}>
          Back
        </Button>

          <SkillCard
            skill={graphToDisplay.skill}
            isBookmarked={bookmarks.includes(graphToDisplay.skill.name)}
            onToggleBookmark={() => toggleBookmark(graphToDisplay.skill.name)}
            onShare={handleShare}
          />

          <div className={styles.graphContainer}>
            <GraphCanvas
              graph={graphToDisplay}
              onSkillSelect={handleSkillSelect}
              onProjectSelect={setSelectedProject}
              onRoleSelect={setSelectedRole}
            />
          </div>

          <RelatedSkills
            prerequisites={graphToDisplay.prerequisites}
            nextSkills={graphToDisplay.nextSkills}
            onSkillSelect={handleSkillSelect}
          />

          <Row gutter={[16, 16]} className={styles.advancedGrid}>
            <Col xs={24} lg={12}>
              <LearningRoadmap
                skill={graphToDisplay.skill}
                prerequisites={graphToDisplay.prerequisites}
                nextSkills={graphToDisplay.nextSkills}
              />
            </Col>
            <Col xs={24} lg={12}>
              <CareerOpportunities
                skill={graphToDisplay.skill}
                roles={graphToDisplay.roles}
                companies={graphToDisplay.companies}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} className={styles.sectionGrid}>
            <Col xs={24} md={12}>
              <SectionCard title="Prerequisites" items={graphToDisplay.prerequisites} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Next Skills" items={graphToDisplay.nextSkills} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Projects" items={graphToDisplay.projects} variant="project" />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard
                title="Learning Resources"
                items={graphToDisplay.resources}
                variant="resource"
              />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Roles" items={graphToDisplay.roles} />
            </Col>
            <Col xs={24} md={12}>
              <SectionCard title="Companies" items={graphToDisplay.companies} variant="company" />
            </Col>
          </Row>
      </div>
      <NodeDetailsPanel
        project={selectedProject}
        role={selectedRole}
        onCloseProject={() => setSelectedProject(null)}
        onCloseRole={() => setSelectedRole(null)}
      />
    </MainLayout>
  );
}
