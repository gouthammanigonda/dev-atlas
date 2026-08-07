const layout = {
  center: { x: 520, y: 270 },
  prerequisites: { x: 80, y: 80, direction: "in" },
  nextSkills: { x: 960, y: 80, direction: "out" },
  projects: { x: 960, y: 320, direction: "out" },
  resources: { x: 520, y: 560, direction: "out" },
  roles: { x: 80, y: 320, direction: "out" },
  companies: { x: 520, y: 760, direction: "out" },
};

const graphGroups = [
  { key: "prerequisites", type: "skill", label: "Requires" },
  { key: "nextSkills", type: "skill", label: "Leads to" },
  { key: "projects", type: "project", label: "Used in" },
  { key: "resources", type: "resource", label: "Learn from" },
  { key: "roles", type: "role", label: "Required for" },
  { key: "companies", type: "company", label: "Hired by" },
];

const getLabel = (item) => item.name || item.title || "Untitled";

const nodeId = (type, item, index) => `${type}-${getLabel(item)}-${index}`;

export const graphToFlow = (graph) => {
  if (!graph?.skill) return { nodes: [], edges: [] };

  const rootId = "selected-skill";
  const nodes = [
    {
      id: rootId,
      type: "skill",
      position: layout.center,
      data: { ...graph.skill, label: getLabel(graph.skill), isSelected: true },
    },
  ];
  const edges = [];

  graphGroups.forEach(({ key, type, label }) => {
    const items = graph[key] || [];
    const groupLayout = layout[key];

    items.forEach((item, index) => {
      const id = nodeId(`${key}-${type}`, item, index);
      const isVertical = key === "resources" || key === "companies";
      const offset = (index - (items.length - 1) / 2) * 132;
      const position = isVertical
        ? { x: groupLayout.x + offset, y: groupLayout.y }
        : { x: groupLayout.x, y: groupLayout.y + offset };

      nodes.push({
        id,
        type,
        position,
        data: { ...item, label: getLabel(item), relationship: label },
      });

      edges.push({
        id: `${rootId}-${id}`,
        source: groupLayout.direction === "in" ? id : rootId,
        target: groupLayout.direction === "in" ? rootId : id,
        label,
        type: "smoothstep",
      });
    });
  });

  return { nodes, edges };
};
