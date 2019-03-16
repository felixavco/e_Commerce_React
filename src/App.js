import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/App.css';
//React Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import SingleProduct from './components/products/SingleProduct';
//Authentication Components
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import PrivateRoute from './components/authentication/PrivateRoute';
import { logoutUser, setCurrentUser } from './redux/actions/authActions';
//Customer Componets 
import Profile from './components/customer/Profile';
//Shopping Cart Components 
import MyBag from './components/shoppingCart/MyBag';

//Checks if there is a token stored in LocalStorage
if(localStorage.jwtToken) {
  // Sets auth authorization token to header
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  /*Check if token has expired */
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(setCurrentUser({}));
    //Redirect to login
		window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={AllProducts} />
                <Route exact path="/product/:productId" component={SingleProduct} />
                <Route exact path="/my-bag" component={MyBag} />
                {/* Private Routes */}
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
            <Footer/>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
