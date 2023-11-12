import { useState } from 'react';
import toast from 'react-hot-toast';
import { User } from '@/constant/types';
import { ROUTES } from '@/routes/constant';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useLoginUser } from '@/services/useLoginUser';
import LoginForm from '@/components/molecules/login-form';

const Login = () => {
  const navigate = useNavigate();
  const { addUser } = useUserStore();
  const { mutate: loginUser } = useLoginUser();
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setValue] = useLocalStorage('techShopToken', 'set');

  const handleSubmit = (userData: User) => {
    setResponse(false);

    loginUser(userData, {
      onSuccess: (data: any) => {
        setResponse(true);
        setValue(data.token);
        addUser({ ...data.user, token: data.token });
        toast.success('User Login successfully!');
        setIsLoading(false);
        setTimeout(() => navigate(ROUTES.USER), 2500);
      },
      onError: (err: Error) => {
        toast.error(err.message);
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="p-login">
      <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} onSubmit={handleSubmit} isGetResponse={response} />
    </div>
  );
};

export default Login;
