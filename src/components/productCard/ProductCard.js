import React, { Component } from "react";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
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
						<div className={styles.addToCart}>
							<BsCart2 className={styles.cart} />
						</div>
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
