import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useAddToCartMutation } from "../../requests/carts/cart.mutation";
import { getParsedItem } from "../../providers/localStorage/localStorageService";
import { AuthSignUpResponse } from "../../requests/auth/auth.types";
import { StorageKeys } from "../../providers/localStorage/localStorage.types";
import { formatPrice } from "../../utils/helpers";
import { ProductCardProps } from "./ProductCart.type";
import Button from "../Button";
import LazyImage from "../LazzyImage";
import { useToast } from "../Toast/ToastContext";
import { useTranslation } from "react-i18next";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToast } = useToast();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<AuthSignUpResponse | null>(null);
  const navigate = useNavigate();
  const { mutate } = useAddToCartMutation();

  useEffect(() => {
    const profileData = getParsedItem<AuthSignUpResponse>(StorageKeys.Profile);
    if (profileData) {
      setProfile(profileData);
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (profile) {
      mutate({
        userId: profile?.id,
        products: [{ id: product?.id, quantity: 1 }],
      } as unknown as void);
    } else {
      addToast({
        title: t("auth.authRequired"),
        description: t("auth.authMesage"),
        type: "error",
      });
    }
  };

  const handleClick = () => {
    navigate(`/product/${product?.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image-container">
        <LazyImage
          src={product?.images?.[0]}
          alt={product?.title}
          width="100%"
          height={200}
          className="image-container"
        />
        <div className="product-badges">
          <div className="rating-badge">⭐ {product.rating}</div>
          <Button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            ♥
          </Button>
        </div>
      </div>

      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-footer">
          <div className="price-container">
            <span className="original-prices">
              {formatPrice(
                product.price * (1 - product.discountPercentage / 100)
              )}
            </span>

            <span className="discount-price">{formatPrice(product.price)}</span>
          </div>
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <span className="cart-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
