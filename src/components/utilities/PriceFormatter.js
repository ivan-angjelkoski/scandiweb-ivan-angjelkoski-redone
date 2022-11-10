import React, { Component } from "react";
import { StoreContext } from "../../context/StoreContextProvider";

export class PriceFormatter extends Component {
	render() {
		return (
			<StoreContext.Consumer>
				{(ctx) => {
					if (ctx.state.currentCurrency) {
						const currentCurrency = ctx.state.currentCurrency;
						const prices = this.props.prices;
						const currency = prices.find(
							(price) => price.currency.label == currentCurrency.label
						);
						return `${currency.amount.toFixed(2)} ${currency.currency.symbol}`;
					} else {
						return "Loading...";
					}
				}}
			</StoreContext.Consumer>
		);
	}
}

export default PriceFormatter;
