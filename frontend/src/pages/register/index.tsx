import { message } from 'antd';
import { useState } from 'react';
import { User } from '@/constant/types';
import { ROUTES } from '@/routes/constant';
import { useNavigate } from 'react-router-dom';
import { useRegisterUser } from '@/services/useRegisterUser';
import RegistrationForm from '@/components/molecules/registration-form';

message.config({
  top: 10,
  duration: 2,
});

const Register = () => {
  const navigate = useNavigate();
  const { mutate } = useRegisterUser();
  const [response, setResponse] = useState(false);

  const handleSubmit = async (userData: User) => {
    setResponse(false);

    await mutate(userData, {
      onSuccess: () => {
        setResponse(true);
        message.success('User register successfully!');

        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 2500);
      },
      onError: (err: any) => {
        message.error(err.message);
      },
    });
  };

  return (
    <div className="p-register">
      <RegistrationForm onSubmit={handleSubmit} isGetResponse={response} />
    </div>
  );
};

export default Register;
