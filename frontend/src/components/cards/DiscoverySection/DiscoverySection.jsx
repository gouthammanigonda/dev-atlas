import { Button, Flex, Typography } from "antd";

import styles from "./DiscoverySection.module.css";

const DiscoverySection = ({ items, onItemClick, title }) => {
  const sectionId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
  <section className={styles.section} aria-labelledby={sectionId}>
    <Typography.Title level={2} id={sectionId} className={styles.title}>
      {title}
    </Typography.Title>
    <Flex wrap gap="small">
      {items.map((item) => {
        const { label, value = label } =
          typeof item === "string" ? { label: item } : item;

        return (
          <Button
            key={label}
            type="default"
            className={styles.chip}
            onClick={() => onItemClick(value)}
          >
            {label}
          </Button>
        );
      })}
    </Flex>
  </section>
  );
};

export default DiscoverySection;
