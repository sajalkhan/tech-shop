import axios from '@/utils/axiosConfig';
import { useMutation } from 'react-query';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const editSubCategory = async (slug: string, name: string) => {
  try {
    const response = await axios.put(`/subCategory/${slug}`, { name: name });
    return response.data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useEditSubCategory = () => {
  return useMutation<string, string, { slug: string; name: string }>(({ slug, name }) => editSubCategory(slug, name));
};
