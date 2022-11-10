import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { StoreContext } from "../context/StoreContextProvider";

export class Home extends Component {
	render() {
		return (
			<StoreContext.Consumer>
				{(ctx) => (
					<>
						{ctx.state.categories.length > 0 && (
							<Redirect to={`/category/${ctx.state.categories[0].name}`} />
						)}
					</>
				)}
			</StoreContext.Consumer>
		);
	}
}

export default Home;
