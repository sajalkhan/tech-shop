import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import { User } from '@/constant/types';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const updatePassword = async (userData: User) => {
  try {
    const response = await axios.post('/update-password', userData);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useUpdatePassword = () => {
  return useMutation(updatePassword);
};
