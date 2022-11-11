import React, { Component, createContext } from "react";
import { apolloClient } from "..";
import { INITIAL_QUERY } from "../gql/queries";
import { v4 as uuid } from "uuid";

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
	addToCartWithDefault() {},
	addToCart() {},
	increaseAmount() {},
	decreaseAmount() {},
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

	addToCart = (product, selectedAttributes) => {
		// todo find if there is a product with the same attributes...
		const cartProduct = this.state.cart.find((cartItem) => {
			let isSame = true;
			for (const key of Object.keys(cartItem.selectedAttributes)) {
				if (selectedAttributes[key] !== cartItem.selectedAttributes[key]) {
					isSame = false;
				}
			}
			return cartItem.product.id == product.id && isSame;
		});

		if (cartProduct) {
			this.setState((prev) => ({
				cart: prev.cart.map((cartItem) => {
					if (cartItem.uuid == cartProduct.uuid) {
						return {
							...cartItem,
							amount: cartItem.amount + 1,
						};
					} else {
						return cartItem;
					}
				}),
			}));
		} else {
			this.setState((prev) => ({
				cart: [
					...prev.cart,
					{ product, selectedAttributes, amount: 1, uuid: uuid() },
				],
			}));
		}
	};

	addToCartWithDefault = (product) => {
		const selectedAttributes = {};
		for (const attr of product.attributes) {
			console.log(attr);
			selectedAttributes[attr.id] = attr.items[0].value;
		}
		this.addToCart(product, selectedAttributes);
	};

	increaseAmount = (uuid) => {
		this.setState((prev) => ({
			cart: prev.cart.map((cartItem) => {
				if (cartItem.uuid == uuid) {
					return {
						...cartItem,
						amount: cartItem.amount + 1,
					};
				} else {
					return cartItem;
				}
			}),
		}));
	};
	decreaseAmount = (uuid) => {
		const cartItem = this.state.cart.find((item) => item.uuid == uuid);
		if (cartItem.amount - 1 == 0) {
			console.log("Running If");
			this.setState((prev) => ({
				cart: prev.cart.filter((item) => item.uuid != uuid),
			}));
		} else {
			console.log("Running Else");
			this.setState((prev) => ({
				cart: prev.cart.map((cartItem) => {
					if (cartItem.uuid == uuid) {
						return {
							...cartItem,
							amount: cartItem.amount - 1,
						};
					} else {
						return cartItem;
					}
				}),
			}));
		}
	};

	render() {
		return (
			<StoreContext.Provider
				value={{
					state: this.state,
					updateCurrency: this.updateCurrency,
					addToCartWithDefault: this.addToCartWithDefault,
					addToCart: this.addToCart,
					increaseAmount: this.increaseAmount,
					decreaseAmount: this.decreaseAmount,
				}}
			>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}

export default StoreContextProvider;
