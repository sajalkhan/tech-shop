import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const giveRating = async (data: any) => {
  try {
    const response = await axios.put('/productRating', data);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useAddRating = () => {
  return useMutation(giveRating);
};
