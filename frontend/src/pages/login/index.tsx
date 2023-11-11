import { message } from 'antd';
import { useState } from 'react';
import { User } from '@/constant/types';
import { ROUTES } from '@/routes/constant';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useLoginUser } from '@/services/useLoginUser';
import LoginForm from '@/components/molecules/login-form';

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
        setResponse(true);
        setValue(data.token);
        addUser({ ...data.user, token: data.token });
        message.success('User Login successfully!');
        setTimeout(() => navigate(ROUTES.USER), 2500);
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
