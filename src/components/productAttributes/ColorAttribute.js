import React, { Component } from "react";
import styles from "./ColorAttribute.module.scss";
export class ColorAttribute extends Component {
	render() {
		console.log(this.props.attribute);
		const { id, items, name, type } = this.props.attribute;
		const size = this.props.size ?? "lg";
		const selectAttribute = this.props.selectAttribute;
		const selectedAttributes = this.props.selectedAttributes;
		return (
			<div className={styles.attributes}>
				<h3>{name}</h3>
				<div className={styles.flex}>
					{items.map((attr) => (
						<div
							onClick={() => {
								selectAttribute(id, attr.value);
							}}
							className={`${styles.attribute} ${
								selectedAttributes[id] == attr.value ? styles.selected : null
							}`}
							style={{ backgroundColor: attr.value }}
						></div>
					))}
				</div>
			</div>
		);
	}
}

export default ColorAttribute;
