import { useState } from 'react';
import toast from 'react-hot-toast';
import { User } from '@/constant/types';
import { ROUTES } from '@/routes/constant';
import { useNavigate } from 'react-router-dom';
import { useRegisterUser } from '@/services/auth/useRegisterUser';
import RegistrationForm from '@/components/molecules/registration-form';

const Register = () => {
  const navigate = useNavigate();
  const { mutate } = useRegisterUser();
  const [response, setResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (userData: User) => {
    setResponse(false);

    await mutate(userData, {
      onSuccess: () => {
        setResponse(true);
        toast.success('User register successfully!');

        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 2500);
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="p-register">
      <RegistrationForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onSubmit={handleSubmit}
        isGetResponse={response}
      />
    </div>
  );
};

export default Register;
