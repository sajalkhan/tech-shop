import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { passwordRules } from '../../../constant/validationRules';

type TResetPasswordForm = {
  isLoading: boolean;
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
  setIsLoading: (value: boolean) => void;
};

const ResetPasswordForm = ({ onSubmit, isGetResponse, setIsLoading, isLoading }: TResetPasswordForm) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isGetResponse && form.resetFields();
  }, [form, isGetResponse]);

  const onFinish = (value: any) => {
    onSubmit(value);
    setIsLoading(true);
  };

  return (
    <div className="resetPasswordForm-wrapper">
      <Form form={form} labelCol={{ span: 18 }} onFinish={onFinish} layout="vertical">
        <Form.Item label="Password" name="password" rules={passwordRules}>
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirmPassword" rules={passwordRules}>
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <div className="resetPasswordBtn-wrapper">
          <Button
            size="middle"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="resetPasswordBtn-wrapper__submit"
          >
            Reset Password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
