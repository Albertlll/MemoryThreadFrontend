import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home";
import { ThreadPage } from "./pages/thread";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: HomePage,
	},
	{
		path: "/thread/:id",
		Component: ThreadPage,
	},
]);
