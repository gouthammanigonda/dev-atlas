import { Card, Empty, List, Typography } from "antd";

import styles from "./SectionCard.module.css";

const SectionCard = ({ title, items = [] }) => {
  return (
    <Card
      title={title}
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
              <div className={styles.content}>
                <Typography.Text strong>
                  {item.name || item.title}
                </Typography.Text>

                {(item.description || item.provider) && (
                  <Typography.Text
                    type="secondary"
                    className={styles.description}
                  >
                    {item.description || item.provider}
                  </Typography.Text>
                )}
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default SectionCard;
