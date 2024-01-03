import { useEffect } from 'react';
import { useGetAllProducts } from '@/services/product/useGetAllProducts';

const Products = () => {
  const { data: products, refetch: refetchAllProducts } = useGetAllProducts(10);

  useEffect(() => {
    !products && refetchAllProducts();
  }, [products, refetchAllProducts]);

  return (
    <div>
      <h2>Products</h2>
      {products &&
        products.map((item: any, indx: number) => (
          <div key={indx}>
            <img src={item.images[0]} alt={item.title} style={{ maxWidth: '200px' }} />
            <p>{item.title}</p>
          </div>
        ))}
    </div>
  );
};

export default Products;
