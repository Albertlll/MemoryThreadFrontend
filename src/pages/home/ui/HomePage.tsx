import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Place } from "../../../entities/place/model";
import { httpClient } from "../../../shared/api";
import { Modal } from "../../../shared/ui/Modal/Modal";
import { VeteranForm } from "../../../shared/ui/VeteranForm/VeteranForm";
import { MapWidget } from "../../../widgets/map";

export const HomePage = () => {
	const [selectedYear, setSelectedYear] = useState<number>(-1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const years = [1940, 1941, 1942, 1943, 1944, 1945];
	const [places, setPlaces] = useState<Place[]>([]);

	const handleVeteranSubmit = (data: {
		first_name: string;
		last_name: string;
		patronymic: string;
		biography: string;
		image_base64: string;
	}) => {
		httpClient.post("/veterans/", data).then(() => {});
		console.log("Veteran data submitted:", data);
		// Here you would typically send this data to your API
	};

	useEffect(() => {
		const fetchPlaces = async () => {
			try {
				const response = await httpClient.get("events/", {
					params: {
						year: selectedYear,
					},
				});
				console.log(response.data);
				setPlaces(response.data);
			} catch (error) {
				console.error("Error fetching places:", error);
			}
		};

		fetchPlaces();
	}, [selectedYear]);
	return (
		<div className="h-screen w-screen flex">
			<div className="z-10 p-4 text-left bg-background/80 rounded-br-lg">
				<h1 className="war-title text-lg font-bold mb-2">Карта событий ВОВ</h1>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>1941-1945 годы</span>
				</div>

				<div className="flex flex-wrap gap-2 mt-4">
					<button
						type="button"
						className={`px-3 py-1 text-sm rounded ${
							selectedYear === -1
								? "bg-war-brass text-white"
								: "bg-muted text-foreground border border-war-brass/40 hover:bg-muted/80"
						}`}
						onClick={() => setSelectedYear(-1)}
					>
						Все
					</button>
					{years.map((year) => (
						<button
							type="button"
							key={year}
							className={`px-3 py-1 text-sm rounded ${
								selectedYear === year
									? "bg-war-brass text-white"
									: "bg-muted text-foreground border border-war-brass/40 hover:bg-muted/80"
							}`}
							onClick={() => setSelectedYear(year)}
						>
							{year}
						</button>
					))}
				</div>

				<div className="mt-4">
					<button
						type="button"
						className="px-3 py-1 text-sm rounded bg-war-brass text-white hover:bg-war-brass/90"
						onClick={() => setIsModalOpen(true)}
					>
						Добавить ветерана
					</button>
					<Modal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						title="Информация о ветеране"
					>
						<VeteranForm
							onSubmit={(data) => {
								handleVeteranSubmit(data);
								setIsModalOpen(false);
							}}
							onCancel={() => setIsModalOpen(false)}
						/>
					</Modal>
				</div>
			</div>
			<MapWidget places={places} zoom={10} />
		</div>
	);
};
