import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const editCategory = async (slug: string, name: string) => {
  try {
    const response = await axios.put(`/category/${slug}`, { name: name });
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useEditCategory = () => {
  return useMutation<string, string, { slug: string; name: string }>(({ slug, name }) => editCategory(slug, name));
};
