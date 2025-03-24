import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleProductQuery } from "../../requests/products/product.query";
import Loading from "../../components/Loading";
import "./ProductDetail.css";
import { formatPrice } from "../../utils/helpers";
import { StarRating } from "../../components/StarRating";
import Button from "../../components/Button";
import { useAddToCartMutation } from "../../requests/carts/cart.mutation";
import { getParsedItem } from "../../providers/localStorage/localStorageService";
import { StorageKeys } from "../../providers/localStorage/localStorage.types";
import { AuthSignUpResponse } from "../../requests/auth/auth.types";
import { useTranslation } from "react-i18next";
import LazyImage from "../../components/LazzyImage";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const productId = Number(id) || 0;
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [profile, setProfile] = useState<AuthSignUpResponse | null>(null);
  const { data: product, isLoading } = useSingleProductQuery(productId);
  const [mainImage, setMainImage] = useState<string>("");
  const { mutate } = useAddToCartMutation();

  useEffect(() => {
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    } else {
      setMainImage("../../assets/image/noimage.jpg");
    }
  }, [product]);

  useEffect(() => {
    const profileData = getParsedItem<AuthSignUpResponse>(StorageKeys.Profile);
    if (profileData) {
      setProfile(profileData);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <Loading />;
  if (!product) return <div className="error">{t("product.notFound")}</div>;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (profile) {
      mutate({
        userId: profile?.id,
        products: [{ id: productId, quantity: 1 }],
      } as unknown as void);
    }
  };
  const imageHeight = windowWidth >= 480 ? 420 : 340;
  return (
    <div className="product-detail">
      <div className="product-main">
        <div className="product-gallery">
          <div className="main-image-wrapper">
            <LazyImage
              src={mainImage}
              alt={product?.title}
              height={imageHeight}
              width="100%"
              className="main-image"
            />
            {product?.discountPercentage > 0 && (
              <span className="discount-badge">
                -%{product?.discountPercentage}
              </span>
            )}
          </div>

          <div className="thumbnail-grid">
            {product?.images?.map((image, index) => (
              <Button
                key={index}
                onClick={() => setMainImage(image)}
                className={`thumbnail-btn ${
                  mainImage === image ? "active" : ""
                }`}
                aria-label={`Resim ${index + 1}`}
              >
                <LazyImage
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={70}
                  className="thumbnail-image"
                />
              </Button>
            ))}
          </div>
        </div>
        <div className="product-summary">
          <div className="product-header">
            <h1 className="product-detail-title">{product?.title}</h1>
            <div className="product-meta">
              <span className="brand">{product?.brand}</span>
              <span className="category">{product?.category}</span>
              {product?.tags?.length > 0 && (
                <div className="product-tags">
                  {product?.tags?.map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="rating-stock">
              <StarRating rating={product?.rating} />
              <div className="stock-info">
                <span
                  className={`stock ${
                    product?.stock > 0 ? "in-stock" : "out-stock"
                  }`}
                >
                  {product?.stock > 0 ? `${product?.stock} Adet` : "Stokta Yok"}
                </span>
                {product?.availabilityStatus && (
                  <span className="availability">
                    {product?.availabilityStatus}
                  </span>
                )}
                {product?.minimumOrderQuantity > 1 && (
                  <span className="min-order">
                    {t("product.minOrderQuantity")}{" "}
                    {product?.minimumOrderQuantity}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="price-section">
            <div className="price-group">
              <span className="current-price">
                {formatPrice(
                  product?.price * (1 - product?.discountPercentage / 100)
                )}
              </span>
              {product?.discountPercentage > 0 && (
                <span className="original-price">
                  {formatPrice(product?.price)}
                </span>
              )}
            </div>
            <div className="payment-info">
              <span className="tax-info">{t("product.taxIncluded")}</span>
              {product?.shippingInformation && (
                <span className="shipping-info">
                  🚚 {product?.shippingInformation}
                </span>
              )}
            </div>
          </div>
          <Button className="add-to-cart" onClick={handleAddToCart}>
            <span className="cart-icon">🛒</span>
            {t("product.addToCart")}
          </Button>
        </div>
      </div>
      <div className="product-specs">
        <div className="specs-section">
          <h2 className="specs-title">{t("product.description")}</h2>
          <p className="specs-text">{product?.description}</p>
        </div>

        <div className="specs-grid">
          <div className="specs-group">
            <h3 className="specs-subtitle">{t("product.technicalSpecs")}</h3>
            <div className="specs-column">
              {product?.weight && (
                <div className="spec-item">
                  <span className="spec-label">{t("product.weight")}</span>
                  <span className="spec-value">{product?.weight} kg</span>
                </div>
              )}
              {product?.dimensions && (
                <div className="spec-item">
                  <span className="spec-label">{t("product.dimensions")}</span>
                  <span className="spec-value">
                    {product?.dimensions?.width}x{product?.dimensions?.height}x
                    {product?.dimensions?.depth} cm
                  </span>
                </div>
              )}
              {product?.sku && (
                <div className="spec-item">
                  <span className="spec-label">{t("product.sku")}</span>
                  <span className="spec-value">{product?.sku}</span>
                </div>
              )}
            </div>
          </div>
          <div className="specs-group">
            <h3 className="specs-subtitle">{t("product.policies")}</h3>
            <div className="specs-column">
              {product.shippingInformation && (
                <div className="spec-item">
                  <span className="spec-label">
                    {t("product.shippingInformation")}
                  </span>
                  <span className="spec-value">
                    {product?.shippingInformation}
                  </span>
                </div>
              )}
              {product?.returnPolicy && (
                <div className="spec-item">
                  <span className="spec-label">
                    {t("product.returnPolicy")}
                  </span>
                  <span className="spec-value">{product?.returnPolicy}</span>
                </div>
              )}
              {product?.warrantyInformation && (
                <div className="spec-item">
                  <span className="spec-label">
                    {t("product.warrantyInformation")}
                  </span>
                  <span className="spec-value">
                    {product?.warrantyInformation}
                  </span>
                </div>
              )}
            </div>
          </div>
          {product?.meta && (
            <div className="specs-group">
              <h3 className="specs-subtitle">{t("product.productId")}</h3>
              <div className="specs-column">
                {product?.meta?.barcode && (
                  <div className="spec-item">
                    <span className="spec-label">{t("product.barcode")}</span>
                    <span className="spec-value">{product?.meta?.barcode}</span>
                  </div>
                )}
                <div className="spec-item">
                  <span className="spec-label">{t("product.createdAt")}</span>
                  <span className="spec-value">
                    {new Date(product.meta.createdAt).toLocaleDateString(
                      "tr-TR"
                    )}
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">{t("product.updatedAt")}</span>
                  <span className="spec-value">
                    {new Date(product?.meta?.updatedAt).toLocaleDateString(
                      "tr-TR"
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="product-reviews">
        <h2 className="reviews-title">
          {t("product.reviews")} ({product?.reviews?.length || 0})
        </h2>

        {product?.reviews?.length > 0 ? (
          <div className="reviews-grid">
            {product?.reviews?.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-name">
                      {review?.reviewerName}
                    </span>
                    <span className="review-date">
                      {new Date(review?.date).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <StarRating rating={review?.rating} />
                </div>
                <p className="review-comment">{review?.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reviews">{t("product.noReviews")}</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
