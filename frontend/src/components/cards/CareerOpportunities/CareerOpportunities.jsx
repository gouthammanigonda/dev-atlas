import { BankOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Timeline, Typography } from "antd";

import styles from "./CareerOpportunities.module.css";

const CareerOpportunities = ({ companies = [], roles = [], skill }) => (
  <section className={styles.section} aria-labelledby="career-opportunities-title">
    <Typography.Title level={2} id="career-opportunities-title" className={styles.title}>
      <TeamOutlined aria-hidden="true" /> Career Opportunities
    </Typography.Title>
    <Timeline
      items={[
        {
          dot: <TeamOutlined />,
          color: "blue",
          children: <Typography.Text strong>{skill.name}</Typography.Text>,
        },
        ...roles.map((role) => ({
          dot: <TeamOutlined />,
          children: (
            <div>
              <Typography.Text strong>{role.name}</Typography.Text>
              {role.description && (
                <Typography.Text type="secondary" className={styles.description}>
                  {role.description}
                </Typography.Text>
              )}
            </div>
          ),
        })),
        ...companies.map((company) => ({
          dot: <BankOutlined />,
          children: (
            <Button
              type="link"
              href={company.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${company.name} website in a new tab`}
              className={styles.companyLink}
            >
              {company.name}
            </Button>
          ),
        })),
      ]}
    />
  </section>
);

export default CareerOpportunities;
