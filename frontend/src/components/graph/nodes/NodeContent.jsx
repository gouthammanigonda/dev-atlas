import { Handle, Position } from "@xyflow/react";

import styles from "./NodeContent.module.css";

const NodeContent = ({ data, icon, type, selected = false }) => (
  <div className={`${styles.node} ${styles[type]} ${selected ? styles.selected : ""}`}>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <span className={styles.icon}>{icon}</span>
    <div className={styles.copy}>
      <span className={styles.type}>{selected ? "Selected skill" : data.relationship}</span>
      <strong>{data.label}</strong>
      {(data.description || data.provider || data.category) && (
        <span className={styles.meta}>{data.description || data.provider || data.category}</span>
      )}
    </div>
  </div>
);

export default NodeContent;
