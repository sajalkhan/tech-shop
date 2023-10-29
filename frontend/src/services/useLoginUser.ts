import axios from 'utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from 'utils/axiosErrorHandler';

const loginUser = async (userInfo: any) => {
  try {
    const response = await axios.post('/signin', userInfo);
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};
