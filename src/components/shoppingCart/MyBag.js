import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCartId } from '../../redux/actions/shoppingCartActions';

class MyBag extends Component {
  state = {
    cartId: localStorage.turingShoppingCart
  }

  componentDidMount(){
    if(!this.state.cartId) {
      this.props.getCartId();
    }
  }

  render() {

    return (
      <div>
        <h2>HOLA</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { getCartId })(MyBag);

