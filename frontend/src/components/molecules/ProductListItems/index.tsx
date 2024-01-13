import React from 'react';
import { Link } from 'react-router-dom';

interface ProductListItemsProps {
  product: any;
}

const ProductListItems: React.FC<ProductListItemsProps> = ({ product }) => {
  const { price, category, subCategory, shipping, color, brand, quantity, sold } = product;

  return (
    <ul className="m-productList">
      <li className="m-productList__price">
        <span>Price</span> <span>$ {price}</span>
      </li>

      {category && (
        <li className="m-productList__category">
          Category
          <Link to={`/category/${category.slug}`} className="m-productList__category--item">
            {category.name}
          </Link>
        </li>
      )}

      {subCategory && (
        <li className="m-productList__subCategory">
          Sub Categories
          {subCategory.map((s: any) => (
            <Link key={s._id} to={`/subCategory/${s.slug}`} className="m-productList__subCategory--item">
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="m-productList__shipping">
        <span>Shipping</span>
        <span>{shipping}</span>
      </li>

      <li className="m-productList__color">
        <span>Color</span>
        <span>{color}</span>
      </li>

      <li className="m-productList__brand">
        <span>Brand</span>
        <span>{brand}</span>
      </li>

      <li className="m-productList__quantity">
        <span>Available</span>
        <span>{quantity}</span>
      </li>

      <li className="m-productList__sold">
        <span>Sold</span>
        <span>{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
