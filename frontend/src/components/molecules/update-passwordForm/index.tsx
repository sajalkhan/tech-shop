import { useEffect } from 'react';
import { Rule } from 'antd/es/form';
import { Form, Input, Button } from 'antd';
import { emailRules, passwordRules } from '../../../constant/validationRules';

type TUpdatePasswordForm = {
  isLoading: boolean;
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
  setIsLoading: (value: boolean) => void;
};

const UpdatePasswordForm = ({ onSubmit, isGetResponse, setIsLoading, isLoading }: TUpdatePasswordForm) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isGetResponse && form.resetFields();
  }, [form, isGetResponse]);

  const onFinish = (value: any) => {
    onSubmit(value);
    setIsLoading(true);
  };

  return (
    <div className="updatePasswordForm-wrapper">
      <Form form={form} labelCol={{ span: 18 }} onFinish={onFinish} layout="vertical">
        <Form.Item label="Email" name="email" rules={emailRules as Rule[]}>
          <Input placeholder="Please Enter email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={passwordRules}>
          <Input.Password placeholder="Current password" />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirmPassword" rules={passwordRules}>
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <div className="updatePasswordBtn-wrapper">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="updatePasswordBtn-wrapper__submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePasswordForm;
