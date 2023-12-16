import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const deleteCategory = async (slug: string) => {
  try {
    const response = await axios.delete(`/category/${slug}`);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useDeleteCategory = () => {
  return useMutation(deleteCategory);
};
