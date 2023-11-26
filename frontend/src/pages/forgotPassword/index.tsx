import { useState } from 'react';
import toast from 'react-hot-toast';
import { User } from '@/constant/types';
import { useForgotPassword } from '@/services/auth/useForgotPassword ';
import ForgotPasswordForm from '@/components/molecules/forgot-passwordForm';

const ForgotPassword = () => {
  const { mutate: forgotPassword } = useForgotPassword();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSubmit = async (email: User) => {
    setResponse(false);
    await forgotPassword(email, {
      onSuccess: () => {
        setResponse(true);
        setIsLoading(false);
        toast.success('Password reset mail send successfully!');
      },
      onError: (err: any) => {
        toast.error(err.message);
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="p-forgotPassword">
      <ForgotPasswordForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        isGetResponse={response}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default ForgotPassword;
