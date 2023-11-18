import { useEffect } from 'react';
import { Rule } from 'antd/es/form';
import { Form, Input, Button } from 'antd';
import { emailRules } from '../../../constant/validationRules';

type TForgotPassword = {
  isLoading: boolean;
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
  setIsLoading: (value: boolean) => void;
};

const ForgotPasswordForm = ({ onSubmit, isGetResponse, setIsLoading, isLoading }: TForgotPassword) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isGetResponse && form.resetFields();
  }, [form, isGetResponse]);

  const onFinish = (value: any) => {
    onSubmit(value);
    setIsLoading(true);
  };

  return (
    <div className="forgotPasswordForm-wrapper">
      <Form form={form} labelCol={{ span: 18 }} onFinish={onFinish} layout="vertical">
        <Form.Item label="Email" name="email" rules={emailRules as Rule[]}>
          <Input placeholder="Please Enter email" />
        </Form.Item>

        <div className="forgotPasswordBtn-wrapper">
          <Button
            size="middle"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="forgotPasswordBtn-wrapper__submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
