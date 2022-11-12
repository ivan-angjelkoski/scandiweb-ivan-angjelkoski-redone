import React, { Component } from "react";
import styles from "./TextAttribute.module.scss";

export class TextAttribute extends Component {
	render() {
		// console.log(this.props.attribute);
		const { id, items, name, type } = this.props.attribute;
		const small = this.props.small;
		const disabled = this.props.disabled;
		const selectAttribute = this.props.selectAttribute;
		const selectedAttributes = this.props.selectedAttributes;
		return (
			<div className={`${styles.attributes} ${small && styles.attributesSm}`}>
				<h3
					className={`${disabled ? styles.cartStyles : null} ${
						small && styles.smFont
					}`}
				>
					{name}
				</h3>
				<div className={styles.flex}>
					{items.map((item) => (
						<div
							key={item.id}
							className={`${styles.attribute} ${small && styles.attributeSm}  ${
								selectedAttributes[id] == item.value ? styles.selected : null
							} ${disabled ? styles.disabledAttributes : null}`}
							onClick={
								!disabled
									? () => {
											selectAttribute(id, item.value);
									  }
									: null
							}
						>
							{item.value}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default TextAttribute;
