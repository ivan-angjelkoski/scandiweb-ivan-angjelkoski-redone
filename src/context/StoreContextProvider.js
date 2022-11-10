import React, { Component, createContext } from "react";
import { apolloClient } from "..";
import { INITIAL_QUERY } from "../gql/queries";

export const StoreContext = createContext({
	state: {
		loading: true,
		error: "",
		categories: [],
		currencies: [],
		cart: [],
		currentCurrency: {},
		tax: 21,
	},
	updateCurrency() {},
});

export class StoreContextProvider extends Component {
	constructor(props) {
		super();
		const fromLocalStorage = JSON.parse(localStorage.getItem("storeContext"));
		this.state = {
			loading: true,
			error: "",
			categories: [],
			currencies: [],
			cart: [],
			currentCurrency: fromLocalStorage
				? fromLocalStorage.currentCurrency
				: null,
			tax: 21,
		};
	}
	componentDidMount() {
		const fromLocalStorage = JSON.parse(localStorage.getItem("storeContext"));
		// console.log(fromLocalStorage);
		this.setState((prev) => ({ loading: true }));
		apolloClient
			.query({
				query: INITIAL_QUERY,
			})
			.then((query) => {
				this.setState((prev) => ({
					currencies: query.data.currencies,
					categories: query.data.categories,
					currentCurrency: fromLocalStorage
						? fromLocalStorage.currentCurrency
						: query.data.currencies[0],
					cart: fromLocalStorage ? fromLocalStorage.cart : [],
				}));
			})
			.catch((e) => {
				this.setState((prev) => ({ error: e }));
			})
			.finally(() => {
				this.setState((prev) => ({ loading: false }));
			});
	}
	componentDidUpdate(prevProps, prevState) {
		localStorage.setItem(
			"storeContext",
			JSON.stringify({
				currentCurrency: this.state.currentCurrency,
				cart: this.state.cart,
			})
		);
	}

	updateCurrency = (currency) => {
		this.setState((prev) => ({ currentCurrency: currency }));
	};

	render() {
		return (
			<StoreContext.Provider
				value={{
					state: this.state,
					updateCurrency: this.updateCurrency,
				}}
			>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}

export default StoreContextProvider;
