import { GraphWidget } from "./GraphWidget";
import type { IGraphData, INode } from "../model";

// Sample data for demonstration
const sampleData: IGraphData = {
  nodes: [
    { id: "1", name: "Node 1", val: 2 },
    { id: "2", name: "Node 2", val: 1.5 },
    { id: "3", name: "Node 3", val: 1 },
    { id: "4", name: "Node 4", val: 2.5 },
    { id: "5", name: "Node 5", val: 1.8 },
  ],
  links: [
    { source: "1", target: "2", color: "#ff0000" },
    { source: "1", target: "3", color: "#00ff00" },
    { source: "2", target: "4", color: "#0000ff" },
    { source: "3", target: "5", color: "#ffff00" },
    { source: "4", target: "5", color: "#00ffff" },
  ],
};

export const GraphWidgetDemo = () => {
  const handleNodeClick = (node: INode) => {
    console.log("Node clicked:", node);
  };

  return (
    <div className="w-full h-screen">
      <GraphWidget data={sampleData} onNodeClick={handleNodeClick} />
    </div>
  );
};
