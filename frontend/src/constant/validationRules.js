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

export const createProductRules = {
  image: [
    {
      required: true,
      message: 'Please upload images!',
    },
  ],
  title: [
    {
      required: true,
      message: 'Please enter product title!',
    },
  ],
  price: [
    {
      required: true,
      message: 'Please enter product price!',
    },
  ],
  shipping: [
    {
      required: true,
      message: 'Please select shipping option!',
    },
  ],
  quantity: [
    {
      required: true,
      message: 'Please select quantity!',
    },
  ],
  color: [
    {
      required: true,
      message: 'Please select color!',
    },
  ],
  brand: [
    {
      required: true,
      message: 'Please select brand!',
    },
  ],
};

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
