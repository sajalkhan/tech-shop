import React from 'react';
import { useParams } from 'react-router-dom';
import ShowProducts from '@/components/organisms/showProducts';
import { useGetAllProductsBySubCategory } from '@/services/subCategory/useGetAllProductsBySubCategory';

const SubCategoryHome: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetAllProductsBySubCategory(slug || '');

  return (
    <div className="subcategory-home">
      <ShowProducts
        message={`${data?.products?.length || 0} products in "${slug}" category`}
        products={data?.products || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SubCategoryHome;
