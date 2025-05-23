import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routers";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(<RouterProvider router={router} />);
}
