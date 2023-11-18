import { Rule } from 'antd/es/form';
import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { emailRules, passwordRules } from '../../../constant/validationRules';

type LoginForm = {
  isLoading: boolean;
  isGetResponse: boolean;
  onSubmit: (value: any) => void;
  setIsLoading: (value: boolean) => void;
};

const LoginForm = ({ onSubmit, isGetResponse, isLoading, setIsLoading }: LoginForm) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isGetResponse) {
      form.resetFields();
    }
  }, [form, isGetResponse]);

  const onFinish = (value: any) => {
    onSubmit(value);
    setIsLoading(true);
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgotPassword');
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
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="loginBtn-wrapper__submit"
          >
            Submit
          </Button>
        </div>

        <Form.Item className="forgot-password">
          <a onClick={handleForgotPasswordClick} className="forgot-password__text">
            Forgot Password?
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
