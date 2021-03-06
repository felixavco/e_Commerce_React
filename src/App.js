import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/App.css';
//React Router
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// utils
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

/*** Components ***/
// Layout Components
import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/Footer';
//Products Components
import AllProducts from './components/products/AllProducts';
import Department from './components/products/Department';
import Category from './components/products/Category';
import SearchResults from './components/products/SearchResults';
//Authentication Components
import PrivateRoute from './components/authentication/PrivateRoute';
import { logoutUser, setCurrentUser } from './redux/actions/authActions';
//Customer Componets
import Profile from './components/customer/Profile';
//Shopping Cart Components
import MyBag from './components/shoppingCart/MyBag';
import Checkout from './components/shoppingCart/Checkout/Checkout';
//Nof Found Page
import NotFound from './components/commons/NotFound';

//Checks if there is a token stored in LocalStorage
if (localStorage.jwtToken) {
	// Sets auth authorization token to header
	setAuthToken(localStorage.jwtToken);
	//Decode token and get user info and expiration
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	/*Check if token has expired */
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//Logout the user
		store.dispatch(logoutUser());
		// Clear current profile
		store.dispatch(setCurrentUser({}));
		//Redirect to login
		window.location.href = '/';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<Navbar />
							<div id="main">
								<Switch>
									<Route exact path="/my-bag" component={MyBag} />
									<Route exact path="/" component={AllProducts} />
									<Route exact path="/search-results" component={SearchResults} />
									<Route exact path="/deparment/:deptId" component={Department} />
									<Route exact path="/category/:catId" component={Category} />
									<Route exact path="/checkout" component={Checkout} />
									{/* Private Routes */}
									<PrivateRoute exact path="/profile" component={Profile} />
									{/* CatchAll route  404 page */}
									<Route exact path="/not-found" component={NotFound} />
									<Redirect to="/not-found" />
								</Switch>
							</div>
						<Footer />
					</Fragment>
				</Router>
			</Provider>
		);
	}
}

export default App;
