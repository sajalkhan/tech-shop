import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const createProduct = async (data: any) => {
  try {
    const response = await axios.post('/createProduct', data);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useCreateProduct = () => {
  return useMutation(createProduct);
};
