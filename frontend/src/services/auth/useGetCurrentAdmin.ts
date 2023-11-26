import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getCurrentAdmin = async () => {
  try {
    const { data } = await axios.get('/currentAdmin');
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetCurrentAdminInfo = () => {
  return useQuery(['currentAdmin'], getCurrentAdmin, {
    enabled: false,
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
