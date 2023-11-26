import Navigation from '@/components/atoms/navigation';
import CategoryForm from '@/components/molecules/category-form';
import ForgotPasswordForm from '@/components/molecules/forgot-passwordForm';
import LoginForm from '@/components/molecules/login-form';
import RegistrationForm from '@/components/molecules/registration-form';
import ResetPasswordForm from '@/components/molecules/reset-passwordForm';

const Demo = () => {
  return (
    <div className="demo">
      <hr />
      <Navigation />
      <hr />
      <LoginForm isLoading={false} isGetResponse={false} onSubmit={() => false} setIsLoading={() => false} />
      <hr />
      <RegistrationForm
        isLoading={false}
        isGetResponse={false}
        onSubmit={() => {
          console.log('call');
        }}
        setIsLoading={() => false}
      />
      <hr />

      <ForgotPasswordForm
        isLoading={false}
        isGetResponse={false}
        onSubmit={() => {
          console.log('call');
        }}
        setIsLoading={() => false}
      />

      <hr />
      <ResetPasswordForm
        isLoading={false}
        isGetResponse={false}
        onSubmit={() => {
          console.log('call');
        }}
        setIsLoading={() => false}
      />

      <hr />
      <CategoryForm
        isLoading={false}
        isGetResponse={false}
        onSubmit={() => {
          console.log('call');
        }}
        setIsLoading={() => false}
      />
    </div>
  );
};

export default Demo;
