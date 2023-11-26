import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import { SignInUser } from '@/constant/types';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const loginUser = async (userInfo: SignInUser) => {
  try {
    const { data } = await axios.post('/signin', userInfo);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useLoginUser = () => {
  return useMutation(async (userInfo: SignInUser) => await loginUser(userInfo), {
    onSuccess: async data => {
      // localStorage.setItem('token', data.token);
      return data;
    },
    onError: async (err: Error) => {
      return err;
    },
  });
};
