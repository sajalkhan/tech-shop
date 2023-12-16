import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const addSubCategory = async (info: any) => {
  try {
    const response = await axios.post('/subCategory', info);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useAddSubCategory = () => {
  return useMutation(addSubCategory);
};
