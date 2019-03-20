import React from 'react';
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

export default Products;
