import React, { useEffect } from 'react';
import TypeWriter from '@/components/atoms/typeWriter';
import ShowProducts from '@/components/organisms/showProducts';
import { useGetProducts } from '@/services/product/useGetProducts';

const Home: React.FC = () => {
  const { mutate: getNewArrival, data: newProducts, isLoading: isLoadingNewProduct } = useGetProducts();
  const { mutate: getBestSellProduct, data: bestSellProducts, isLoading: isLoadingSellProduct } = useGetProducts();

  useEffect(() => {
    getNewArrival({ sort: 'createdAt', order: 'desc', limit: 3 });
    getBestSellProduct({ sort: 'sold', order: 'desc', limit: 3 });
  }, [getNewArrival, getBestSellProduct]);

  return (
    <div className="p-home">
      <div className="p-home__heading">
        <TypeWriter text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>
      <div className="p-home__products">
        <ShowProducts isLoading={isLoadingNewProduct} products={newProducts} message="New Arrivals" />
        <ShowProducts isLoading={isLoadingSellProduct} products={bestSellProducts} message="Best Sellers" />
      </div>
    </div>
  );
};

export default Home;
