import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { StoreContext } from "../../context/StoreContextProvider";
import { BsCart2 } from "react-icons/bs";
import styles from "./Navbar.module.scss";
import CurrencyMenu from "./CurrencyMenu";

export class Navbar extends Component {
	render() {
		const activeRoute = this.props.location.pathname.split("/")[2];

		return (
			<StoreContext.Consumer>
				{(ctx) => {
					return (
						<nav className={styles.nav}>
							<ul>
								{ctx.state.categories.map((category) => (
									<li key={category.name}>
										<Link
											className={
												category.name == activeRoute ? styles.active : undefined
											}
											to={`/category/${category.name}`}
										>
											{category.name}
										</Link>
									</li>
								))}
							</ul>
							<img src='/store_logo.svg' />
							<div className={styles.menu}>
								{!ctx.state.loading && <CurrencyMenu />}
								<BsCart2 size={"18px"} />
							</div>
						</nav>
					);
				}}
			</StoreContext.Consumer>
		);
	}
}

export default withRouter(Navbar);
