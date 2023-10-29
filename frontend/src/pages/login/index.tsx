import { message } from 'antd';
import { useState } from 'react';
import { User } from 'constants/types';
import { ROUTES } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from 'services/useLoginUser';
import LoginForm from 'components/molecules/login-form';

message.config({
  top: 50,
  duration: 2,
});

const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useLoginUser();
  const [response, setResponse] = useState(false);

  const handleSubmit = async (userData: User) => {
    setResponse(false);

    await mutate(userData, {
      onSuccess: () => {
        setResponse(true);
        message.success('User Login successfully!');

        setTimeout(() => {
          navigate(ROUTES.HOME);
        }, 2500);
      },
      onError: (err: any) => {
        message.error(err.message);
      },
    });
  };

  return (
    <div className="p-login">
      <LoginForm onSubmit={handleSubmit} isGetResponse={response} />
    </div>
  );
};

export default Login;
