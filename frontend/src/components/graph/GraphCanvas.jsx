import { useEffect, useMemo } from "react";
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { graphToFlow } from "./graphUtils";
import { nodeTypes } from "./nodes";
import styles from "./GraphCanvas.module.css";

const defaultEdgeOptions = {
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { stroke: "var(--graph-edge)", strokeWidth: 1.5 },
};

const GraphCanvas = ({ graph }) => {
  const initialFlow = useMemo(() => graphToFlow(graph), [graph]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlow.edges);

  useEffect(() => {
    setNodes(initialFlow.nodes);
    setEdges(initialFlow.edges);
  }, [initialFlow, setEdges, setNodes]);

  return (
    <section className={styles.container} aria-label="Skill knowledge graph">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Knowledge graph</p>
          <h2>Explore the learning ecosystem</h2>
        </div>
        <p className={styles.hint}>Drag to explore · scroll to zoom</p>
      </div>

      <div className={styles.canvas}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.35}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="var(--graph-grid)" gap={24} size={1} />
          <MiniMap
            className={styles.minimap}
            nodeColor="var(--graph-minimap-node)"
            maskColor="var(--graph-minimap-mask)"
          />
          <Controls className={styles.controls} showInteractive={false} />
        </ReactFlow>
      </div>
    </section>
  );
};

export default GraphCanvas;
