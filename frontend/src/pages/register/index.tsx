/* eslint-disable react-hooks/exhaustive-deps */
import { message } from 'antd';
import { useCallback } from 'react';
import { User } from 'constants/types';
import { useRegisterUser } from 'services/useRegisterUser';
import RegistrationForm from 'components/molecules/registration-form';

message.config({
  top: 10,
  duration: 2,
  rtl: true,
});

const Users = () => {
  const { mutate } = useRegisterUser();

  const handleSubmit = useCallback(async (userData: User) => {
    await mutate(userData, {
      onSuccess: () => {
        message.success('User register successfully!');
      },
      onError: (err: any) => {
        message.error(err.message);
      },
    });
  }, []);

  return (
    <div className="p-register">
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Users;
