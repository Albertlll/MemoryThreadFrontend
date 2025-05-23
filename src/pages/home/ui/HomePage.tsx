import { Link } from "react-router";

export const HomePage = () => {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Главная страница</h1>
			<div className="flex flex-col gap-4">
				<Link to="/thread/1" className="text-blue-500 hover:underline">
					Thread #1
				</Link>
				<Link to="/thread/2" className="text-blue-500 hover:underline">
					Thread #2
				</Link>
				<Link to="/thread/3" className="text-blue-500 hover:underline">
					Thread #3
				</Link>
			</div>
		</div>
	);
};
