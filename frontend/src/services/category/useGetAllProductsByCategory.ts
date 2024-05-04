import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getAllProductsByCategory = async (type: string) => {
  try {
    const { data } = await axios.get(`/product/category/${type}`);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetAllProductsByCategory = (type: string) => {
  return useQuery(['productsByCategory', type], () => getAllProductsByCategory(type), {
    enabled: !!type, // Only enable the query when type is truthy
    staleTime: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
