import React, { useEffect, useState } from 'react';
import TypeWriter from '@/components/atoms/typeWriter';
import CategoryList from '@/components/molecules/categoryList';
import ShowProducts from '@/components/organisms/showProducts';
import { useGetProducts } from '@/services/product/useGetProducts';
import { useGetProductsCount } from '@/services/product/useGetProductsCount';
import { useGetAllCategories } from '@/services/category/useGetAllCategories';
import { useGetAllSubCategories } from '@/services/subCategory/useGetAllSubCategories';

const Home: React.FC = () => {
  const [newArrivalPage, setNewArrivalPage] = useState(1);
  const [bestSellPage, setBestSellPage] = useState(1);

  const { mutate: getTotalProductLength, data: productsCount } = useGetProductsCount();
  const { mutate: getNewArrival, data: newProducts, isLoading: isLoadingNewProduct } = useGetProducts();
  const { data: categories, refetch: refetchAllCategories, isLoading: isLoadingCategory } = useGetAllCategories();
  const { mutate: getBestSellProduct, data: bestSellProducts, isLoading: isLoadingSellProduct } = useGetProducts();
  const {
    data: subCategories,
    refetch: refetchAllSubCategories,
    isLoading: isLoadingSubCategory,
  } = useGetAllSubCategories();

  useEffect(() => {
    getTotalProductLength();
  }, [getTotalProductLength]);

  useEffect(() => {
    getNewArrival({ sort: 'createdAt', order: 'desc', pageNumber: newArrivalPage });
  }, [getNewArrival, newArrivalPage]);

  useEffect(() => {
    getBestSellProduct({ sort: 'sold', order: 'desc', pageNumber: bestSellPage });
  }, [getBestSellProduct, bestSellPage]);

  useEffect(() => {
    !categories && refetchAllCategories();
    !subCategories && refetchAllSubCategories();
  }, [categories, subCategories, refetchAllCategories, refetchAllSubCategories]);

  const handleNewArrivalPageChange = (value: number) => {
    setNewArrivalPage(value);
  };

  const handleBestSellPageChange = (value: number) => {
    setBestSellPage(value);
  };

  return (
    <div className="p-home">
      <div className="p-home__heading">
        <TypeWriter text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>
      <div className="p-home__products">
        <ShowProducts
          pageNumber={newArrivalPage}
          message="New Arrivals"
          products={newProducts}
          productsCount={productsCount}
          isLoading={isLoadingNewProduct}
          handlePage={handleNewArrivalPageChange}
        />

        <ShowProducts
          pageNumber={bestSellPage}
          message="Best Sellers"
          products={bestSellProducts}
          productsCount={productsCount}
          isLoading={isLoadingSellProduct}
          handlePage={handleBestSellPageChange}
        />

        <CategoryList path="category" isLoading={isLoadingCategory} message="Categories" categories={categories} />
        <CategoryList
          path="subcategory"
          message="Sub Categories"
          categories={subCategories}
          isLoading={isLoadingSubCategory}
        />
      </div>
    </div>
  );
};

export default Home;
