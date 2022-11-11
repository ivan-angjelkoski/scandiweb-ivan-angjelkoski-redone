import React, { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { apolloClient } from "..";
import ProductCard from "../components/productCard/ProductCard";
import { CATEGORY_QUERY } from "../gql/queries";
import styles from "./CategoryPage.module.scss";

export class CategoryPage extends Component {
	constructor(props) {
		super();
		this.state = {
			products: [],
			category: "",
		};
	}
	componentDidMount() {
		apolloClient
			.query({
				query: CATEGORY_QUERY,
				variables: {
					title: this.props.match.params.category,
				},
			})
			.then((query) => {
				this.setState((prev) => ({
					products: query.data.category.products,
					category: this.props.match.params.category,
				}));
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.location.pathname != this.props.location.pathname) {
			apolloClient
				.query({
					query: CATEGORY_QUERY,
					variables: {
						title: this.props.match.params.category,
					},
				})
				.then((query) => {
					this.setState((prev) => ({
						products: query.data.category.products,
						category: "this.props.match.params.category",
					}));
				});
		}
	}

	render() {
		const category = this.props.match.params.category;
		return (
			<div>
				<div className={styles.header}>
					<h1>{category}</h1>
				</div>
				<div className={styles.grid}>
					{this.state.products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default withRouter(CategoryPage);
