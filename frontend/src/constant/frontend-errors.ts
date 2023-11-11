const errors = {
  '99995': 'Not available at this time. This is a feature that will be released soon.',
  '99996': 'Your sign-in has expired. Please sign in again.',
  '99997':
    'An unexpected error has occurred. Please wait for a while and try again. If the problem persists, please contact the help desk.',
  '99998':
    'A timeout error has occurred. Please wait for a while and try again. If the problem persists, please contact the help desk.',
  '99999':
    'An unexpected error has occurred. Please wait for a while and try again. If the problem persists, please contact the help desk.',
} as const;

export type errorCode = keyof typeof errors;

export const getErrorObjFromErrorCode = (code: errorCode) => {
  return {
    Message: errors[code],
    Code: code,
    TranToken: '',
  };
};

export const getErrorResFromErrorCode = (code: errorCode) => {
  return {
    response: {
      data: {
        DestSystem: {
          Result: getErrorObjFromErrorCode(code),
        },
      },
    },
  };
};
