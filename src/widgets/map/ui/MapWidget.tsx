import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import { Link } from "react-router";
import type { Place } from "../../../entities/place";
// import kartabumaga from "./kartabumaga.png";

// Создаем иконку для событий
const createMilitaryIcon = () => {
	const size = 40;
	const color = "#dc2626"; // красный

	return L.divIcon({
		className: "military-marker",
		html: `<div style="
			width: ${size}px;
			height: ${size}px;
			background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
			border: 3px solid #ffffff;
			border-radius: 50%;
			box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2);
			cursor: pointer;
			transition: all 0.2s ease;
			position: relative;
		" onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.5), 0 3px 6px rgba(0,0,0,0.3)';" 
			onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)';"></div>`,
		iconSize: [size, size],
		iconAnchor: [size / 2, size / 2],
	});
};

// Компонент для управления картой
function MapController({ selectedPlace }: { selectedPlace: Place | null }) {
	const map = useMap();

	useEffect(() => {
		if (selectedPlace) {
			map.flyTo([selectedPlace.latitude, selectedPlace.longitude], 7, {
				duration: 1,
			});
		}
	}, [selectedPlace, map]);

	return null;
}

interface MapWidgetProps {
	center?: LatLngExpression;
	zoom?: number;
	places?: Place[];
}

export const MapWidget = ({
	center = [55.7558, 37.6173], // Default to Moscow coordinates
	zoom = 5,
	places = [],
}: MapWidgetProps) => {
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

	useEffect(() => {
		// This effect ensures the map is properly sized when it's mounted
		window.dispatchEvent(new Event("resize"));
	}, []);

	const handlePlaceClick = (place: Place) => {
		setSelectedPlace(place);
	};

	return (
		<div className="h-full w-full relative">
			{/* Map title and year filter */}

			<MapContainer
				center={center}
				zoom={zoom}
				style={{ height: "100%", width: "100%" }}
				scrollWheelZoom={true}
				zoomControl={true}
				attributionControl={false}
				className="z-0"
			>
				{/* Map tiles */}
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{/* 
				<ImageOverlay
					bounds={bounds}
					url={kartabumaga}
					opacity={0.5}
					zIndex={1000}
				/> */}

				{/* Контроллер карты для центрирования */}
				<MapController selectedPlace={selectedPlace} />

				{places.map((place) => {
					const militaryIcon = createMilitaryIcon();

					return (
						<Marker
							key={place.id}
							position={[place.latitude, place.longitude]}
							icon={militaryIcon}
							eventHandlers={{
								click: () => handlePlaceClick(place),
							}}
						>
							<Popup>
								<div className="p-3 min-w-[250px]">
									<h3 className="war-title text-lg mb-2">{place.name}</h3>

									{/* Отображение исторического названия города */}
									{place.name && (
										<div className="historical-name text-sm mb-2 px-2 py-1 bg-war-brass/20 border border-war-brass/40 rounded">
											<span className="text-war-brass font-semibold">
												{place.historical_name}
											</span>
										</div>
									)}

									<div className="text-sm text-foreground/80 mb-3 leading-relaxed">
										{place.description.length > 150
											? `${place.description.substring(0, 150)}...`
											: place.description}
									</div>
									<Link to={`/thread/${place.id}`}>
										<button
											type="button"
											className="bg-accent hover:bg-accent/80 text-accent-foreground px-3 py-1 rounded text-sm font-medium transition-colors border border-war-brass"
											onClick={() => handlePlaceClick(place)}
										>
											ПОДРОБНЕЕ
										</button>
									</Link>
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
};
