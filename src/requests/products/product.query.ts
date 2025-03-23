import { UseQueryResult } from '@tanstack/react-query';
import { ApiEndpoints, HttpMethod } from '../../api/createHttpClient.types';
import { useApiQuery } from '../base/useFetchers';
import { GetProductsResponse, GetProductsReturn, Product, } from './product.types';
import {productKeyFactory} from './productKeyFactory';

export const useProductQuery = (): GetProductsReturn => {
  const query = useApiQuery<GetProductsResponse>({
    queryKey: productKeyFactory.getProduct(),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.PRODUCTS}`,
  });
  return query;
};

export const useSingleProductQuery = (id: number): UseQueryResult<Product> => {
  const query = useApiQuery<Product>({
    queryKey: productKeyFactory.getProductById(id),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.PRODUCTS}/${id}`,
  });
  return query;
};


export const useSearchProductQuery = (searchTerm: string): GetProductsReturn => {
  const query = useApiQuery<GetProductsResponse>({
    queryKey: productKeyFactory.getProductSearch(searchTerm),
    path: `${ApiEndpoints.PRODUCTS}/search?q=${searchTerm}`,
  });

  return query;
};
