import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import { User } from '@/constant/types';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const resetPassword = async (userData: User, token: string | undefined) => {
  try {
    const response = await axios.post(`/reset-password/${token}`, userData);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useResetPassword = () => {
  return useMutation<User, string, { userData: User; token: string | undefined }>(({ userData, token }) =>
    resetPassword(userData, token)
  );
};
