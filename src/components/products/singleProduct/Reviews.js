import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'


const Reviews = ({ productReviews }) => {

  const reviews = productReviews.map(review => (
    <span>
      <strong>{review.name}</strong>
      <p>{review.review}</p>
      <p>{review.rating}</p>
      <p>{moment(review.created_on).format('MMM Do YYYY')}</p>
    </span>
  ))

  return (
    <div>
      { reviews }
    </div>
  )
}

const mapStateToProps = state => ({
  productReviews: state.products.productReviews
})

export default connect(mapStateToProps, null)(Reviews);
