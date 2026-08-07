import { Card, Typography, Tag, Space } from "antd";
import { CodeOutlined, ClockCircleOutlined } from "@ant-design/icons";

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
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <div>
          <Typography.Title level={2}>{skill.name}</Typography.Title>

          <Typography.Text type="secondary">
            {skill.description}
          </Typography.Text>
        </div>

        <Space wrap>
          <Tag color={difficultyColor[skill.difficulty]}>
            {skill.difficulty}
          </Tag>

          <Tag icon={<ClockCircleOutlined />}>{skill.estimatedTime}</Tag>

          <Tag icon={<CodeOutlined />}>{skill.category}</Tag>
        </Space>
      </Space>
    </Card>
  );
};

export default SkillCard;
