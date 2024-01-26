import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getRelatedProduct = async (id: string) => {
  try {
    const { data } = await axios.get(`/product/related/${id}`);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetRelatedProduct = (id: string) => {
  return useQuery(['relatedProduct', id], () => getRelatedProduct(id));
};
