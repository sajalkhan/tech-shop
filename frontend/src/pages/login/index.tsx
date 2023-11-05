import { message } from 'antd';
import { useState } from 'react';
import { User } from 'constants/types';
import { ROUTES } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import { useLoginUser } from 'services/useLoginUser';
import useLocalStorage from 'hooks/useLocalStorage';
import LoginForm from 'components/molecules/login-form';

message.config({
  top: 50,
  duration: 2,
});

const Login = () => {
  const navigate = useNavigate();
  const { addUser } = useUserStore();
  const { mutate: loginUser } = useLoginUser();
  const [response, setResponse] = useState(false);
  const [setValue] = useLocalStorage('techShopToken', 'set');

  const handleSubmit = (userData: User) => {
    setResponse(false);

    loginUser(userData, {
      onSuccess: (data: any) => {
        addUser(data.user);
        setResponse(true);
        setValue(data.token);
        message.success('User Login successfully!');
        setTimeout(() => navigate(ROUTES.HOME), 2500);
      },
      onError: (err: Error) => {
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
