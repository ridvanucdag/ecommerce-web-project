import { Product } from "../../requests/products/product.types";

export interface ProductListProps {
    products: Product[];
    title: string;
    countdownMinutes?: number;
  }