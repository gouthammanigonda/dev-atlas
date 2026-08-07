import { Handle, Position } from "@xyflow/react";

import { useGraphInteraction } from "../GraphInteractionContext";
import styles from "./NodeContent.module.css";

const NodeContent = ({ data, icon, type, selected = false }) => {
  const { activeNodeId, relatedNodeIds } = useGraphInteraction();
  const isDimmed = Boolean(activeNodeId) && !relatedNodeIds.has(data.nodeId);
  const isHighlighted = Boolean(activeNodeId) && relatedNodeIds.has(data.nodeId);

  return (
    <button
      type="button"
      className={`${styles.node} ${styles[type]} ${selected ? styles.selected : ""} ${isDimmed ? styles.dimmed : ""} ${isHighlighted ? styles.highlighted : ""}`}
      onClick={() => data.onActivate?.()}
      onMouseEnter={() => data.onHoverChange?.(true)}
      onMouseLeave={() => data.onHoverChange?.(false)}
      onFocus={() => data.onHoverChange?.(true)}
      onBlur={() => data.onHoverChange?.(false)}
      aria-label={`${data.label}. ${data.relationship || "Selected skill"}`}
    >
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
    </button>
  );
};

export default NodeContent;
