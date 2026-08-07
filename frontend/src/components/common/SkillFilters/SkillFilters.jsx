import { FilterOutlined } from "@ant-design/icons";
import { Flex, Select, Typography } from "antd";

import styles from "./SkillFilters.module.css";

const categoryOptions = ["Frontend", "Backend", "Database", "DevOps", "Tools"].map(
  (value) => ({ label: value, value }),
);

const difficultyOptions = ["Easy", "Medium", "Hard"].map((value) => ({
  label: value,
  value,
}));

const SkillFilters = ({ filters, onChange }) => (
  <section className={styles.container} aria-label="Skill filters">
    <Flex align="center" gap="small" className={styles.label}>
      <FilterOutlined aria-hidden="true" />
      <Typography.Text strong>Explore by</Typography.Text>
    </Flex>
    <Flex gap="small" wrap className={styles.controls}>
      <Select
        aria-label="Filter skills by category"
        allowClear
        options={categoryOptions}
        placeholder="Category"
        value={filters.category || undefined}
        onChange={(category) => onChange({ category })}
        className={styles.select}
      />
      <Select
        aria-label="Filter skills by difficulty"
        allowClear
        options={difficultyOptions}
        placeholder="Difficulty"
        value={filters.difficulty || undefined}
        onChange={(difficulty) => onChange({ difficulty })}
        className={styles.select}
      />
    </Flex>
  </section>
);

export default SkillFilters;
