import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { StoreContext } from "../../context/StoreContextProvider";
import styles from "./Navbar.module.scss";
import CurrencyMenu from "./CurrencyMenu";
import CartMenu from "./CartMenu";

export class Navbar extends Component {
	render() {
		const activeRoute = this.props.location.pathname.split("/")[2];

		return (
			<StoreContext.Consumer>
				{(ctx) => {
					return (
						<nav className={styles.nav}>
							<div className={`container ${styles.container}`}>
								<ul>
									{ctx.state.categories.map((category) => (
										<li key={category.name}>
											<Link
												className={
													category.name === activeRoute
														? styles.active
														: undefined
												}
												to={`/category/${category.name}`}
											>
												{category.name}
											</Link>
										</li>
									))}
								</ul>
								<Link to={"/cart"}>
									<img
										src='/store_logo.svg'
										alt='cart'
									/>
								</Link>
								<div className={styles.menu}>
									{!ctx.state.loading && <CurrencyMenu />}
									<CartMenu />
								</div>
							</div>
						</nav>
					);
				}}
			</StoreContext.Consumer>
		);
	}
}

export default withRouter(Navbar);
