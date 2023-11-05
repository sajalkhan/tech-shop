import axios from 'utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from 'utils/axiosErrorHandler';

const logoutUser = async () => {
  try {
    const { data } = await axios.get('/signout');
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useLogoutUser = () => {
  return useMutation(['logout'], logoutUser);
};
