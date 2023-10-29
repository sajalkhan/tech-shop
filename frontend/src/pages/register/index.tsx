/* eslint-disable react-hooks/exhaustive-deps */
import { message } from 'antd';
import { useCallback } from 'react';
import { useRegisterUser } from '@root/services/useRegisterUser';
import RegistrationForm from 'components/molecules/registration-form';
import { User } from '@root/constants/types';

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
