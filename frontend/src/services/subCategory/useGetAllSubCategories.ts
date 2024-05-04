import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getAllSubCategories = async () => {
  try {
    const { data } = await axios.get('/subCategories');
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetAllSubCategories = () => {
  return useQuery(['subCategories'], getAllSubCategories, {
    enabled: false,
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
