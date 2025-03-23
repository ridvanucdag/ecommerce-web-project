// cart.api.ts
import { ApiEndpoints, HttpMethod } from "../../api/createHttpClient.types";
import { useApiMutation } from "../base/useFetchers";

import { cartsKeyFactory } from "./cartKeyFactory";
import { useToast } from "../../components/Toast/ToastContext";
import { ApiMutationReturn } from "../base/fetcher.types";
import { Cart } from "./cart.types";
import { useTranslation } from "react-i18next";
import LoggerService from "../../providers/loggerService/loggerService";

export const useAddToCartMutation = (): ApiMutationReturn<Cart> => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  return useApiMutation<Cart>({
    mutationKey: cartsKeyFactory.addToCart(),
    method: HttpMethod.POST,
    path: ApiEndpoints.CARTS_ADD,
    onSuccess: (data) => {
      LoggerService.log("useAddToCartMutation", data?.data);
      addToast({
        title: t("cart.addToCartSuccessTitle"),
        description: t("cart.addToCartSuccessDescription"),
        type: "success",
      });
    },
    onError: () => {
      addToast({
        title: t("cart.addToCartErrorTitle"),
        description: t("cart.addToCartErrorDescription"),
        type: "error",
      });
    },
  });
};

export const useUpdateCartMutation = (): ApiMutationReturn<Cart> => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  return useApiMutation<Cart>({
    mutationKey: cartsKeyFactory.updateCart(),
    method: HttpMethod.PUT,
    path: `${ApiEndpoints.CARTS}/${1}`,
    onSuccess: (data) => {
      LoggerService.log("useUpdateCartMutation", data?.data);
      addToast({
        title: t("cart.updateCartSuccessTitle"),
        description: t("cart.updateCartSuccessDescription"),
        type: "success",
      });
    },
    onError: () => {
      addToast({
        title: t("cart.updateCartErrorTitle"),
        description: t("cart.updateCartErrorDescription"),
        type: "error",
      });
    },
  });
};

export const useDeleteFromCartMutation = (): ApiMutationReturn<Cart> => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  return useApiMutation<Cart>({
    mutationKey: cartsKeyFactory.deleteCart(),
    method: HttpMethod.DELETE,
    path: `${ApiEndpoints.CARTS}/${1}`,
    onSuccess: (data) => {
      LoggerService.log("useDeleteFromCartMutation", data?.data);
      addToast({
        title: t("cart.deleteFromCartSuccessTitle"),
        description: t("cart.deleteFromCartSuccessDescription"),
        type: "success",
      });
    },
    onError: () => {
      addToast({
        title: t("cart.deleteFromCartErrorTitle"),
        description: t("cart.deleteFromCartErrorDescription"),
        type: "error",
      });
    },
  });
};
