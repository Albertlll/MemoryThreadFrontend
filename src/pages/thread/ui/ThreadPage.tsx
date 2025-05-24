import { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import { eventApi } from "../../../entities/event";
import { initVeteranStoreSubscription } from "../model";
import { ThreadPageContent } from "./ThreadPageContent";

// Initialize the subscription between stores
// This ensures that when a node is selected in the graph store,
// the veteran store will automatically fetch the veteran data
initVeteranStoreSubscription();

export const ThreadPage = memo(() => {
	console.log("ThreadPage render");
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch veterans graph data on component mount
	useEffect(() => {
		const fetchVeteransGraph = async () => {
			if (!id) return;

			try {
				setLoading(true);
				const data = await eventApi.getVeteransGraph(id);
				console.log(data);
				// We would set the graph data here in a real app
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

	// If loading or error, show appropriate message
	if (loading)
		return (
			<p className="text-muted-foreground">Loading veterans graph data...</p>
		);
	if (error) return <p className="text-war-blood p-4">{error}</p>;

	// Render the content - no providers needed as we're using Zustand stores
	return <ThreadPageContent />;
});

ThreadPage.displayName = "ThreadPage";
