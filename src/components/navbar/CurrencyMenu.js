import React, { Component } from "react";
import { StoreContext } from "../../context/StoreContextProvider";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./CurrencyMenu.module.scss";

export class CurrencyMenu extends Component {
	constructor(props) {
		super();
		this.state = {
			isOpen: false,
		};
	}
	handleClick = () => {
		this.setState((prev) => ({ isOpen: !prev.isOpen }));
	};

	render() {
		const isOpen = this.state.isOpen;
		const size = "16px";
		return (
			<StoreContext.Consumer>
				{(ctx) => {
					return (
						<div
							className={styles.menu}
							onClick={this.handleClick}
						>
							<div style={{ fontSize: "20px" }}>
								{ctx.state.currentCurrency.symbol}
							</div>
							<div>
								{isOpen ? (
									<FaChevronUp size={size} />
								) : (
									<FaChevronDown size={size} />
								)}
							</div>
							{isOpen && (
								<div className={styles.dropdown}>
									<ul>
										{ctx.state.currencies.map((curr) => (
											<li
												key={curr.label}
												onClick={() => {
													ctx.updateCurrency(curr);
												}}
											>
												<div>{curr.symbol}</div>
												<div>{curr.label}</div>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					);
				}}
			</StoreContext.Consumer>
		);
	}
}

export default CurrencyMenu;
