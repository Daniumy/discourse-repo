import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StompSessionProvider } from "react-stomp-hooks";

const SOCKET_URL =
	"https://ergflip-backend-production.up.railway.app/ws-message";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<StompSessionProvider url={SOCKET_URL}>
			<App />
		</StompSessionProvider>
	</React.StrictMode>
);
