import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../requests/products/product.types";
import { useCategoryProductsQuery } from "../../requests/category/category.query";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import "./CategoryList.css";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";

const CategoryList: React.FC = () => {
  const { categorySlug } = useParams();
    const { t } = useTranslation();
  const { data: products, isLoading, isError } = useCategoryProductsQuery(categorySlug || "");
  const navigate = useNavigate();
  const formattedCategoryName = categorySlug?.replace(/-/g, " ");

  useEffect(() => {
    if (!categorySlug) {
      navigate("/");
    }
  }, [categorySlug, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="category__error">
        <div className="error__content">
          <h2>{t("categoryList.errorTitle")}</h2>
          <Button onClick={() => window.location.reload()} className="error__retry">
            {t("categoryList.tryAgain")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="category__container">
      <div className="category__header">
        <h1 className="header__title">{formattedCategoryName}</h1>
        <span className="header__product-count">{products?.products?.length} ITEMS</span>
      </div>

      {products?.products?.length === 0 ? (
        <div className="category__empty">
          <h2>{t("categoryList.noProductsFound")}</h2>
          <p>{t("categoryList.noProductsFoundDescription")}</p>
          <Button onClick={() => navigate("/")} className="empty__cta">
            {t("categoryList.continueShopping")}
          </Button>
        </div>
      ) : (
        <div className="category__grid">
          {products?.products?.map((product: Product) => (
            <ProductCard key={product?.id} product={product}/>
          ))}
        </div>
      )}
    </main>
  );
};

export default CategoryList;
