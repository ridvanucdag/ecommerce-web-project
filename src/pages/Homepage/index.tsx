import React from "react";
import { useProductQuery } from "../../requests/products/product.query";
import ImageSlider from "../../components/ImageSlider";
import ProductList from "../ProductList";
import Loading from "../../components/Loading";
import "./homepage.css";
import Menu from "../../components/Menu";
import { useCategoryProductsQuery } from "../../requests/category/category.query";
import { Product } from "../../requests/products/product.types";
import { useTranslation } from "react-i18next";

const Homepage: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useProductQuery();
  const { data: mobileAccessoriesData, isLoading: isLoadingMobileAccessories } =
    useCategoryProductsQuery("mobile-accessories");
  const { data: sportsAccessoriesData, isLoading: isLoadingSportsAccessories } =
    useCategoryProductsQuery("sports-accessories");
  const { data: smartphonesData, isLoading: isLoadingSmartphones } =
    useCategoryProductsQuery("smartphones");

  if (
    isLoading &&
    isLoadingMobileAccessories &&
    isLoadingSportsAccessories &&
    isLoadingSmartphones
  ) {
    return <Loading />;
  }

  const products = data?.products || [];

  const shuffleArray = (array: Product[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };


  const getRandomProducts = (array: Product[], count: number) => {
    const shuffledArray = [...array];
    shuffleArray(shuffledArray);
    return shuffledArray?.slice(0, count);
  };

  const randomProductsForSlider = getRandomProducts(products, 15); 
  const randomProductsForFlashCampaign = getRandomProducts(products, 10); 
  const randomProductsForBestSellers = getRandomProducts(products, 10);

  const productsWithFirstImage = (products: Product[]) => {
    return products?.map((product) => ({
      ...product,
      images: product?.images ? [product?.images?.[0]] : [],
    }));
  };

  return (
    <div className="homepage-container">
      <div className="hero-section">
        <div className="hompage-menu">
          <Menu />
        </div>
        <div className="slider-container">
          <ImageSlider products={productsWithFirstImage(randomProductsForSlider)} />
        </div>
      </div>

      <ProductList
        products={randomProductsForFlashCampaign}
        title={t("home.flashCampaings")}
        countdownMinutes={60}
      />
      <ProductList products={randomProductsForBestSellers} title={t("home.bestSellers")} />
      <ProductList
        products={mobileAccessoriesData?.products || []}
        title="Mobile Accessories"
      />
      <ProductList
        products={sportsAccessoriesData?.products || []}
        title="Sports Accessories"
      />
      <ProductList
        products={smartphonesData?.products || []}
        title="Smart Phones"
      />
    </div>
  );
};

export default Homepage;
