import React, { Component } from "react";
import styles from "./ColorAttribute.module.scss";
export class ColorAttribute extends Component {
	render() {
		// console.log(this.props.attribute);
		const { id, items, name, type } = this.props.attribute;
		const small = this.props.small;
		const disabled = this.props.disabled;
		const selectAttribute = this.props.selectAttribute;
		const selectedAttributes = this.props.selectedAttributes;
		return (
			<div className={styles.attributes}>
				<h3
					className={`${disabled ? styles.cartStyles : null} ${
						small && styles.smFont
					}`}
				>
					{name}
				</h3>
				<div className={styles.flex}>
					{items.map((attr) => (
						<div
							onClick={
								!disabled
									? () => {
											selectAttribute(id, attr.value);
									  }
									: null
							}
							className={`${styles.attribute} ${small && styles.attributeSm} ${
								selectedAttributes[id] == attr.value ? styles.selected : null
							} ${disabled ? styles.disabledAttributes : null}`}
							style={{ backgroundColor: attr.value }}
						></div>
					))}
				</div>
			</div>
		);
	}
}

export default ColorAttribute;
