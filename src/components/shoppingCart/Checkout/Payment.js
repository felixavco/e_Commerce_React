import React from 'react'
import { connect } from 'react-redux'
import { stripeCharge } from '../../../redux/actions/shoppingCartActions';


const Payment = (props) => {

  const makePayment = () =>  {
    const data = {
      order_id: this.props.placed_order, 
      description: "this is a test", 
      amount: this.props.totalToPay * 100
    }

    props.stripeCharge(data, cb)
  }

  function cb() {
    console.log("Payment Successfuly");
  }

  return (
    <div>
      <h1>PAYMENT</h1>
      <button onClick={makePayment}>PAY NOW</button>
    </div>
  )
}

const mapStateToProps = state => ({
  totalToPay: state.shoppingCart.totalToPay,
  placed_order:  state.shoppingCart.placed_order.orderId
})

export default connect(mapStateToProps, { stripeCharge })(Payment)
