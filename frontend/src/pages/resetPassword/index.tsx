import { useState } from 'react';
import toast from 'react-hot-toast';
import { User } from '@/constant/types';
import { ROUTES } from '@/routes/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from '@/services/useResetPassword';
import ResetPasswordForm from '@/components/molecules/reset-passwordForm';

const ResetPassword = () => {
  const { mutate: resetPassword } = useResetPassword();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (userData: User) => {
    setResponse(false);
    resetPassword(
      { userData, token },
      {
        onSuccess: () => {
          setResponse(true);
          setIsLoading(false);
          toast.success('Password successfully Updated!');

          setTimeout(() => {
            navigate(ROUTES.LOGIN);
          }, 2500);
        },
        onError: (err: any) => {
          toast.error(err.message);
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="p-forgotPassword">
      <ResetPasswordForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        isGetResponse={response}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default ResetPassword;
