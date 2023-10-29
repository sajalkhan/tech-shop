import { useEffect } from 'react';
import { Rule } from 'antd/es/form';
import { Form, Input, Button } from 'antd';
import { emailRules, passwordRules } from 'constants/form-validation-rules';

type LoginForm = {
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
};

const LoginForm = ({ onSubmit, isGetResponse }: LoginForm) => {
  const [form] = Form.useForm();

  useEffect(() => {
    isGetResponse && form.resetFields();
  }, [form, isGetResponse]);

  const onFinish = (value: any) => {
    onSubmit(value);
  };

  return (
    <div className="loginForm-wrapper">
      <div className="login-text">
        <h2>SignIn</h2>
      </div>

      <Form form={form} onFinish={onFinish}>
        <Form.Item name="email" rules={emailRules as Rule[]}>
          <Input placeholder="Please Enter email" />
        </Form.Item>

        <Form.Item name="password" rules={passwordRules}>
          <Input.Password placeholder="Please enter password" />
        </Form.Item>

        <div className="loginBtn-wrapper">
          <Button type="primary" htmlType="submit" size="large" className="loginBtn-wrapper__submit">
            Submit
          </Button>
        </div>

        <Form.Item className="forgot-password">
          <a href="/forgot-password" className="forgot-password__text">
            Forgot Password?
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
