import { memo } from "react";
import type { INode } from "../../../widgets/graph";

// Updated Veteran interface to match the new API response format
interface VeteranInfo {
	id: number;
	name: string;
	biography: string;
	image_url: string;
}

interface VeteranInfoSidebarProps {
	selectedNode: INode;
	veteranData: VeteranInfo | null;
	veteranLoading: boolean;
	veteranError: string | null;
	onClose: () => void;
}

// Используем React.memo для предотвращения ререндера при неизменившихся пропсах
export const VeteranInfoSidebar = memo(
	({
		selectedNode,
		veteranData,
		veteranLoading,
		veteranError,
		onClose,
	}: VeteranInfoSidebarProps) => {
		return (
			<div className="md:w-1/3 bg-background p-6 rounded-bl-lg shadow-lg absolute right-0 h-full war-card">
				{/* Кнопка закрытия */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
					aria-label="Закрыть"
				>
					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{veteranLoading ? (
					<div className="flex justify-center items-center h-40">
						<p className="text-muted-foreground">
							Загрузка информации о ветеране...
						</p>
					</div>
				) : veteranError ? (
					<div className="text-war-blood p-4">
						<p>{veteranError}</p>
						<p className="mt-2 text-muted-foreground">
							Отображаем базовую информацию из графа:
						</p>
						<h2 className="war-title text-xl font-bold mt-4">
							{selectedNode.name || `Ветеран #${selectedNode.id}`}
						</h2>
					</div>
				) : veteranData ? (
					<div className="space-y-4">
						<h2 className="war-title text-xl font-bold">{veteranData.name}</h2>

						{veteranData.image_url && (
							<div className="mt-4">
								<img
									src={veteranData.image_url}
									alt="Фотография ветерана"
									className="w-full max-w-xs rounded-lg shadow-md mx-auto border border-war-brass"
								/>
							</div>
						)}

						{veteranData.biography && (
							<div className="mt-4">
								<h3 className="text-lg font-semibold mb-2 text-accent">
									Биография
								</h3>
								<p className="text-foreground whitespace-pre-line">
									{veteranData.biography}
								</p>
							</div>
						)}
					</div>
				) : (
					<div className="space-y-4">
						<h2 className="war-title text-xl font-bold mb-4">
							{selectedNode.name || selectedNode.id}
						</h2>

						<div>
							<h3 className="text-lg font-semibold mb-2 text-accent">
								Информация
							</h3>
							<p className="text-foreground">ID: {selectedNode.id}</p>
							{selectedNode.val && (
								<p className="text-foreground">Значение: {selectedNode.val}</p>
							)}
						</div>

						{selectedNode.imageUrl && (
							<div>
								<h3 className="text-lg font-semibold mb-2 text-accent">
									Изображение
								</h3>
								<img
									src={selectedNode.imageUrl}
									alt="Изображение ветерана"
									className="w-full max-w-xs rounded-lg shadow-md border border-war-brass"
								/>
							</div>
						)}
					</div>
				)}
			</div>
		);
	},
);

// Добавляем отображаемое имя для компонента (полезно для отладки)
VeteranInfoSidebar.displayName = "VeteranInfoSidebar";
