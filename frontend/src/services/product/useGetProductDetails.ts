import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getProductDetails = async (id: string) => {
  try {
    const { data } = await axios.get(`/product/${id}`);
    return data;
  } catch (error: any) {
    throw axiosErrorHandler(error);
  }
};

export const useGetProductDetails = (id: string) => {
  return useQuery(['productDetails', id], () => getProductDetails(id), {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
