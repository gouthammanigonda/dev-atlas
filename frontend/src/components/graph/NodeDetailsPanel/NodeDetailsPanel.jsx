import { Descriptions, Divider, Drawer, Modal, Tag, Typography } from "antd";

import styles from "./NodeDetailsPanel.module.css";

const difficultyColor = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

const NodeDetailsPanel = ({ onCloseProject, onCloseRole, project, role }) => (
  <>
    <Modal
      open={Boolean(project)}
      title={project?.title || project?.name}
      footer={null}
      onCancel={onCloseProject}
    >
      {project && (
        <>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Difficulty">
              {project.difficulty ? (
                <Tag color={difficultyColor[project.difficulty]}>
                  {project.difficulty}
                </Tag>
              ) : (
                "Not specified"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {project.description || "No description available."}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Typography.Text type="secondary" className={styles.futureHint}>
            Repository, live demo, and tech stack details will appear here when available.
          </Typography.Text>
        </>
      )}
    </Modal>

    <Drawer
      open={Boolean(role)}
      title={role?.name}
      onClose={onCloseRole}
      width={420}
    >
      {role && (
        <>
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Description">
              {role.description || "No description available."}
            </Descriptions.Item>
            <Descriptions.Item label="Salary range">
              {role.salaryRange || "Not specified"}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Typography.Text type="secondary" className={styles.futureHint}>
            Responsibilities, required skills, and interview guidance will appear here when available.
          </Typography.Text>
        </>
      )}
    </Drawer>
  </>
);

export default NodeDetailsPanel;
