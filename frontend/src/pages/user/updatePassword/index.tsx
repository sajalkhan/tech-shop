import { useState } from 'react';
import { User } from '@/constant/types';
import toast from 'react-hot-toast';
import { useUpdatePassword } from '@/services/auth/useUpdatePassword';
import UpdatePasswordForm from '@/components/molecules/update-passwordForm';

const UserPassword = () => {
  const { mutate: updatePassword } = useUpdatePassword();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSubmit = async (userData: User) => {
    setResponse(false);
    await updatePassword(userData, {
      onSuccess: () => {
        setResponse(true);
        setIsLoading(false);
        toast.success('Password Update successfully!');
      },
      onError: (err: any) => {
        toast.error(err.message);
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="p-updatePassword">
      <UpdatePasswordForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        isGetResponse={response}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default UserPassword;
