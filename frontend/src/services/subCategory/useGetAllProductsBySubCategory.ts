import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getAllProductsBySubCategory = async (type: string) => {
  try {
    const { data } = await axios.get(`/product/subCategory/${type}`);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetAllProductsBySubCategory = (type: string) => {
  return useQuery(['productsBySubCategory', type], () => getAllProductsBySubCategory(type), {
    enabled: !!type, // Only enable the query when type is truthy
    staleTime: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
