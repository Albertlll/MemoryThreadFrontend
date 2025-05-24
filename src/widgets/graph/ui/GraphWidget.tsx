import { memo, useCallback, useRef } from "react";
import type { IGraphData, INode } from "../model";
import { Canvas, type CanvasRef } from "./Canvas";

interface GraphWidgetProps {
	data: IGraphData;
	onNodeClick?: (node: INode) => void;
	className?: string;
}

// Используем React.memo для предотвращения ререндера при неизменившихся пропсах
export const GraphWidget = memo(
	({ data, onNodeClick, className = "" }: GraphWidgetProps) => {
		const canvasRef = useRef<CanvasRef>(null);

		const handleNodeClick = useCallback(
			(node: INode) => {
				// Вызываем внешний обработчик, если он предоставлен
				if (onNodeClick) {
					onNodeClick(node);
				}
			},
			[onNodeClick],
		);

		return (
			<div className={`relative w-full h-full ${className}`}>
				<Canvas ref={canvasRef} data={data} onNodeClick={handleNodeClick} />
			</div>
		);
	},
);

// Добавляем отображаемое имя для компонента (полезно для отладки)
GraphWidget.displayName = "GraphWidget";
