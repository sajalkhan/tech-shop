import React from 'react';
import { useParams } from 'react-router-dom';
import ShowProducts from '@/components/organisms/showProducts';
import { useGetAllProductsByCategory } from '@/services/category/useGetAllProductsByCategory';

const CategoryHome: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetAllProductsByCategory(slug || '');

  return (
    <div className="category-home">
      <ShowProducts
        message={`${data?.products?.length || 0} products in "${slug}" category`}
        products={data?.products || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CategoryHome;
