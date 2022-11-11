import React, { Component } from "react";
import CartItems from "../components/cartItems/CartItems";
import { StoreContext } from "../context/StoreContextProvider";
import styles from "./CartPage.module.scss";

export class CartPage extends Component {
	render() {
		return (
			<div>
				<div className={styles.header}>
					<h1>CART</h1>
				</div>
				<StoreContext.Consumer>
					{(ctx) => <CartItems ctx={ctx} />}
				</StoreContext.Consumer>
			</div>
		);
	}
}

export default CartPage;
