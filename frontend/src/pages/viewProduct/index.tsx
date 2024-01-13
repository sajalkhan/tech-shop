import React from 'react';
import { Flex, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import SingleProduct from '@/components/organisms/singleProduct';
import { useGetProductDetails } from '@/services/product/useGetProductDetails';

const ViewProduct: React.FC = () => {
  const { id } = useParams();
  const { data: productDetails, isLoading } = useGetProductDetails(id as string);

  return (
    <div style={{ marginTop: '20px' }}>
      {isLoading ? (
        <Flex align="middle" justify="center" style={{ minHeight: '100vh' }}>
          <Spin size="large" />
        </Flex>
      ) : (
        <SingleProduct product={productDetails} />
      )}
    </div>
  );
};

export default ViewProduct;
