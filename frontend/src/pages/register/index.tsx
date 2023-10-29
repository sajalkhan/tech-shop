import { message } from 'antd';
import { useState } from 'react';
import { User } from 'constants/types';
import { useRegisterUser } from 'services/useRegisterUser';
import RegistrationForm from 'components/molecules/registration-form';

message.config({
  top: 10,
  duration: 2,
});

const Register = () => {
  const { mutate } = useRegisterUser();
  const [response, setResponse] = useState(false);

  const handleSubmit = async (userData: User) => {
    setResponse(false);

    await mutate(userData, {
      onSuccess: () => {
        setResponse(true);
        message.success('User register successfully!');
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
