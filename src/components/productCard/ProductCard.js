import React, { Component } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { StoreContext } from "../../context/StoreContextProvider";
import PriceFormatter from "../utilities/PriceFormatter";
import styles from "./ProductCard.module.scss";

export class ProductCard extends Component {
	constructor(props) {
		super();
	}
	render() {
		const { name, id, inStock, brand, gallery, prices } = this.props.product;
		return (
			<Link
				to={`/product/${id}`}
				className={styles.card}
			>
				<div className={styles.imgContainer}>
					<img src={gallery[0]} />
					{!inStock && <div className={styles.outOfStock}>OUT OF STOCK</div>}
				</div>
				<div className={styles.body}>
					{inStock && (
						<StoreContext.Consumer>
							{(ctx) => (
								<div
									className={styles.addToCart}
									onClick={(e) => {
										e.preventDefault();
										ctx.addToCartWithDefault(this.props.product);
									}}
								>
									<BsCart2 className={styles.cart} />
								</div>
							)}
						</StoreContext.Consumer>
					)}
					<h3>
						{brand} {name}
					</h3>
					<h2>
						<PriceFormatter prices={prices} />
					</h2>
				</div>
			</Link>
		);
	}
}

export default withRouter(ProductCard);
