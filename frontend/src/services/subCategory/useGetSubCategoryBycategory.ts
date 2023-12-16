import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getSubCategoryById = async (data: any) => {
  try {
    const response = await axios.post('/subCategoriesById', data);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetSubCategoryByCategoryId = () => {
  return useMutation(getSubCategoryById);
};
