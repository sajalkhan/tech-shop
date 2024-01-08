import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getAllProducts = async (items: number) => {
  try {
    const { data } = await axios.get(`/products/${items}`);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetAllProducts = (items: number) => {
  return useQuery(['products', items], () => getAllProducts(items));
};
