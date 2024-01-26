import { Flex, Spin } from 'antd';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import ShowProducts from '@/components/organisms/showProducts';
import { useAddRating } from '@/services/product/useAddRating';
import SingleProduct from '@/components/organisms/singleProduct';
import { useGetRelatedProduct } from '@/services/product/useGetRelatedProduct';
import { useGetProductDetails } from '@/services/product/useGetProductDetails';

const ViewProduct: React.FC = () => {
  const { id } = useParams();
  const { user } = useUserStore();
  const [rating, setRating] = useState(0);
  const { mutate: addRating } = useAddRating();
  const { data: productDetails, isLoading, refetch: refetchProductInfo } = useGetProductDetails(id as string);
  const { data: relatedProducts, isLoading: loadingRelatedProduct } = useGetRelatedProduct(id as string);

  useEffect(() => {
    refetchProductInfo();
  }, [id, refetchProductInfo]);

  const handleRating = (star: number) => {
    setRating(star);

    addRating(
      { productId: id, star },
      {
        onSuccess: () => {
          toast.success('Thanks for leave a rating!');
          refetchProductInfo();
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {isLoading ? (
        <Flex align="middle" justify="center" style={{ minHeight: '100vh' }}>
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          <SingleProduct user={user} product={productDetails} handleRating={handleRating} star={rating} />
          <ShowProducts message="Related Products" products={relatedProducts} isLoading={loadingRelatedProduct} />
        </>
      )}
    </div>
  );
};

export default ViewProduct;
