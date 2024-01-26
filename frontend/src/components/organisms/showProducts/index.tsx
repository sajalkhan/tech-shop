import React from 'react';
import { Pagination } from 'antd';
import ProductCard from '@/components/molecules/productCard';
import LoadingCard from '@/components/atoms/loadingCard';

interface IShowProducts {
  isLoading: boolean;
  message: string;
  products: any;
  pageNumber?: number;
  productsCount?: number;
  handlePage?: (page: number) => void;
}

const ShowProducts: React.FC<IShowProducts> = ({
  message,
  isLoading,
  handlePage,
  pageNumber,
  products,
  productsCount,
}) => {
  return (
    <>
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

      <div className="showPagination">
        {productsCount && (
          <Pagination current={pageNumber} onChange={handlePage} total={Math.ceil(productsCount / 3) * 10} />
        )}
      </div>
    </>
  );
};

export default ShowProducts;
