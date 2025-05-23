import type { LatLngTuple } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import type { EventVeteransGraph } from "../../../entities/event";
import { eventApi } from "../../../entities/event";
import { GraphWidget } from "../../../widgets/graph";
import type { IGraphData, INode } from "../../../widgets/graph";
import { MapWidget } from "../../../widgets/map";

export const ThreadPage = () => {
	const { id } = useParams<{ id: string }>();
	const [graphData, setGraphData] = useState<EventVeteransGraph | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedNode, setSelectedNode] = useState<INode | null>(null);

	// Convert EventVeteransGraph to IGraphData format for the GraphWidget
	const formattedGraphData: IGraphData | null = useMemo(() => {
		if (!graphData) return null;

		return {
			nodes: graphData.nodes.map((node) => ({
				id: node.id.toString(),
				name: node.name,
				val: 1.5, // Default size, can be adjusted based on node importance
			})),
			links: graphData.connections.map((conn) => ({
				source: conn.source.toString(),
				target: conn.target.toString(),
				color: "#aaaaaa", // Default color, can be customized
			})),
		};
	}, [graphData]);

	const handleNodeClick = (node: INode) => {
		setSelectedNode(node);
		console.log("Node clicked:", node);
	};

	useEffect(() => {
		const fetchVeteransGraph = async () => {
			if (!id) return;

			try {
				setLoading(true);
				const data = await eventApi.getVeteransGraph(id);

				console.log(data);
				setGraphData(data);
				setError(null);
			} catch (err) {
				console.error("Error fetching veterans graph:", err);
				setError("Failed to load veterans graph data");
			} finally {
				setLoading(false);
			}
		};

		fetchVeteransGraph();
	}, [id]);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Event Thread: {id}</h1>

			{loading && <p>Loading veterans graph data...</p>}

			{error && <p className="text-red-500">{error}</p>}

			{graphData && (
				<div className="mt-4">
					<h2 className="text-xl font-semibold mb-2">Veterans Graph Data</h2>
					<div className="flex flex-col md:flex-row gap-4">
						<div className="md:w-1/3">
							<p>Nodes: {graphData.nodes.length}</p>
							<p>Connections: {graphData.connections.length}</p>

							{selectedNode && (
								<div className="mt-4 p-4 bg-white rounded shadow">
									<h3 className="font-bold text-lg">
										{selectedNode.name || selectedNode.id}
									</h3>
									<p className="text-gray-600">ID: {selectedNode.id}</p>
									{/* Add more node details here as needed */}
								</div>
							)}
						</div>

						<div className="md:w-2/3 h-[600px] bg-gray-100 rounded">
							{formattedGraphData && (
								<GraphWidget
									data={formattedGraphData}
									onNodeClick={handleNodeClick}
									className="w-full h-full"
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
