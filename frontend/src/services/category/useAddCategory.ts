import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const addCategory = async (name: string) => {
  try {
    const response = await axios.post('/category', name);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useAddCategory = () => {
  return useMutation(addCategory);
};
