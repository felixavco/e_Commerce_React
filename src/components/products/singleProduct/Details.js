import React from 'react';
import PropTypes from 'prop-types';
import AddToCart from './AddToCart';

const Details = ({product}) => {
  const { product_id, description, price, discounted_price } = product;
  
  return (
    <div className="details">
      <div className="price-cont">
        <span className={discounted_price !== "0.00" ? "x-price" : ""}>${price}</span>
        <span className={discounted_price !== "0.00" ? "disc-price" : "price-hide"}>${discounted_price}</span>
      </div>
      <div className="description">
        <p>
          {description}
        </p>
      </div>
      <AddToCart product_id={product_id}/>
    </div>
  )
}

Details.propTypes = {
  product: PropTypes.object.isRequired
}

export default Details
