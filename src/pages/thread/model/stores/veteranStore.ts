import { create } from "zustand";
import { veteranApi } from "../../../../entities/veteran/api";
import type { Veteran } from "../../../../entities/veteran/model";
import { useGraphStore } from "./graphStore";

// Define the store state type
interface VeteranState {
	veteranData: Veteran | null;
	veteranLoading: boolean;
	veteranError: string | null;
	fetchVeteranData: (nodeId: string) => Promise<void>;
	clearVeteranInfo: () => void;
}

// Create the store
export const useVeteranStore = create<VeteranState>((set) => ({
	veteranData: null,
	veteranLoading: false,
	veteranError: null,

	// Fetch veteran data
	fetchVeteranData: async (nodeId: string) => {
		try {
			set({ veteranLoading: true, veteranError: null });

			// Предполагаем, что ID узла - это ID ветерана
			const veteranId = Number.parseInt(nodeId, 10);
			if (Number.isNaN(veteranId)) {
				throw new Error("Invalid veteran ID");
			}

			// Используем veteranApi для получения данных
			const data = await veteranApi.getById(veteranId);
			set({ veteranData: data, veteranLoading: false });
		} catch (err) {
			console.error("Error fetching veteran data:", err);
			set({
				veteranError: "Не удалось загрузить информацию о ветеране",
				veteranData: null,
				veteranLoading: false,
			});
		}
	},

	// Clear veteran info
	clearVeteranInfo: () => set({ veteranData: null, veteranError: null }),
}));

// Create a function to initialize the subscription
// This should be called after both stores are created
export const initVeteranStoreSubscription = () => {
	// Subscribe to changes in the graph store to fetch veteran data when a node is selected
	useGraphStore.subscribe((state) => {
		const selectedNode = state.selectedNode;
		if (selectedNode) {
			useVeteranStore.getState().fetchVeteranData(selectedNode.id);
		} else {
			useVeteranStore.getState().clearVeteranInfo();
		}
	});
};
