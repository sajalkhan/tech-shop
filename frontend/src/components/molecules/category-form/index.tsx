import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { categoryRules } from '../../../constant/validationRules';

type TCategoryForm = {
  isLoading: boolean;
  placeholder: string;
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
  setIsLoading: (value: boolean) => void;
};

const CategoryForm = ({ onSubmit, isGetResponse, placeholder, setIsLoading, isLoading }: TCategoryForm) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isGetResponse && form.resetFields();
  }, [form, isGetResponse]);

  const onFinish = (value: any) => {
    onSubmit(value);
    setIsLoading(true);
  };

  return (
    <Form form={form} labelCol={{ span: 10 }} onFinish={onFinish} layout="vertical">
      <Form.Item label="Name" name="name" rules={categoryRules}>
        <Input placeholder={placeholder} />
      </Form.Item>

      <Button size="middle" type="primary" htmlType="submit" loading={isLoading}>
        Save
      </Button>
    </Form>
  );
};

export default CategoryForm;
