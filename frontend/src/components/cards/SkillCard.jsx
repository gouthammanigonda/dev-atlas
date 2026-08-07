import { Button, Card, Flex, Tag, Tooltip, Typography } from "antd";
import {
  BookFilled,
  BookOutlined,
  CodeOutlined,
  ClockCircleOutlined,
  FolderOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

import styles from "./SkillCard.module.css";

const difficultyColor = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

const SkillCard = ({ isBookmarked, onShare, onToggleBookmark, skill }) => {
  if (!skill) return null;

  return (
    <Card className={styles.card}>
      <Flex vertical gap={16}>
        <Flex align="flex-start" justify="space-between" gap="small">
          <Flex vertical gap={8}>
            <Typography.Title level={1} className={styles.title}>
              {skill.name}
            </Typography.Title>

            <Typography.Paragraph type="secondary" className={styles.description}>
              {skill.description}
            </Typography.Paragraph>
          </Flex>
          <Flex gap={4}>
            <Tooltip title={isBookmarked ? "Remove bookmark" : "Bookmark skill"}>
              <Button
                type="text"
                icon={isBookmarked ? <BookFilled /> : <BookOutlined />}
                aria-label={isBookmarked ? "Remove skill bookmark" : "Bookmark skill"}
                onClick={onToggleBookmark}
              />
            </Tooltip>
            <Tooltip title="Copy link to this skill">
              <Button
                type="text"
                icon={<ShareAltOutlined />}
                aria-label="Copy link to this skill"
                onClick={onShare}
              />
            </Tooltip>
          </Flex>
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
