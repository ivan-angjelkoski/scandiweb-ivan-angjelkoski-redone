import React, { Component } from "react";
import ColorAttribute from "../productAttributes/ColorAttribute";
import TextAttribute from "../productAttributes/TextAttribute";
import PriceFormatter from "../utilities/PriceFormatter";
import styles from "./CartItem.module.scss";

export class CartItem extends Component {
	constructor(props) {
		super();
		this.state = {
			imgIndex: 0,
		};
	}
	handleNextImage = () => {
		if (this.state.imgIndex + 1 == this.props.item.product.gallery.length) {
			this.setState((prev) => ({ imgIndex: 0 }));
		} else {
			this.setState((prev) => ({ imgIndex: prev.imgIndex + 1 }));
		}
	};
	handlePrevImage = () => {
		if (this.state.imgIndex - 1 < 0) {
			this.setState((prev) => ({
				imgIndex: this.props.item.product.gallery.length - 1,
			}));
		} else {
			this.setState((prev) => ({ imgIndex: prev.imgIndex - 1 }));
		}
	};
	render() {
		const { product, selectedAttributes, uuid, amount } = this.props.item;
		const small = this.props.small;
		return (
			<div className={`${styles.item} ${small && styles.itemSm}`}>
				<div className={`${styles.body} ${small && styles.bodySm}`}>
					<div className={`${styles.bodyInfo} ${small && styles.bodyInfoSm}`}>
						<h2>{product.brand}</h2>
						<h3>{product.name}</h3>
						<h4>
							<PriceFormatter prices={product.prices} />
						</h4>
						{product.attributes.map((attr) => {
							if (attr.type == "text") {
								return (
									<TextAttribute
										key={attr.id}
										attribute={attr}
										selectedAttributes={selectedAttributes}
										disabled
										small={small}
									/>
								);
							}
							if (attr.type == "swatch") {
								return (
									<ColorAttribute
										key={attr.id}
										attribute={attr}
										selectedAttributes={selectedAttributes}
										disabled
										small={small}
									/>
								);
							}
						})}
					</div>

					<div
						className={`${styles.cartAmountControls} ${
							small && styles.cartAmountControlsSm
						}`}
					>
						<div
							onClick={() => {
								this.props.ctx.increaseAmount(uuid);
							}}
						>
							+
						</div>
						{amount}
						<div
							onClick={() => {
								this.props.ctx.decreaseAmount(uuid);
							}}
						>
							-
						</div>
					</div>
				</div>
				<div
					className={`${styles.imageSection} ${small && styles.imageSectionSm}`}
				>
					<img
						src={product.gallery[this.state.imgIndex]}
						alt='product image'
					/>
					<div
						className={`${styles.imageControls} ${
							small && styles.imageControlsSm
						}`}
					>
						<div onClick={this.handlePrevImage}>&lt;</div>
						<div onClick={this.handleNextImage}>&gt;</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CartItem;
