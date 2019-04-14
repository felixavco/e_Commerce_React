import React, { Component } from 'react'
import {stripe_public_token} from '../../../config/config';
import { StripeProvider, Elements } from 'react-stripe-elements';
import StripeForm from './StripeForm';



class Stripe extends Component {


  render() {
    return (
      <>
        <StripeProvider apiKey={stripe_public_token} >
          <Elements>
            <StripeForm shipping_id={this.props.shipId} showModal={this.props.showModal} toggleModal={this.props.toggleModal}/>
          </Elements>
        </StripeProvider>
      </>
    )
  }
}

export default Stripe;
