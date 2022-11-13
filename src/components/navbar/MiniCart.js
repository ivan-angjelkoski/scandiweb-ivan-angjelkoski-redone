import React, { Component } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContextProvider";
import { currencyFormatter } from "../../utils/utilities";
import CartItem from "../cartItem/CartItem";
import styles from "./MiniCart.module.scss";

export class MiniCart extends Component {
	render() {
		return (
			<StoreContext.Consumer>
				{(ctx) => (
					<div
						className={styles.miniCart}
						onClick={(e) => e.stopPropagation()}
					>
						<h2>
							My Bag{" "}
							{ctx.state.cart.length > 0 ? (
								<span className={styles.span}>
									,
									{ctx.state.cart.reduce((prev, item) => prev + item.amount, 0)}{" "}
									Items
								</span>
							) : (
								<span>, No Items</span>
							)}
						</h2>
						<div className={styles.cartItems}>
							{ctx.state.cart.map((item) => (
								<CartItem
									item={item}
									key={item.uuid}
									ctx={ctx}
									small
								/>
							))}
						</div>
						<div className={styles.total}>
							<h3>Total:</h3>
							<h4>
								{currencyFormatter(
									ctx.state.currentCurrency.label,
									ctx.getTotal()
								)}
							</h4>
						</div>
						<div className={styles.buttons}>
							<Link
								to={"/cart"}
								onClick={() => {
									this.props.handleClick();
								}}
							>
								<button className='btnAlt'>VIEW BAG</button>
							</Link>
							<Link
								to={"/cart"}
								onClick={() => {
									this.props.handleClick();
								}}
							>
								<button>CHECK OUT</button>
							</Link>
						</div>
					</div>
				)}
			</StoreContext.Consumer>
		);
	}
}

export default MiniCart;
