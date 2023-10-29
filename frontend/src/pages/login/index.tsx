/* eslint-disable react-hooks/exhaustive-deps */
import { message } from 'antd';
import { useCallback } from 'react';
import { User } from 'constants/types';
import { useLoginUser } from 'services/useLoginUser';
import LoginForm from 'components/molecules/login-form';

message.config({
  top: 10,
  duration: 2,
});

const Login = () => {
  const { mutate } = useLoginUser();

  const handleSubmit = useCallback(async (userData: User) => {
    await mutate(userData, {
      onSuccess: () => {
        message.success('User Login successfully!');
      },
      onError: (err: any) => {
        message.error(err.message);
      },
    });
  }, []);

  return (
    <div className="p-login">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
