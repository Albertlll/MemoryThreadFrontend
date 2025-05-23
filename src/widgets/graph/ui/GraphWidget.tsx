import { useState } from "react";
import { Canvas } from "./Canvas";
import type { IGraphData, INode } from "../model";

interface GraphWidgetProps {
  data: IGraphData;
  onNodeClick?: (node: INode) => void;
  className?: string;
}

export const GraphWidget = ({ data, onNodeClick, className = "" }: GraphWidgetProps) => {
  const [selectedNode, setSelectedNode] = useState<INode | null>(null);

  const handleNodeClick = (node: INode) => {
    setSelectedNode(node);
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas data={data} onNodeClick={handleNodeClick} />
      
      {/* Optional: Add a panel to display selected node information */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded shadow-lg max-w-xs">
          <h3 className="text-lg font-bold mb-2">{selectedNode.name || selectedNode.id}</h3>
          {/* Add more node details here as needed */}
        </div>
      )}
    </div>
  );
};
