import { ApiEndpoints, HttpMethod } from "../../api/createHttpClient.types";
import { useApiQuery } from "../base/useFetchers";
import {
  AuthSignUpResponse,
  AuthSignUpResponseReturn,
  GetAllUsersReturn,
  GetMeParam,
  GetUsersResponse,
} from "./auth.types";
import { authKeyFactory } from "./authKeyFactory";

export const useGetMeQuery = (
  accessToken: GetMeParam,
  options?: { enabled: boolean }
): AuthSignUpResponseReturn => {
  const query = useApiQuery<AuthSignUpResponse>({
    queryKey: authKeyFactory.getMe(),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.AUTH_ME}`,
    headers: {
      Authorization: `Bearer ${accessToken?.accessToken}`,
    },
    enabled: options?.enabled,
  });
  return query;
};



export const useAllUsersQuery = (): GetAllUsersReturn => {
  const query = useApiQuery<GetUsersResponse>({
    queryKey: authKeyFactory.getAllUsers(),
    method: HttpMethod.GET,
    path: `${ApiEndpoints.USERS}`,
  });
  return query;
};
