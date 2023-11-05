import axios from 'utils/axiosConfig';
import { useQuery } from 'react-query';
import axiosErrorHandler from 'utils/axiosErrorHandler';

const getCurrentUser = async () => {
  try {
    const { data } = await axios.get('/currentUser');
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetCurrentUserInfo = () => {
  return useQuery(['currentUser'], getCurrentUser, {
    enabled: false,
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
