export interface INode {
	id: string;
	name?: string;
	val?: number;
	x?: number;
	y?: number;
	z?: number;
	fx?: number | undefined;
	fy?: number | undefined;
	fz?: number | undefined;
	imageUrl?: string;
	// Additional properties can be added as needed
}

export interface ILink {
	source: string | INode;
	target: string | INode;
	color?: string;
}

export interface IGraphData {
	nodes: INode[];
	links: ILink[];
}
