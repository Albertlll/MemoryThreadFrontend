import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface VeteranFormData {
	first_name: string;
	last_name: string;
	patronymic: string;
	biography: string;
	image_base64: string;
}

interface VeteranFormProps {
	onSubmit: (data: VeteranFormData) => void;
	onCancel?: () => void;
	initialData?: Partial<VeteranFormData>;
}

export const VeteranForm = ({
	onSubmit,
	onCancel,
	initialData = {},
}: VeteranFormProps) => {
	const [formData, setFormData] = useState<VeteranFormData>({
		first_name: initialData.first_name || "",
		last_name: initialData.last_name || "",
		patronymic: initialData.patronymic || "",
		biography: initialData.biography || "",
		image_base64: initialData.image_base64 || "",
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			const base64String = reader.result as string;
			setFormData((prev) => ({
				...prev,
				image_base64: base64String,
			}));
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
			<div>
				<label
					htmlFor="last_name"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Фамилия
				</label>
				<input
					type="text"
					id="last_name"
					name="last_name"
					value={formData.last_name}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-war-brass focus:border-war-brass"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="first_name"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Имя
				</label>
				<input
					type="text"
					id="first_name"
					name="first_name"
					value={formData.first_name}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-war-brass focus:border-war-brass"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="patronymic"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Отчество
				</label>
				<input
					type="text"
					id="patronymic"
					name="patronymic"
					value={formData.patronymic}
					onChange={handleChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-war-brass focus:border-war-brass"
				/>
			</div>

			<div>
				<label
					htmlFor="biography"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Биография
				</label>
				<textarea
					id="biography"
					name="biography"
					value={formData.biography}
					onChange={handleChange}
					rows={4}
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-war-brass focus:border-war-brass"
				/>
			</div>

			<div>
				<label
					htmlFor="image"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Фотография
				</label>
				<input
					type="file"
					id="image"
					name="image"
					accept="image/*"
					onChange={handleImageChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-war-brass focus:border-war-brass"
				/>
				{formData.image_base64 && (
					<div className="mt-2">
						<img
							src={formData.image_base64}
							alt="Preview"
							className="h-32 w-auto object-cover rounded-md"
						/>
					</div>
				)}
			</div>

			<div className="flex justify-end space-x-2 pt-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-war-brass"
					>
						Отмена
					</button>
				)}
				<button
					type="submit"
					className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-war-brass hover:bg-war-brass/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-war-brass"
				>
					Сохранить
				</button>
			</div>
		</form>
	);
};
