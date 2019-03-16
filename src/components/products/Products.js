import React from 'react';
import ProductItem from './ProductItem';


const Products = ({products, addToChart}) => {
  const content = products.map(product => (
    <ProductItem 
    key={product.product_id}
    product={product}
    addToChart={addToChart}
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
