import { memo } from "react";
import type { INode } from "../../../widgets/graph";
import { VeteranInfoSidebar } from "./VeteranInfoSidebar";

// Updated Veteran interface to match the new API response format
interface VeteranInfo {
	id: number;
	name: string;
	biography: string;
	image_url: string;
}

interface SidebarSectionProps {
	selectedNode: INode | null;
	veteranData: VeteranInfo | null;
	veteranLoading: boolean;
	veteranError: string | null;
	onClose: () => void;
}

// This component is completely isolated and only handles the sidebar rendering
// It will only re-render when its props change
export const SidebarSection = memo(
	({
		selectedNode,
		veteranData,
		veteranLoading,
		veteranError,
		onClose,
	}: SidebarSectionProps) => {
		console.log("SidebarSection render"); // For debugging

		if (!selectedNode) return null;

		return (
			<div className="md:w-1/3 h-full bg-background">
				<VeteranInfoSidebar
					selectedNode={selectedNode}
					veteranData={veteranData}
					veteranLoading={veteranLoading}
					veteranError={veteranError}
					onClose={onClose}
				/>
			</div>
		);
	},
);

SidebarSection.displayName = "SidebarSection";
