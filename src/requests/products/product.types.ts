import { UseQueryResult } from "@tanstack/react-query";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  thumbnail: string;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  sku: string;
  tags: string[];
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  meta: {
    barcode: string;
    qrCode: string;
    createdAt: string;
    updatedAt: string;
  };
  reviews: {
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type GetProductsReturn = UseQueryResult<GetProductsResponse>;
