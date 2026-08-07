import { Card, Col, Row, Skeleton } from "antd";

import styles from "./SkillDetailsSkeleton.module.css";

const SkillDetailsSkeleton = () => (
  <div className={styles.content} aria-label="Loading skill details" aria-busy="true">
    <Card className={styles.summaryCard}>
      <Skeleton active title={{ width: "36%" }} paragraph={{ rows: 2 }} />
      <Skeleton.Button active size="small" className={styles.tagSkeleton} />
      <Skeleton.Button active size="small" className={styles.tagSkeleton} />
      <Skeleton.Button active size="small" />
    </Card>

    <Card className={styles.graphCard}>
      <Skeleton active paragraph={{ rows: 7 }} />
    </Card>

    <Row gutter={[16, 16]}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Col key={index} xs={24} md={12}>
          <Card className={styles.sectionCard}>
            <Skeleton active title={{ width: "42%" }} paragraph={{ rows: 2 }} />
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default SkillDetailsSkeleton;
