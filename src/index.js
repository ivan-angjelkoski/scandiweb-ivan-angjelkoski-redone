import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import StoreContextProvider from "./context/StoreContextProvider";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const apolloClient = new ApolloClient({
	uri: "http://localhost:4000",
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<StoreContextProvider>
			<ApolloProvider client={apolloClient}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ApolloProvider>
		</StoreContextProvider>
	</React.StrictMode>
);
