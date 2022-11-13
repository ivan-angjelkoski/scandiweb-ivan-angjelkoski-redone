import React, { Component } from "react";
import { currencyFormatter } from "../../utils/utilities";
import CartItem from "../cartItem/CartItem";
import styles from "./CartItems.module.scss";

export class CartItems extends Component {
	render() {
		const items = this.props.ctx.state.cart;
		const currentCurrency = this.props.ctx.state.currentCurrency;
		const tax = this.props.ctx.state.tax;
		const quantity = items.reduce((prev, item) => prev + item.amount, 0);
		const total = this.props.ctx.getTotal();
		const taxCalculated = total * (tax / 100);

		return (
			<>
				<div>
					{items.length === 0 && (
						<h1 className={styles.noItems}>No Items In Cart...</h1>
					)}
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
						<div>{currencyFormatter(currentCurrency.label, taxCalculated)}</div>
						<div>Quantity:</div>
						<div>{quantity}</div>
						<div>Total:</div>
						<div>{currencyFormatter(currentCurrency.label, total)}</div>
					</div>
					<button>ORDER</button>
				</div>
			</>
		);
	}
}

export default CartItems;
