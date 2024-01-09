import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import TypeWriter from '@/components/atoms/typeWriter';
import { useGetAllProducts } from '@/services/product/useGetAllProducts';
import ProductCard from '@/components/molecules/productCard';
import LoadingCard from '@/components/atoms/loadingCard';

const Home: React.FC = () => {
  const { data: products, refetch: refetchAllProducts, isLoading } = useGetAllProducts(10);

  useEffect(() => {
    if (!products) {
      refetchAllProducts();
    }
  }, [products, refetchAllProducts]);

  return (
    <div className="p-home">
      <div className="p-home__heading">
        <TypeWriter text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>
      <div className="p-home__products">
        {isLoading ? (
          <LoadingCard count={3} />
        ) : (
          <Row gutter={[20, 16]}>
            {products &&
              products.map((item: any, indx: number) => (
                <Col key={indx} xs={24} sm={12} md={8} lg={6}>
                  <ProductCard item={item} userRole="user" />
                </Col>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Home;
