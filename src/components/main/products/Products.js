import React from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';


const Products = ({products}) => {
  const content = products.map(product => (
    <ProductItem 
    key={product.product_id}
    product={product}
    />
  ))
  return (
    <div className="products">
      <div className="cont">
        { content }
      </div>
    </div>
  )
}

export default Products;
