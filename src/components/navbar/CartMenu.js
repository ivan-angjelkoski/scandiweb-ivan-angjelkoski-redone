import React, { Component } from "react";
import { createPortal } from "react-dom";
import { BsCart2 } from "react-icons/bs";
import { StoreContext } from "../../context/StoreContextProvider";
import styles from "./CartMenu.module.scss";
import MiniCart from "./MiniCart";

export class CartMenu extends Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
		};
	}
	handleClick = () => {
		this.setState((prev) => ({ isOpen: !prev.isOpen }));
	};
	render() {
		return (
			<StoreContext.Consumer>
				{(ctx) => (
					<div
						className={styles.cartContainer}
						onClick={this.handleClick}
					>
						<BsCart2 size={"24px"} />
						{ctx.state.cart.length > 0 && (
							<div className={styles.quantity}>
								<p>
									{ctx.state.cart.reduce((prev, item) => prev + item.amount, 0)}
								</p>
							</div>
						)}
						{this.state.isOpen && (
							<>
								<div className={styles.miniCart}>
									<MiniCart handleClick={this.handleClick} />
								</div>
								{createPortal(
									<div className={styles.overlay} />,
									document.getElementById("overlay")
								)}
							</>
						)}
					</div>
				)}
			</StoreContext.Consumer>
		);
	}
}

export default CartMenu;
