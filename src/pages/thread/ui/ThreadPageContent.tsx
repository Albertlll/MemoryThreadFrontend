import { memo } from "react";
import { GraphContainer } from "../../../widgets/graph";
import { useGraphStore, useVeteranStore } from "../model";
import { VeteranInfoSidebar } from "./VeteranInfoSidebar";

// This component uses Zustand stores directly instead of receiving props
export const ThreadPageContent = memo(() => {
	console.log("ThreadPageContent render");

	// Get state and actions from the graph store
	const { graphData, selectedNode, handleNodeClick, clearSelectedNode } =
		useGraphStore();

	// Get state from the veteran store
	const { veteranData, veteranLoading, veteranError, clearVeteranInfo } =
		useVeteranStore();

	// Handle closing the veteran info sidebar
	const handleCloseVeteranInfo = () => {
		clearSelectedNode();
		clearVeteranInfo();
	};

	return (
		<div className="h-screen w-screen flex">
			<div className="flex flex-col md:flex-row gap-4 w-full h-full">
				<div
					className={`${selectedNode ? "md:w-2/3" : "w-full"} h-full bg-background/80 rounded transition-all duration-300`}
				>
					{/* The GraphContainer is memoized and will only re-render when graphData or handleNodeClick changes */}
					<GraphContainer
						data={graphData}
						onNodeClick={handleNodeClick}
						className="w-full h-full"
					/>
				</div>

				{/* Детальная информация о выбранном ветеране */}
				{selectedNode && (
					<VeteranInfoSidebar
						selectedNode={selectedNode}
						veteranData={veteranData}
						veteranLoading={veteranLoading}
						veteranError={veteranError}
						onClose={handleCloseVeteranInfo}
					/>
				)}
			</div>
		</div>
	);
});

ThreadPageContent.displayName = "ThreadPageContent";
