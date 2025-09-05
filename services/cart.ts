import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CartDto } from './dto/cart.dto';

export const getCart = async (): Promise<CartDto> => {
  return (await axiosInstance.get<CartDto>(ApiRoutes.CART)).data;
};
