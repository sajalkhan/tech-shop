import { useMutation } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getProductsCount = async () => {
  try {
    const { data } = await axios.get('/product/total');
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetProductsCount = () => {
  return useMutation(getProductsCount);
};
