export interface EventGraphNode {
	id: number;
	name: string;
}

export interface EventGraphConnection {
	source: number;
	target: number;
}

export interface EventVeteransGraph {
	nodes: EventGraphNode[];
	connections: EventGraphConnection[];
}
