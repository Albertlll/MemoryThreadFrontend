import { create } from "zustand";
import type { IGraphData, INode } from "../../../../widgets/graph";

// Mock data for testing
const mockVeteransGraphData = {
	nodes: [
		{ id: 1, name: "Иван Петров" },
		{ id: 2, name: "Сергей Иванов" },
		{ id: 3, name: "Алексей Смирнов" },
		{ id: 4, name: "Михаил Кузнецов" },
	],
	connections: [
		{ source: 1, target: 2 },
		{ source: 2, target: 1 },
		{ source: 2, target: 3 },
		{ source: 3, target: 2 },
		{ source: 3, target: 4 },
		{ source: 4, target: 3 },
	],
};

// Format the graph data for the graph component
const formatGraphData = (): IGraphData => {
	const rawData = mockVeteransGraphData;
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

// Define the store state type
interface GraphState {
	graphData: IGraphData;
	selectedNode: INode | null;
	handleNodeClick: (node: INode) => void;
	clearSelectedNode: () => void;
}

// Create the store
export const useGraphStore = create<GraphState>((set) => ({
	graphData: formatGraphData(),
	selectedNode: null,

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
