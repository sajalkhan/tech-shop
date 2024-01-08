import { useQuery, useMutation } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getProductDetails = async (id: string) => {
  try {
    const { data } = await axios.get(`/product/${id}`);
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetProductDetails = () => {
  const getProductDetailsQuery = useQuery('productDetails', () => getProductDetails(''), {
    enabled: false, // Don't automatically fetch data
  });

  const getProductDetailsMutation = useMutation(getProductDetails);

  // Define a function to call the mutate with an id
  const fetchProductDetails = (id: string) => {
    getProductDetailsMutation.mutate(id);
  };

  return { ...getProductDetailsQuery, fetchProductDetails };
};
