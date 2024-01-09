import React from 'react';
import ProductCard from '@/components/molecules/productCard';
import LoadingCard from '@/components/atoms/loadingCard';

interface IShowProducts {
  isLoading: boolean;
  message: string;
  products: any;
}

const ShowProducts: React.FC<IShowProducts> = ({ message, isLoading, products }) => {
  return (
    <div className="showProducts">
      <h4 className="showProducts__heading">{message}</h4>
      {isLoading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="showProducts__items">
          {products?.map((item: any, indx: number) => (
            <ProductCard key={indx} item={item} userRole="user" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
