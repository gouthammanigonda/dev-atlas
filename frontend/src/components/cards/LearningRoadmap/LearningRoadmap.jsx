import { CheckCircleOutlined, ReadOutlined } from "@ant-design/icons";
import { Timeline, Typography } from "antd";

import styles from "./LearningRoadmap.module.css";

const LearningRoadmap = ({ nextSkills = [], prerequisites = [], skill }) => {
  const roadmap = [...prerequisites, skill, ...nextSkills].filter(Boolean);

  return (
    <section className={styles.section} aria-labelledby="learning-roadmap-title">
      <Typography.Title level={2} id="learning-roadmap-title" className={styles.title}>
        <ReadOutlined aria-hidden="true" /> Learning Roadmap
      </Typography.Title>
      <Timeline
        items={roadmap.map((item) => ({
          dot:
            item.name === skill.name ? <CheckCircleOutlined /> : <ReadOutlined />,
          color: item.name === skill.name ? "blue" : "gray",
          children: (
            <div className={item.name === skill.name ? styles.current : ""}>
              <Typography.Text strong>{item.name}</Typography.Text>
              {item.description && (
                <Typography.Text type="secondary" className={styles.description}>
                  {item.description}
                </Typography.Text>
              )}
            </div>
          ),
        }))}
      />
    </section>
  );
};

export default LearningRoadmap;
