import React, { Component } from "react";
import CartItem from "../cartItem/CartItem";
import styles from "./CartItems.module.scss";

export class CartItems extends Component {
	render() {
		const items = this.props.ctx.state.cart;
		const currentCurrency = this.props.ctx.state.currentCurrency;
		const tax = this.props.ctx.state.tax;
		const quantity = items.reduce((prev, item) => prev + item.amount, 0);
		const total = items.reduce((prev, item) => {
			const price = item.product.prices.find(
				(price) => price.currency.label == currentCurrency.label
			);
			return prev + price.amount * item.amount;
		}, 0);
		const taxCalculated = total * (tax / 100);
		return (
			<>
				<div>
					{items.map((item) => (
						<CartItem
							key={item.uuid}
							item={item}
							ctx={this.props.ctx}
						/>
					))}
				</div>
				<div className={styles.orderSection}>
					<div className={styles.tableGrid}>
						<div>Tax {tax}%:</div>
						<div>
							{taxCalculated.toFixed(2)} {currentCurrency.symbol}
						</div>
						<div>Quantity:</div>
						<div>{quantity}</div>
						<div>Total:</div>
						<div>
							{total.toFixed(2)} {currentCurrency.symbol}
						</div>
					</div>
					<button>ORDER</button>
				</div>
			</>
		);
	}
}

export default CartItems;
