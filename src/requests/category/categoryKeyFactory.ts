export const categoryKeyFactory = {
    getCategoryList: (): string[] => ["CATEGORY_LIST"],
    getCategories: (): string[] => ["CATEGORIES"],
    getCategoryProducts: (category: string): string[] => [`CATEGORY_PRODUCTS_${category}`],
  };
  