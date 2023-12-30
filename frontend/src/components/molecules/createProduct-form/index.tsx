import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Form, Input, Button, Select } from 'antd';
import { createProductRules } from '../../../constant/validationRules';
import { useGetAllCategories } from '@/services/category/useGetAllCategories';
import { useGetSubCategoryByCategoryId } from '@/services/subCategory/useGetSubCategoryBycategory';

type TCreateProductForm = {
  isLoading: boolean;
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
  setIsLoading: (value: boolean) => void;
};

const productData = {
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  shipping: [
    { label: 'No', value: 'No' },
    { label: 'Yes', value: 'Yes' },
  ],
};

const CreateProductForm = ({ onSubmit, isGetResponse, setIsLoading, isLoading }: TCreateProductForm) => {
  const [form] = Form.useForm();
  const [subCategory, setSubCategory] = useState([]);
  const { mutate: getSubCategoryById } = useGetSubCategoryByCategoryId();
  const { data: categories, refetch: refetchAllCategories } = useGetAllCategories();

  useEffect(() => {
    isGetResponse && form.resetFields();
  }, [form, isGetResponse]);

  useEffect(() => {
    !categories && refetchAllCategories();
  }, [categories, refetchAllCategories]);

  const categoryOptions = categories ? [...categories.map((item: any) => ({ value: item._id, label: item.name }))] : [];

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

  const onFinish = (value: any) => {
    onSubmit(value);
    setIsLoading(true);
  };

  return (
    <Form form={form} labelCol={{ span: 10 }} onFinish={onFinish} layout="vertical">
      <Form.Item label="Title" name="title" rules={createProductRules.title}>
        <Input type="text" placeholder="Please Enter Title" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input type="text" placeholder="Please Enter Description" />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={createProductRules.price}>
        <Input type="number" placeholder="Please Enter Price" />
      </Form.Item>

      <Form.Item label="Shipping" name="shipping" rules={createProductRules.shipping}>
        <Select placeholder="Select shipping" options={productData.shipping} />
      </Form.Item>

      <Form.Item label="Quantity" name="quantity" rules={createProductRules.quantity}>
        <Input type="number" placeholder="Please Enter Quantity" />
      </Form.Item>

      <Form.Item label="Color" name="color" rules={createProductRules.color}>
        <Select placeholder="Select colors" options={productData.colors.map(c => ({ label: c, value: c }))} />
      </Form.Item>

      <Form.Item label="Brand" name="brand" rules={createProductRules.brand}>
        <Select placeholder="Select brand" options={productData.brands.map(b => ({ label: b, value: b }))} />
      </Form.Item>

      <Form.Item label="Category" name="category">
        <Select placeholder="Select category" onChange={handleChange} options={categoryOptions} />
      </Form.Item>

      <Form.Item label="Sub Category" name="subCategory">
        <Select mode="multiple" placeholder="Select subCategory" options={subCategory} />
      </Form.Item>

      <Button size="middle" type="primary" htmlType="submit" loading={isLoading}>
        Save
      </Button>
    </Form>
  );
};

export default CreateProductForm;
