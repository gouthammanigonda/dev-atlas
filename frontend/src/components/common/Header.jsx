import { Space, Tag, Typography } from "antd";

import { SearchBar } from "./";

import styles from "./Header.module.css";

const popularSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Docker",
];

const Header = ({ onSkillSelect = () => {} }) => {
  return (
    <div className={styles.container}>
      <Space
        direction="vertical"
        size={32}
        align="center"
        className={styles.content}
      >
        <Space direction="vertical" size={8} align="center">
          <Typography.Title level={1} className={styles.title}>
            DevAtlas
          </Typography.Title>

          <Typography.Text className={styles.subtitle}>
            Explore developer skills, learning paths, projects and career
            opportunities visually.
          </Typography.Text>
        </Space>

        <SearchBar onSkillSelect={onSkillSelect} />

        <Space wrap size={[8, 8]} justify="center">
          {popularSkills.map((skill) => (
            <Tag
              key={skill}
              className={styles.tag}
              onClick={() => onSkillSelect(skill)}
            >
              {skill}
            </Tag>
          ))}
        </Space>
      </Space>
    </div>
  );
};

export default Header;
