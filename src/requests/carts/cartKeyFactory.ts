export const cartsKeyFactory = {
  getCarts: (): string[] => ["CARTS_GET"],
  getUserCart: (userId: number): (string | number)[] => ["USER_CART_GET", userId],
  addToCart: () => ["CARTS_ADD"],
  updateCart: () => ["CARTS_UPDATE"],
  deleteCart: () => ["CARTS_DELETE"],
};