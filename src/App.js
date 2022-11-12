import React, { Component } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./components/navbar/Navbar";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<main>
					<div className='container'>
						<Switch>
							<Route
								path='/'
								exact
							>
								<Home />
							</Route>
							<Route
								path='/cart'
								exact
							>
								<CartPage />
							</Route>
							<Route
								path='/category/:category'
								exact
							>
								<CategoryPage />
							</Route>
							<Route
								path='/product/:product'
								exact
							>
								<ProductPage />
							</Route>
						</Switch>
					</div>
				</main>
			</>
		);
	}
}

export default App;
