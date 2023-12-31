import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, Upload, UploadFile, message } from 'antd';
import { createProductRules } from '../../../constant/validationRules';

type TCreateProductForm = {
  isLoading: boolean;
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
  setIsLoading: (value: boolean) => void;
  handleChange: (value: string) => void;
  subCategoryOptions: { value: string; label: string }[] | [];
  categoryOptions: { value: string; label: string }[] | [];
};

const productData = {
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  shipping: [
    { label: 'No', value: 'No' },
    { label: 'Yes', value: 'Yes' },
  ],
};

const CreateProductForm = ({
  onSubmit,
  isGetResponse,
  setIsLoading,
  isLoading,
  handleChange,
  categoryOptions,
  subCategoryOptions,
}: TCreateProductForm) => {
  let errorShown = false;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!isLoading) setFileList([]);
  }, [isLoading]);

  useEffect(() => {
    isGetResponse && form.resetFields();
  }, [form, isGetResponse]);

  const handleImageChange = ({ fileList }: { fileList: UploadFile[] }) => {
    // Filter files that are less than or equal to 400KB
    const filteredFileList = fileList.filter(f => f.size && f.size <= 400 * 1024);

    if (filteredFileList.length < fileList.length) {
      if (!errorShown) {
        message.error('Some files exceed the size limit 400kb and will not be added.');
        errorShown = true; // Set the flag to true after showing the error
      }
    } else {
      // Reset the errorShown flag when all files are within the size limit
      errorShown = false;
    }

    setFileList(filteredFileList);
  };

  const onFinish = (value: any) => {
    const images = fileList.map(item => item.thumbUrl);
    onSubmit({ images, ...value });
    setIsLoading(true);
  };

  return (
    <Form form={form} labelCol={{ span: 10 }} onFinish={onFinish} layout="vertical">
      <Form.Item label="Product Image" rules={createProductRules.image}>
        <Upload.Dragger
          listType="picture-circle"
          multiple={true}
          accept=".png,.jpeg,.jpg"
          iconRender={() => <UploadOutlined style={{ fontSize: 50 }} rev={undefined} />}
          progress={{
            size: 3,
            strokeColor: {
              '0%': '#f0f',
              '100%': '#ff0',
            },
            style: { top: 12 },
          }}
          beforeUpload={() => false}
          onChange={handleImageChange}
          fileList={fileList}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined rev={undefined} style={{ fontSize: 30 }} />
          </p>
          <p className="ant-upload-text" style={{ fontSize: 14 }}>
            Click or drag file here to upload product image
          </p>
          <p className="ant-upload-hint" style={{ fontSize: 12 }}>
            Support for PNG, JPEG, and JPG files
          </p>
        </Upload.Dragger>
      </Form.Item>

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
        <Select mode="multiple" placeholder="Select subCategory" options={subCategoryOptions} />
      </Form.Item>

      <Button size="middle" type="primary" htmlType="submit" loading={isLoading}>
        Save
      </Button>
    </Form>
  );
};

export default CreateProductForm;
