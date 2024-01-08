import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateProduct } from '@/services/product/useCreateProduct';
import CreateProductForm from '@/components/molecules/createProduct-form';
import { useGetAllCategories } from '@/services/category/useGetAllCategories';
import { useGetSubCategoryByCategoryId } from '@/services/subCategory/useGetSubCategoryById';

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [subCategory, setSubCategory] = useState<[{ value: string; label: string }] | []>([]);

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: getSubCategoryById } = useGetSubCategoryByCategoryId();
  const { data: categories, refetch: refetchAllCategories } = useGetAllCategories();

  useEffect(() => {
    !categories && refetchAllCategories();
  }, [categories, refetchAllCategories]);

  const categoryOptions: any = categories
    ? [...categories.map((item: any) => ({ value: item._id, label: item.name }))]
    : [];

  const handleChange = async (value: string) => {
    getSubCategoryById(
      { parent: value },
      {
        onSuccess: (data: any) => {
          setSubCategory(data.map((item: any) => ({ value: item._id, label: item.name })));
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

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
        handleChange={handleChange}
        categoryOptions={categoryOptions}
        subCategoryOptions={subCategory}
      />
    </div>
  );
};

export default Product;
