import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getAllCategories = async () => {
  try {
    const { data } = await axios.get('/categories');
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetAllCategories = () => {
  return useQuery(['categories'], getAllCategories, {
    enabled: false,
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
