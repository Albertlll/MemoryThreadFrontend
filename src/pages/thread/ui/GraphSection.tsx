import { memo } from "react";
import type { IGraphData, INode } from "../../../widgets/graph";
import { GraphContainer } from "../../../widgets/graph";

interface GraphSectionProps {
	data: IGraphData;
	onNodeClick: (node: INode) => void;
}

// This component is completely isolated and only handles the graph rendering
// It will only re-render when data or onNodeClick changes
export const GraphSection = memo(({ data, onNodeClick }: GraphSectionProps) => {
	console.log("GraphSection render"); // For debugging

	return (
		<div className="w-full h-full bg-background/80 rounded">
			<GraphContainer
				data={data}
				onNodeClick={onNodeClick}
				className="w-full h-full"
			/>
		</div>
	);
});

GraphSection.displayName = "GraphSection";
