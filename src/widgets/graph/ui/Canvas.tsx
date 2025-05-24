import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import type { IGraphData, INode } from "../model";

// Интерфейс для ForceGraph3D компонента
// Определяем только те методы, которые мы используем

interface CanvasProps {
	data: IGraphData;
	onNodeClick?: (node: INode) => void;
}

// Определяем интерфейс для методов, которые будут доступны через ref
export interface CanvasRef {
	focusOnNode: (node: INode) => void;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
	({ data, onNodeClick }, ref) => {
		// Используем React.MutableRefObject для типизации ref
		// @ts-ignore - Игнорируем ошибку типизации, так как мы знаем, что ForceGraph3D предоставляет нужные методы
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const graphRef = useRef<any>(null);

		// Функция для фокусировки камеры на узле
		const focusOnNode = useCallback((node: INode) => {
			if (!node) return;

			// Фокусировка на выбранном узле
			const distance = 40;
			const x = node.x || 0;
			const y = node.y || 0;
			const z = node.z || 0;
			const distRatio = 1 + distance / Math.hypot(x, y, z);

			if (graphRef.current) {
				// @ts-ignore
				graphRef.current.cameraPosition(
					{
						x: x * distRatio,
						y: y * distRatio,
						z: z * distRatio,
					},
					node,
					2000,
				);
			}
		}, []);

		// Экспортируем методы через ref для использования на уровне страницы
		useImperativeHandle(
			ref,
			() => ({
				focusOnNode,
			}),
			[focusOnNode],
		);

		// Простая передача узла в onNodeClick без внутренней логики фокусировки
		const handleNodeClick = useCallback(
			(node: INode) => {
				if (!node || !onNodeClick) return;
				onNodeClick(node as INode);
			},
			[onNodeClick],
		);

		const handleNodeRightClick = useCallback((node: INode) => {
			// Останавливаем анимацию для выбранного узла
			if (graphRef.current) {
				// @ts-ignore
				graphRef.current.pauseAnimation();
				node.fx = node.x || 0;
				node.fy = node.y || 0;
				node.fz = node.z || 0;
			}
		}, []);

		const handleBackgroundClick = useCallback(() => {
			// Возобновляем анимацию для всех узлов
			if (graphRef.current) {
				// @ts-ignore
				graphRef.current.resumeAnimation();
				for (const node of data.nodes) {
					// @ts-ignore
					node.fx = undefined;
					// @ts-ignore
					node.fy = undefined;
					// @ts-ignore
					node.fz = undefined;
				}
			}
		}, [data.nodes]);

		return (
			<div className="w-full h-full">
				{/* @ts-ignore */}
				<ForceGraph3D
					ref={graphRef}
					graphData={data}
					nodeLabel="name"
					nodeAutoColorBy="id"
					nodeVal={(node) => node.val || 3}
					backgroundColor="#e5d9c8" /* Matches --color-background from theme */
					linkWidth={1.5}
					linkColor={(link) =>
						link.color || "#8c6d4d"
					} /* Matches --color-primary from theme */
					onNodeClick={handleNodeClick}
					onNodeRightClick={handleNodeRightClick}
					onBackgroundClick={handleBackgroundClick}
					nodeThreeObject={(node: INode) => {
						// Создаем один спрайт с круглой текстурой
						const spriteCanvas = document.createElement("canvas");
						const spriteCtx = spriteCanvas.getContext("2d");
						const size = 512; // Размер канваса
						spriteCanvas.width = size;
						spriteCanvas.height = size;

						if (spriteCtx) {
							// Очищаем канвас с полной прозрачностью
							spriteCtx.clearRect(0, 0, size, size);

							// Создаем круглую маску с полной прозрачностью вокруг
							const radius = size / 2 - 1; // Радиус чуть меньше половины размера для четкой границы
							const centerX = size / 2;
							const centerY = size / 2;

							// Рисуем окантовку в стиле war-brass
							spriteCtx.beginPath();
							spriteCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
							spriteCtx.fillStyle =
								"#d9c37e"; /* Matches --color-war-brass from theme */
							spriteCtx.fill();

							// Если есть изображение, загружаем его в круглую область
							if (node.imageUrl) {
								const img = new Image();
								img.src = node.imageUrl;
								img.onload = () => {
									// Создаем внутренний круг для изображения
									spriteCtx.save();
									spriteCtx.beginPath();
									spriteCtx.arc(centerX, centerY, radius - 5, 0, Math.PI * 2);
									spriteCtx.clip();

									// Рисуем изображение внутри круга
									spriteCtx.drawImage(img, 0, 0, size, size);
									spriteCtx.restore();

									// Обновляем текстуру после загрузки изображения
									spriteTexture.needsUpdate = true;
								};
							}
						}

						// Создаем текстуру и материал с прозрачностью
						const spriteTexture = new THREE.CanvasTexture(spriteCanvas);
						const spriteMaterial = new THREE.SpriteMaterial({
							map: spriteTexture,
							transparent: true,
							alphaTest: 0.1, // Важно для правильной обработки прозрачности
						});

						// Создаем спрайт с правильным масштабом
						const sprite = new THREE.Sprite(spriteMaterial);
						const scale = (node.val || 3) * 10;
						sprite.scale.set(scale, scale, 1);

						return sprite;
					}}
				/>
			</div>
		);
	},
);
