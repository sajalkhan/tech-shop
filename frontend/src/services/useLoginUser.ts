import axios from 'utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from 'utils/axiosErrorHandler';

const loginUser = async (userInfo: any) => {
  try {
    const { data } = await axios.post('/signin', userInfo);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};
