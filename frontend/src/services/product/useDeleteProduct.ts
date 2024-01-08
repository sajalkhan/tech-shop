import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`/product/${id}`);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useDeleteProduct = () => {
  return useMutation(deleteProduct);
};
