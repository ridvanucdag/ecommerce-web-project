export const productKeyFactory = {
  getProduct: (): string[] => ["PRODUCT_GET_PRODUCT_KEY"],
  getProductById: (id: number): string[] => [`PRODUCT_GET_PRODUCT_KEY_${id}`],
  getProductSearch: (searchTerm: string): string[] => [`PRODUCT_SEARCH_${searchTerm}`],
};
