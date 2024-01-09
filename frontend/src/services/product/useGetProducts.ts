import { useMutation } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getProducts = async (query: any) => {
  try {
    const { data } = await axios.post('/products', query);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetProducts = () => {
  return useMutation(getProducts);
};
