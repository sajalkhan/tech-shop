import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const deleteSubCategory = async (slug: string) => {
  try {
    const response = await axios.delete(`/subCategory/${slug}`);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useDeleteSubCategory = () => {
  return useMutation(deleteSubCategory);
};
