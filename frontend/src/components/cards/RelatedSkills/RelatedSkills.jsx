import { Card, Col, Empty, Row, Typography } from "antd";

import styles from "./RelatedSkills.module.css";

const RelatedSkills = ({ nextSkills = [], onSkillSelect, prerequisites = [] }) => {
  const relatedSkills = [...prerequisites, ...nextSkills].filter(
    (skill, index, skills) =>
      skills.findIndex((candidate) => candidate.name === skill.name) === index,
  );

  return (
    <section className={styles.section} aria-labelledby="related-skills-title">
      <Typography.Title level={2} id="related-skills-title" className={styles.title}>
        Related Skills
      </Typography.Title>

      {relatedSkills.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No related skills available yet."
          className={styles.empty}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {relatedSkills.map((skill) => (
            <Col key={skill.name} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                className={styles.card}
                onClick={() => onSkillSelect(skill.name)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSkillSelect(skill.name);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${skill.name}`}
              >
                <Typography.Text strong>{skill.name}</Typography.Text>
                {skill.description && (
                  <Typography.Text type="secondary" className={styles.description}>
                    {skill.description}
                  </Typography.Text>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
};

export default RelatedSkills;
