import { useState } from 'react';
import toast from 'react-hot-toast';
import CreateProductForm from '@/components/molecules/createProduct-form';
import { useCreateProduct } from '@/services/product/useCreateProduct';

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const { mutate: createProduct } = useCreateProduct();

  const handleSubmit = async (data: string) => {
    setResponse(false);
    await createProduct(data, {
      onSuccess: () => {
        setResponse(true);
        setIsLoading(false);
        toast.success('Product Created Successfully!');
      },
      onError: (err: any) => {
        setIsLoading(false);
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="p-createProduct">
      <h2 className="p-createProduct__heading">Create Product</h2>
      <CreateProductForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        isGetResponse={response}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Product;
