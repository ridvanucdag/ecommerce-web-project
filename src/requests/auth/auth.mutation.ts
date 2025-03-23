import { AuthResponse, AuthSignUpResponse, AuthUpdate } from "./auth.types";
import { ApiMutationReturn } from "../base/fetcher.types";
import { useApiMutation } from "../base/useFetchers";
import { authKeyFactory } from "./authKeyFactory";
import { ApiEndpoints, HttpMethod } from "../../api/createHttpClient.types";
import { StorageKeys } from "../../providers/localStorage/localStorage.types";
import {
  removeItem,
  setItem,
} from "../../providers/localStorage/localStorageService";
import { useToast } from "../../components/Toast/ToastContext";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useTranslation } from "react-i18next";
import LoggerService from "../../providers/loggerService/loggerService";

export const useSignInMutation = (): ApiMutationReturn<AuthResponse> => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { getMeUser } = useUserProfile();
  return useApiMutation<AuthResponse>({
    mutationKey: authKeyFactory.signIn(),
    method: HttpMethod.POST,
    path: `${ApiEndpoints.AUTH_LOGIN}`,
    onSuccess: (data) => {
      if (data.data) {
        LoggerService.log("useSignInMutation", data?.data);
        const userData = {
          userId: data.data.id,
          userName: data.data.username,
          email: data.data.email,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          isLogin: true,
        };
        setItem(StorageKeys.User, JSON.stringify(userData));
        if (data.data.accessToken) {
          getMeUser(data.data.accessToken);
        }
        addToast({
          title: t("auth.signInSuccessTitle"),
          description: t("auth.signInSuccessDescription"),
          type: "success",
        });
      }
    },
    onError: () => {
      removeItem(StorageKeys.Profile);
      removeItem(StorageKeys.User);
      addToast({
        title: t("auth.signInErrorTitle"),
        description: t("auth.signInErrorDescription"),
        type: "error",
      });
    },
  });
};

export const useSignUpMutation =
  (): ApiMutationReturn<AuthSignUpResponse> => {
    const { addToast } = useToast();
    const { t } = useTranslation();
    return useApiMutation<AuthSignUpResponse>({
      mutationKey: authKeyFactory.signUp(),
      method: HttpMethod.POST,
      path: `${ApiEndpoints.SIGN_UP}`,
      onSuccess: (data) => {
        if (data?.data) {
          const registerData = {
            userId: data.data.id,
            userName: data.data.username,
            email: data.data.email,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
          };
          LoggerService.log("useSignUpMutation", data?.data);
          addToast({
            title: t("auth.signUpSuccessTitle"),
            description: t("auth.signUpSuccessDescription"),
            type: "success",
          });
          setItem("registerUser", JSON.stringify(registerData));
        }
      },
      onError: () => {
        addToast({
          title: t("auth.signUpErrorTitle"),
          description: t("auth.signUpErrorDescription"),
          type: "error",
        });
      },
    });
  };

export const useUpdateUserMutation = ({
  userId,
  params,
}: {
  userId: number;
  params: Partial<AuthUpdate>;
}): ApiMutationReturn<AuthResponse> => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const mutationKey = authKeyFactory.updateUser(userId);
  const path = `${ApiEndpoints.USERS}/${userId}`;
  const mutation = useApiMutation<AuthResponse>({
    mutationKey,
    method: HttpMethod.PUT,
    path,
    params,
    onSuccess: (data) => {
      if (data?.data) {
        LoggerService.log("useUpdateUserMutation", data?.data);
        addToast({
          title: t("auth.updateSuccessTitle"),
          description: t("auth.updateSuccessDescription"),
          type: "success",
        });
      }
    },
    onError: () => {
      addToast({
        title: t("auth.updateErrorTitle"),
        description: t("auth.updateErrorDescription"),
        type: "error",
      });
    },
  });

  return mutation;
};
