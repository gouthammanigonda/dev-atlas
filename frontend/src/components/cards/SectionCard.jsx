import { Badge, Button, Card, Empty, Flex, List, Tag, Typography } from "antd";
import {
  ApartmentOutlined,
  BookOutlined,
  BuildOutlined,
  ExportOutlined,
  LinkOutlined,
  ProjectOutlined,
  ReadOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import styles from "./SectionCard.module.css";
import CompanyLogo from "./CompanyLogo";

const sectionIcons = {
  Prerequisites: <ApartmentOutlined />,
  "Next Skills": <BuildOutlined />,
  Projects: <ProjectOutlined />,
  "Learning Resources": <ReadOutlined />,
  Roles: <TeamOutlined />,
  Companies: <ApartmentOutlined />,
};

const difficultyColor = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

const SectionCard = ({ items = [], title, variant = "default" }) => {
  const renderItem = (item) => {
    if (variant === "resource") {
      return (
        <Flex vertical gap={6}>
          <Flex align="center" gap="small" wrap>
            <Typography.Text strong>{item.title || item.name}</Typography.Text>
            {item.type && <Tag color="info">{item.type}</Tag>}
          </Flex>
          <Typography.Text type="secondary" className={styles.description}>
            {item.provider ? `Provided by ${item.provider}` : "Provider not specified"}
          </Typography.Text>
          {item.url && (
            <Button
              type="link"
              icon={<ExportOutlined />}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={styles.externalLink}
              aria-label={`Open ${item.title || item.name} in a new tab`}
            >
              Open Resource
            </Button>
          )}
        </Flex>
      );
    }

    if (variant === "company") {
      return (
        <Flex align="center" justify="space-between" gap="small" wrap>
          <Flex align="center" gap="small">
            <CompanyLogo company={item} />
            {item.website ? (
              <Button
                type="link"
                href={item.website}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${item.name} website in a new tab`}
                className={styles.companyName}
              >
                {item.name}
              </Button>
            ) : (
              <Typography.Text strong>{item.name}</Typography.Text>
            )}
          </Flex>
          {item.website && (
            <Button
              size="small"
              icon={<LinkOutlined />}
              href={item.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${item.name} website in a new tab`}
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
