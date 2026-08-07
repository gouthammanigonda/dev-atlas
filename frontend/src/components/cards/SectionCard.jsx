import { Badge, Button, Card, Empty, Flex, List, Tag, Typography } from "antd";
import {
  ApartmentOutlined,
  BookOutlined,
  BuildOutlined,
  LinkOutlined,
  ProjectOutlined,
  ReadOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import styles from "./SectionCard.module.css";

const sectionIcons = {
  Prerequisites: <ApartmentOutlined />,
  "Next Skills": <BuildOutlined />,
  Projects: <ProjectOutlined />,
  "Learning Resources": <ReadOutlined />,
  Roles: <TeamOutlined />,
  Companies: <ApartmentOutlined />,
};

const difficultyColor = {
  Easy: "green",
  Medium: "gold",
  Hard: "red",
};

const SectionCard = ({ items = [], title, variant = "default" }) => {
  const renderItem = (item) => {
    if (variant === "resource") {
      return (
        <Flex vertical gap={6}>
          <Button
            type="link"
            icon={<LinkOutlined />}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className={styles.externalLink}
          >
            {item.title || item.name}
          </Button>
          {item.provider && (
            <Typography.Text type="secondary" className={styles.description}>
              Provided by {item.provider}
            </Typography.Text>
          )}
        </Flex>
      );
    }

    if (variant === "company") {
      return (
        <Flex align="center" justify="space-between" gap="small" wrap>
          <Typography.Text strong>{item.name}</Typography.Text>
          {item.website && (
            <Button
              size="small"
              icon={<LinkOutlined />}
              href={item.website}
              target="_blank"
              rel="noreferrer"
            >
              Visit website
            </Button>
          )}
        </Flex>
      );
    }

    if (variant === "project") {
      return (
        <Flex vertical gap={6}>
          <Flex align="center" gap="small" wrap>
            <Typography.Text strong>{item.title || item.name}</Typography.Text>
            {item.difficulty && (
              <Tag color={difficultyColor[item.difficulty]}>
                {item.difficulty}
              </Tag>
            )}
          </Flex>
          {item.description && (
            <Typography.Text type="secondary" className={styles.description}>
              {item.description}
            </Typography.Text>
          )}
        </Flex>
      );
    }

    return (
      <Flex vertical gap={4}>
        <Typography.Text strong>{item.name || item.title}</Typography.Text>
        {item.description && (
          <Typography.Text type="secondary" className={styles.description}>
            {item.description}
          </Typography.Text>
        )}
      </Flex>
    );
  };

  return (
    <Card
      title={
        <Flex align="center" gap={8} className={styles.header}>
          {sectionIcons[title] || <BookOutlined />}
          <span>{title}</span>
          <Badge count={items.length} showZero className={styles.count} />
        </Flex>
      }
      className={styles.card}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      {items.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={`No ${title}`}
          className={styles.empty}
        />
      ) : (
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item className={styles.item}>
              <div className={styles.content}>{renderItem(item)}</div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default SectionCard;
