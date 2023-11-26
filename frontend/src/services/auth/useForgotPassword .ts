import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import { User } from '@/constant/types';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const forgotPassword = async (userData: User) => {
  try {
    const response = await axios.post('/forgot-password', userData);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useForgotPassword = () => {
  return useMutation(forgotPassword);
};
