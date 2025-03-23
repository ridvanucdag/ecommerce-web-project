
import { ApiEndpoints, HttpMethod } from '../../api/createHttpClient.types';
import { useApiQuery } from '../base/useFetchers';
import { GetCartsResponse, GetCartsReturn } from './cart.types';
import { cartsKeyFactory } from './cartKeyFactory';

export const useCartsQuery = (): GetCartsReturn => {
  const query = useApiQuery<GetCartsResponse>({
    queryKey: cartsKeyFactory.getCarts(),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.CARTS}`,
  });
  return query;
};


export const useUserCartQuery = (userId: number): GetCartsReturn => {
  const query = useApiQuery<GetCartsResponse>({
    queryKey: cartsKeyFactory.getUserCart(userId),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.CARTS}/user/${userId}`,
    enabled: !!userId,
  });

  return query;
};