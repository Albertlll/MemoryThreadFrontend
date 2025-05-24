import { create } from "zustand";
import type { EventVeteransGraph } from "../../../../entities/event/model";
import type { IGraphData, INode } from "../../../../widgets/graph";

// Format the graph data for the graph component
const formatGraphData = (rawData: EventVeteransGraph): IGraphData => {
	return {
		nodes: rawData.nodes.map((node) => ({
			id: node.id.toString(),
			name: node.name,
			val: 1.5,
		})),
		links: rawData.connections.map((conn) => ({
			source: conn.source.toString(),
			target: conn.target.toString(),
			color: "#aaaaaa",
		})),
	};
};

// Create empty graph data
const createEmptyGraphData = (): IGraphData => {
	return {
		nodes: [],
		links: [],
	};
};

// Define the store state type
interface GraphState {
	graphData: IGraphData;
	selectedNode: INode | null;
	setGraphData: (data: EventVeteransGraph) => void;
	handleNodeClick: (node: INode) => void;
	clearSelectedNode: () => void;
}

// Create the store
export const useGraphStore = create<GraphState>((set) => ({
	graphData: createEmptyGraphData(),
	selectedNode: null,

	// Set graph data from API
	setGraphData: (data: EventVeteransGraph) => {
		set({ graphData: formatGraphData(data) });
	},

	// Handle node click
	handleNodeClick: (node: INode) => {
		set((state) => {
			// Don't update if the same node is clicked
			const currentNodeId = String(node.id);
			const selectedNodeId = state.selectedNode
				? String(state.selectedNode.id)
				: null;

			if (!state.selectedNode || selectedNodeId !== currentNodeId) {
				return { selectedNode: node };
			}
			return state;
		});
	},

	// Clear selected node
	clearSelectedNode: () => set({ selectedNode: null }),
}));
