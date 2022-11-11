import { gql } from "@apollo/client";

export const INITIAL_QUERY = gql`
	query {
		categories {
			name
		}
		currencies {
			label
			symbol
		}
	}
`;

export const CATEGORY_QUERY = gql`
	query getCategory($title: String!) {
		category(input: { title: $title }) {
			products {
				id
				name
				inStock
				gallery
				attributes {
					id
					name
					type
					items {
						displayValue
						value
						id
					}
				}
				prices {
					currency {
						label
						symbol
					}
					amount
				}
				brand
			}
		}
	}
`;

export const PRODUCT_QUERY = gql`
	query getProduct($id: String!) {
		product(id: $id) {
			id
			name
			inStock
			gallery
			description
			category
			attributes {
				id
				name
				type
				items {
					displayValue
					value
					id
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
			brand
		}
	}
`;
