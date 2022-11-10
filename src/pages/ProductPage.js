import { Markup } from "interweave";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { apolloClient } from "..";
import PriceFormatter from "../components/utilities/PriceFormatter";
import { PRODUCT_QUERY } from "../gql/queries";
import styles from "./ProductPage.module.scss";

export class ProductPage extends Component {
	constructor(props) {
		super();
		this.state = {
			loading: true,
			error: "",
			product: null,
			selectedAttributes: null,
			imgIndex: 0,
		};
	}
	componentDidMount() {
		apolloClient
			.query({
				query: PRODUCT_QUERY,
				variables: {
					id: this.props.location.pathname.split("/")[2],
				},
			})
			.then((query) => {
				this.setState((prev) => ({ product: query.data.product }));
			})
			.catch((e) => {
				this.setState((prev) => ({ error: e }));
			})
			.finally(() => {
				this.setState((prev) => ({ loading: false }));
			});
	}
	render() {
		if (this.state.loading) return <h1>Loading..</h1>;
		if (this.state.error) return <h1>Error..</h1>;
		const {
			name,
			id,
			brand,
			gallery,
			inStock,
			attributes,
			prices,
			description,
		} = this.state.product;
		return (
			<div className={styles.main}>
				<div className={styles.imageSection}>
					<div className={styles.imageThumbSection}>
						{gallery.map((img, i) => (
							<img
								key={img}
								src={img}
								alt='img'
								onClick={() => {
									this.setState((prev) => ({ imgIndex: i }));
								}}
								className={
									i == this.state.imgIndex ? styles.activeImage : undefined
								}
							/>
						))}
					</div>
					<div className={styles.imageLarge}>
						<img src={gallery[this.state.imgIndex]} />
					</div>
				</div>
				<div className={styles.bodySection}>
					<h1>{brand}</h1>
					<h2>{name}</h2>
					<div className={styles.attributes}>{/* Attributes */}</div>
					<div className={styles.price}>
						<h3>PRICE:</h3>
						<PriceFormatter prices={prices} />
					</div>
					<button className={styles.btnBlock}>ADD TO CART</button>
					<div className={styles.description}>
						<Markup content={description} />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ProductPage);
