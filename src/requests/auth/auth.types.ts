import { UseQueryResult } from "@tanstack/react-query";

export type AuthSignIn = {
  username: string;
  password: string;
};

export type AuthSignUp = {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string
};

export type AuthUpdate = {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

export type AuthResponse = {
  id?: number;
  accessToken?: string;
  refreshToken?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  isLogin?: boolean;
};
export type AuthRefreshResponse = {
  accessToken?: string;
  refreshToken?: string;
};

export type AuthSignUpResponse = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number | null;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
    postalCode: string;
    state: string;
  };
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  birthDate: string;
  bloodGroup: string;
  company: {
    address: string;
    city: string;
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
    postalCode: string;
    state: string;
  };
  department: string;
  domain: string;
  ein: string;
  role:string;
  email: string;
  eyeColor: string;
  gender: string;
  hair: {
    color: string;
    type: string;
  };
  height: number | null;
  image: string;
  ip: string;
  macAddress: string;
  password: string;
  phone: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number | null;
};

export type GetMeParam = {
  accessToken: string;
};

export type GetUsersResponse = {
  users: AuthSignUpResponse[];
  total: number;
  skip: number;
  limit: number;
};

export type GetAuthReturn = {
  id: string;
  setId: (id: string) => void;
  query: UseQueryResult<AuthResponse>;
};

export type AuthResponseReturn = UseQueryResult<AuthResponse>;
export type AuthSignUpResponseReturn = UseQueryResult<AuthSignUpResponse>;
export type GetAllUsersReturn = UseQueryResult<GetUsersResponse>;