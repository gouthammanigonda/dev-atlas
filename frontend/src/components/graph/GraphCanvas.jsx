import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { GraphInteractionContext } from "./GraphInteractionContext";
import { graphToFlow } from "./graphUtils";
import { nodeTypes } from "./nodes";
import styles from "./GraphCanvas.module.css";

const defaultEdgeOptions = {
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { stroke: "var(--graph-edge)", strokeWidth: 1.5 },
};

const GraphCanvas = ({
  graph,
  onProjectSelect,
  onRoleSelect,
  onSkillSelect,
}) => {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState(null);
  const initialFlow = useMemo(() => graphToFlow(graph), [graph]);

  const handleNodeHover = useCallback((nodeId, isActive) => {
    setActiveNodeId((currentNodeId) => {
      if (isActive) return currentNodeId === nodeId ? currentNodeId : nodeId;
      return currentNodeId === nodeId ? null : currentNodeId;
    });
  }, []);

  const handleEdgeHover = useCallback((edgeId) => {
    setHoveredEdgeId((currentEdgeId) =>
      currentEdgeId === edgeId ? currentEdgeId : edgeId,
    );
  }, []);

  const clearEdgeHover = useCallback(() => {
    setHoveredEdgeId((currentEdgeId) => currentEdgeId ? null : currentEdgeId);
  }, []);

  const handleNodeActivate = useCallback(
    (node) => {
      if (node.type === "skill") {
        onSkillSelect?.(node.data.name);
      }

      if (node.type === "company" && node.data.website) {
        window.open(node.data.website, "_blank", "noopener,noreferrer");
      }

      if (node.type === "resource" && node.data.url) {
        window.open(node.data.url, "_blank", "noopener,noreferrer");
      }

      if (node.type === "project") {
        onProjectSelect?.(node.data);
      }

      if (node.type === "role") {
        onRoleSelect?.(node.data);
      }
    },
    [onProjectSelect, onRoleSelect, onSkillSelect],
  );

  const relatedNodeIds = useMemo(() => {
    if (!activeNodeId) return new Set();

    return initialFlow.edges.reduce(
      (ids, edge) => {
        if (edge.source === activeNodeId) ids.add(edge.target);
        if (edge.target === activeNodeId) ids.add(edge.source);
        return ids;
      },
      new Set([activeNodeId]),
    );
  }, [activeNodeId, initialFlow.edges]);

  const nodesWithHandlers = useMemo(
    () =>
      initialFlow.nodes.map((node) => ({
        ...node,
        focusable: true,
        ariaLabel: `${node.data.label} ${node.type}`,
        data: {
          ...node.data,
          nodeId: node.id,
          onActivate: () => handleNodeActivate(node),
          onHoverChange: (isActive) => handleNodeHover(node.id, isActive),
        },
      })),
    [handleNodeActivate, handleNodeHover, initialFlow.nodes],
  );

  const interactiveEdges = useMemo(
    () =>
      initialFlow.edges.map((edge) => {
        const isConnected = relatedNodeIds.has(edge.source) && relatedNodeIds.has(edge.target);
        const isHovered = hoveredEdgeId === edge.id;
        const isActive = isHovered || (Boolean(activeNodeId) && isConnected);

        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: "var(--graph-edge)",
            strokeWidth: isActive ? 3 : 1.5,
            opacity: activeNodeId && !isConnected ? 0.22 : 1,
          },
          labelStyle: {
            fill: "var(--graph-text)",
            fontSize: isActive ? 12 : 11,
            fontWeight: isActive ? 600 : 400,
          },
          labelBgStyle: {
            fill: "var(--graph-surface)",
            fillOpacity: isActive ? 1 : 0.82,
          },
          labelBgPadding: [5, 3],
          labelBgBorderRadius: 4,
        };
      }),
    [activeNodeId, hoveredEdgeId, initialFlow.edges, relatedNodeIds],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesWithHandlers);

  useEffect(() => {
    setNodes(nodesWithHandlers);
  }, [nodesWithHandlers, setNodes]);

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
        <GraphInteractionContext.Provider value={{ activeNodeId, relatedNodeIds }}>
          <ReactFlow
            nodes={nodes}
            edges={interactiveEdges}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onNodesChange={onNodesChange}
            onEdgeMouseEnter={(_, edge) => handleEdgeHover(edge.id)}
            onEdgeMouseLeave={clearEdgeHover}
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
        </GraphInteractionContext.Provider>
      </div>
    </section>
  );
};

export default GraphCanvas;
