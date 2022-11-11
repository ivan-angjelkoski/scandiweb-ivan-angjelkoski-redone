import { Markup } from "interweave";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { apolloClient } from "..";
import ColorAttribute from "../components/productAttributes/ColorAttribute";
import TextAttribute from "../components/productAttributes/TextAttribute";
import PriceFormatter from "../components/utilities/PriceFormatter";
import { StoreContext } from "../context/StoreContextProvider";
import { PRODUCT_QUERY } from "../gql/queries";
import styles from "./ProductPage.module.scss";

export class ProductPage extends Component {
	constructor(props) {
		super();
		this.state = {
			loading: true,
			error: "",
			product: null,
			selectedAttributes: {},
			imgIndex: 0,
		};
	}
	componentDidMount() {
		apolloClient
			.query({
				query: PRODUCT_QUERY,
				variables: {
					id: this.props.match.params.product,
				},
			})
			.then((query) => {
				this.setState((prev) => {
					const selectedAttributes = {};

					for (const attr of query.data.product.attributes) {
						selectedAttributes[attr.id] = attr.items[0].value;
					}
					return { product: query.data.product, selectedAttributes };
				});
			})
			.catch((e) => {
				this.setState((prev) => ({ error: e }));
			})
			.finally(() => {
				this.setState((prev) => ({ loading: false }));
			});
	}
	selectAttribute = (key, value) => {
		this.setState((prev) => ({
			selectedAttributes: {
				...prev.selectedAttributes,
				[key]: value,
			},
		}));
	};
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
			<StoreContext.Consumer>
				{(ctx) => (
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
							<div className={styles.attributes}>
								{attributes.map((attr) => {
									if (attr.type == "text") {
										return (
											<TextAttribute
												attribute={attr}
												selectAttribute={this.selectAttribute}
												selectedAttributes={this.state.selectedAttributes}
											/>
										);
									} else if (attr.type == "swatch") {
										return (
											<ColorAttribute
												attribute={attr}
												selectAttribute={this.selectAttribute}
												selectedAttributes={this.state.selectedAttributes}
											/>
										);
									} else return null;
								})}
							</div>
							<div className={styles.price}>
								<h3>PRICE:</h3>
								<h4>
									<PriceFormatter prices={prices} />
								</h4>
							</div>
							<button
								disabled={!inStock}
								className={styles.btnBlock}
								onClick={() => {
									ctx.addToCart(
										this.state.product,
										this.state.selectedAttributes
									);
								}}
							>
								{inStock ? "ADD TO CART" : "OUT OF STOCK"}
							</button>
							<div className={styles.description}>
								<Markup content={description} />
							</div>
						</div>
					</div>
				)}
			</StoreContext.Consumer>
		);
	}
}

export default withRouter(ProductPage);
