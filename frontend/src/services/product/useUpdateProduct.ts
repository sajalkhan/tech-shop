import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const updateProduct = async (title: string, data: any) => {
  try {
    const response = await axios.put(`/product/${title}`, data);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useUpdateProduct = () => {
  return useMutation<string, string, { title: string; data: any }>(({ title, data }) => updateProduct(title, data));
};
