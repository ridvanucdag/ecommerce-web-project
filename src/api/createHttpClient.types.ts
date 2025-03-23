export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export enum QueryOptions {
  RETRY = 0,
  RETRY_DELAY = 1000,
  expiresInMins = 60,
}

export enum HttpStatus {
  UNAUTHORIZED = 401,
}

export enum ApiEndpoints {
  PRODUCTS = "products",
  CATEGORIES = "products/categories",
  CATEGORY_LIST = "products/category-list",
  CATEGORY_PRODUCTS = "products/category",
  AUTH_LOGIN = "auth/login",
  AUTH_ME = "auth/me",
  REFRESH_TOKEN = "auth/refresh",
  SIGN_UP = "users/add",
  USERS = "users",
  CARTS = "carts",
  CARTS_ADD = "carts/add",
}

