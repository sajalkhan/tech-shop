// Validation rules for the form fields
export const nameRules = [
  {
    required: true,
    message: 'Please enter your name!',
  },
];

export const categoryRules = [
  {
    required: true,
    message: 'Please enter category name!',
  },
];

export const emailRules = [
  {
    type: 'email',
    message: 'Invalid email address',
  },
  {
    required: true,
    message: 'Please enter your email!',
  },
];

export const passwordRules = [
  {
    required: true,
    message: 'Please enter your password!',
  },
];

export const confirmRules = [
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords do not match!');
    },
  }),
];
