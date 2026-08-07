import { Card, Flex, Tag, Typography } from "antd";
import {
  CodeOutlined,
  ClockCircleOutlined,
  FolderOutlined,
} from "@ant-design/icons";

import styles from "./SkillCard.module.css";

const difficultyColor = {
  Easy: "green",
  Medium: "gold",
  Hard: "red",
};

const SkillCard = ({ skill }) => {
  if (!skill) return null;

  return (
    <Card className={styles.card}>
      <Flex vertical gap={16}>
        <Flex vertical gap={8}>
          <Typography.Title level={1} className={styles.title}>
            {skill.name}
          </Typography.Title>

          <Typography.Paragraph type="secondary" className={styles.description}>
            {skill.description}
          </Typography.Paragraph>
        </Flex>

        <Flex wrap gap="small" className={styles.metadata}>
          <Tag color={difficultyColor[skill.difficulty]}>
            {skill.difficulty}
          </Tag>

          <Tag icon={<ClockCircleOutlined />}>{skill.estimatedTime}</Tag>

          <Tag icon={<FolderOutlined />}>{skill.category}</Tag>
          <Tag icon={<CodeOutlined />}>Skill overview</Tag>
        </Flex>
      </Flex>
    </Card>
  );
};

export default SkillCard;
