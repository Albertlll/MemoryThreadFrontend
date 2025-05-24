import { memo, useCallback } from "react";
import type { IGraphData, INode } from "../model";
import { GraphWidget } from "./GraphWidget";

interface GraphContainerProps {
	data: IGraphData;
	onNodeClick: (node: INode) => void;
	className?: string;
}

// This component is memoized to prevent re-renders when parent components change
// but the graph data and callbacks remain the same
export const GraphContainer = memo(
	({ data, onNodeClick, className = "" }: GraphContainerProps) => {
		console.log("GraphContainer render"); // For debugging

		// Memoize the click handler to maintain referential equality
		const handleNodeClick = useCallback(
			(node: INode) => {
				onNodeClick(node);
			},
			[onNodeClick],
		);

		return (
			<div className={`w-full h-full ${className}`}>
				<GraphWidget
					data={data}
					onNodeClick={handleNodeClick}
					className="w-full h-full"
				/>
			</div>
		);
	},
);

GraphContainer.displayName = "GraphContainer";
