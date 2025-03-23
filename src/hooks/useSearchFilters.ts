import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchProductQuery } from "../requests/products/product.query";
import { Product } from "../requests/products/product.types";
import { useCategoryListQuery } from "../requests/category/category.query";
import { useTranslation } from "react-i18next";

export const useSearchFilters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
    const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(queryParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(queryParams.get("minPrice")) || 0,
    Number(queryParams.get("maxPrice")) || 1000,
  ]);
  const [selectedRating, setSelectedRating] = useState(
    Number(queryParams.get("rating")) || 0
  );
  const [sortBy, setSortBy] = useState(queryParams.get("sort") || "newest");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    queryParams.get("brands")?.split(",").filter(Boolean) || []
  );
  const [availability, setAvailability] = useState(
    queryParams.get("stock") || "all"
  );

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      setInputValue(params.get("q") || "");
      setSelectedCategory(params.get("category") || "all");
      setPriceRange([
        Number(params.get("minPrice")) || 0,
        Number(params.get("maxPrice")) || 1000,
      ]);
      setSelectedRating(Number(params.get("rating")) || 0);
      setSortBy(params.get("sort") || "newest");
      setSelectedBrands(params.get("brands")?.split(",").filter(Boolean) || []);
      setAvailability(params.get("stock") || "all");
    }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("q", inputValue);
    params.set("category", selectedCategory);
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    params.set("rating", selectedRating.toString());
    params.set("sort", sortBy);
    params.set("brands", selectedBrands.join(","));
    params.set("stock", availability);

    navigate({ search: params.toString() });
  }, [
    inputValue,
    selectedCategory,
    priceRange,
    selectedRating,
    sortBy,
    selectedBrands,
    availability,
  ]);

  const { data, isLoading } = useSearchProductQuery(inputValue);
  const { data: categoryData, isLoading: isCategoryLoading } =
    useCategoryListQuery();

  const filteredProducts = useMemo(() => {
    return (data?.products || [])
    ?.filter((product: Product) => {
        const matchesCategory =
          selectedCategory === "all" || product?.category === selectedCategory;
        const matchesPrice =
          product?.price >= priceRange[0] && product?.price <= priceRange[1];
        const matchesRating = product?.rating >= selectedRating;
        const matchesBrand =
          selectedBrands?.length === 0 || selectedBrands?.includes(product?.brand);
        const matchesStock =
          availability === "all" ||
          (availability === "in_stock"
            ? product?.stock > 0
            : product?.stock === 0);

        return (
          matchesCategory &&
          matchesPrice &&
          matchesRating &&
          matchesBrand &&
          matchesStock
        );
      })
      ?.sort((a, b) => {
        switch (sortBy) {
          case "title_asc":
            return a.title.localeCompare(b.title);
          case "title_desc":
            return b.title.localeCompare(a.title);
          case "price_asc":
            return a.price - b?.price;
          case "price_desc":
            return b?.price - a?.price;
          case "best_rated":
            return b?.rating - a?.rating;
          case "most_reviewed":
            return b?.reviews?.length - a?.reviews?.length;
          default:
            return (
              new Date(b?.meta?.createdAt).getTime() -
              new Date(a?.meta?.createdAt).getTime()
            );
        }
      });
  }, [
    data,
    selectedCategory,
    priceRange,
    selectedRating,
    sortBy,
    selectedBrands,
    availability,
  ]);

  const brands = useMemo(() => {
    if (!data) return [];

    const allBrands = data.products
      ?.map((product) => product?.brand?.trim())
      ?.filter((brand) => brand && brand !== "");
    return [...new Set(allBrands)];
  }, [data]);

  const categories = useMemo(() => {
    if (!categoryData || !Array.isArray(categoryData)) return [];
    return ["all", ...categoryData];
  }, [categoryData]);

  const sortOptions = [
    { value: "newest", label: t("filter.newest") },
    { value: "title_asc", label: t("filter.title_asc") },
    { value: "title_desc", label: t("filter.title_desc") },
    { value: "price_asc", label: t("filter.price_asc") },
    { value: "price_desc", label: t("filter.price_desc") },
    { value: "best_rated", label: t("filter.best_rated") },
    { value: "most_reviewed", label: t("filter.most_reviewed") },
  ];

  return {
    inputValue,
    setInputValue,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    sortBy,
    setSortBy,
    brands,
    categories,
    isCategoryLoading,
    sortOptions,
    selectedBrands,
    setSelectedBrands,
    availability,
    setAvailability,
    filteredProducts,
    isLoading,
  };
};
