import React, { Component } from "react";
import { StoreContext } from "../../context/StoreContextProvider";
import { currencyFormatter } from "../../utils/utilities";

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
						// return `${currency.amount.toFixed(2)} ${currency.currency.symbol}`;
						return `${currencyFormatter(
							currentCurrency.label,
							currency.amount
						)}`;
					} else {
						return "Loading...";
					}
				}}
			</StoreContext.Consumer>
		);
	}
}

export default PriceFormatter;
