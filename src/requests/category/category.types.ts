export interface Category {
    slug: string;
    name: string;
    url: string;
  }
  
  export interface GetCategoriesResponse {
    categories: Category[];
  }
  
  export interface GetCategoryListResponse {
    categories: string[];
  }
  