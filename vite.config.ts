import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	preview: {
		allowedHosts: ["xn--90agckyhgx0ge.xn--p1ai"],
	},
});
