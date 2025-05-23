import { Link, useParams } from "react-router";

export const ThreadPage = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className="container mx-auto p-4">
			<div className="mb-4">
				<Link to="/" className="text-blue-500 hover:underline">
					← Назад на главную
				</Link>
			</div>
			<h1 className="text-2xl font-bold mb-4">Thread Page</h1>
			<p className="mb-4">ID события: {id}</p>
			<div className="bg-gray-100 p-4 rounded-lg">
				<h2 className="text-xl font-semibold mb-2">Содержимое Thread #{id}</h2>
				<p>Здесь будет отображаться содержимое thread с ID {id}.</p>
			</div>
		</div>
	);
};
