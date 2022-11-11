import React, { Component } from "react";
import styles from "./TextAttribute.module.scss";

export class TextAttribute extends Component {
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
					{items.map((item) => (
						<div
							key={item.id}
							className={`${styles.attribute} ${
								selectedAttributes[id] == item.value ? styles.selected : null
							}`}
							onClick={() => {
								selectAttribute(id, item.value);
							}}
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
