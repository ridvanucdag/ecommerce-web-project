import { UseQueryResult } from "@tanstack/react-query";
import { ApiEndpoints, HttpMethod } from "../../api/createHttpClient.types";
import { useApiQuery } from "../base/useFetchers";
import { GetCategoriesResponse, GetCategoryListResponse, } from "./category.types";
import { categoryKeyFactory } from "./categoryKeyFactory";
import { GetProductsResponse } from "../products/product.types";

export const useCategoriesQuery = (): UseQueryResult<GetCategoriesResponse> => {
  return useApiQuery<GetCategoriesResponse>({
    queryKey: categoryKeyFactory.getCategories(),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.CATEGORIES}`,
  });
};

export const useCategoryListQuery = (): UseQueryResult<GetCategoryListResponse> => {
  return useApiQuery<GetCategoryListResponse>({
    queryKey: categoryKeyFactory.getCategoryList(),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.CATEGORY_LIST}`,
  });
};

export const useCategoryProductsQuery = (category: string): UseQueryResult<GetProductsResponse> => {
  return useApiQuery<GetProductsResponse>({
    queryKey: categoryKeyFactory.getCategoryProducts(category),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.CATEGORY_PRODUCTS}/${category}`,
  });
};