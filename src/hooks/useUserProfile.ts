import { useCallback, useEffect, useState } from "react";
import { getParsedItem, removeItem, setItem } from "../providers/localStorage/localStorageService";
import { AuthResponse } from "../requests/auth/auth.types";
import { StorageKeys } from "../providers/localStorage/localStorage.types";
import { useGetMeQuery } from "../requests/auth/auth.query";

export const useUserProfile = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const user = getParsedItem<AuthResponse>(StorageKeys.User);
    setAccessToken(user?.accessToken || null);
  }, []);

  const {
    data,
    isSuccess,
    error,
    isLoading,
    refetch
  } = useGetMeQuery(
    { accessToken: accessToken ?? "" },
    { 
      enabled: !!accessToken,
    }
  );
  useEffect(() => {
    if (isSuccess && data) {
      setItem(StorageKeys.Profile, JSON.stringify(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error) {
      removeItem(StorageKeys.Profile);
    }
  }, [error]);

  const getMeUser = useCallback((token: string) => {
    if (token) refetch();
  }, [refetch]);

  return { 
    getMeUser,
    userData: data,
    isUserLoaded: isSuccess,
    userError: error,
    isUserLoading: isLoading
  };
};
