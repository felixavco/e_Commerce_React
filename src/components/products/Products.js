import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';
import SingleProduct from './singleProduct/SingleProduct';


const Products = ({products}) => {
  const content = products.map(product => (
    <ProductItem 
    key={product.product_id}
    product={product}
    />
  ))
  return (
    <div className="products">
      <SingleProduct />
      <div className="cont">
        { content }
      </div>
    </div>
  )
}

Products.propTypes = {
  products: PropTypes.array.isRequired
}

export default Products;
