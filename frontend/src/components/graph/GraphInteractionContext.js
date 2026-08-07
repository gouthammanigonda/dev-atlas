import { createContext, useContext } from "react";

export const GraphInteractionContext = createContext({
  activeNodeId: null,
  relatedNodeIds: new Set(),
});

export const useGraphInteraction = () => useContext(GraphInteractionContext);
