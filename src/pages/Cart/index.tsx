import "./Cart.css";
import Button from "../../components/Button";
import { StorageKeys } from "../../providers/localStorage/localStorage.types";
import { getParsedItem } from "../../providers/localStorage/localStorageService";
import { AuthSignUpResponse } from "../../requests/auth/auth.types";
import { useUserCartQuery } from "../../requests/carts/cart.query";
import {
  useUpdateCartMutation,
  useDeleteFromCartMutation,
} from "../../requests/carts/cart.mutation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LazyImage from "../../components/LazzyImage";
import CartSkeleton from "../../components/Skeleton/CartSkeleton";

const Cart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const profileData = getParsedItem<AuthSignUpResponse>(
    StorageKeys.Profile
  );
  const userId = profileData?.id;
  const { data: userData, isLoading } = useUserCartQuery(userId!);

  const cart = userData?.carts[0];

  const { mutate: updateCartMutation } = useUpdateCartMutation();
  const { mutate: removeFromCartMutation } = useDeleteFromCartMutation();

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedProducts = cart?.products?.map((product) => {
      if (product?.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });

    updateCartMutation({
      userId: userId,
      products:
        updatedProducts?.map((product) => ({
          id: product?.id,
          quantity: product?.quantity,
        })) ?? [],
    } as unknown as void);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCartMutation({
      userId: userId,
      productId: productId,
    } as unknown as void);
  };

  const handleClearCart = () => {
    removeFromCartMutation({
      userId: userId,
    } as unknown as void);
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-content">
          <div className="cart-empty-icon">🛒</div>
          <h1 className="cart-empty-title">{t("cart.emptyTitle")}</h1>
          <p className="cart-empty-text">
          {t("cart.emptyText")}
          </p>
          <Button onClick={() => navigate("/")} variant="primary" className="cart-empty-cta">
          {t("cart.continueShopping")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="cart-summary-header">
        <div>
        <h1 className="cart-main-title"> {t("cart.cartTitle")}</h1>
        <span className="cart-item-count">{cart?.totalQuantity} {t("cart.items")}</span>
        </div>
          <Button onClick={handleClearCart} className="cart-clear-button">
          {t("cart.clearCart")}
          </Button>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items-container">
          {cart?.products?.map((product) => (
            <div key={product?.id} className="cart-item">
              <div className="cart-item-image-container">
                <LazyImage
                  src={product?.thumbnail}
                  height={120}
                  width="100%"
                  alt={product?.title}
                  className="cart-item-image"
                />
              </div>

              <div className="cart-item-details">
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{product?.title}</h3>
                  <p className="cart-item-brand">{product?.brand}</p>
                  <div className="cart-item-price-container">
                    <span className="current-price">
                      $
                      {(product?.discountPercentage * product?.quantity).toFixed(
                        2
                      )}
                    </span>
                    {product?.discountPercentage > 0 && (
                      <span className="original-price">
                        ${product?.discountPercentage.toFixed(2)}
                      </span>
                    )}
                    {product?.price > 0 && (
                      <span className="original-price">
                        ${product?.price?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <Button
                      className="quantity-button"
                      onClick={() =>
                        handleUpdateQuantity(product?.id, product?.quantity - 1)
                      }
                      disabled={product?.quantity <= 1}
                    >
                      −
                    </Button>
                    <span className="quantity-value">{product?.quantity}</span>
                    <Button
                      className="quantity-button"
                      onClick={() =>
                        handleUpdateQuantity(product?.id, product?.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="remove-item-button"
                    onClick={() => handleRemoveItem(product?.id)}
                  >
                    {t("cart.remove")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <div className="summary-card">
            <h2 className="summary-title">{t("cart.orderSummary")}</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>{t("cart.productTotal")}</span>
                <span>${cart?.total.toFixed(2)}</span>
              </div>
              {cart?.discountedTotal < cart?.total && (
                <div className="summary-row discount">
                  <span>{t("cart.discount")}</span>
                  <span>
                    -${(cart?.total - cart?.discountedTotal).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="summary-row">
                <span>{t("cart.shipping")}</span>
                <span className="free-shipping">{t("cart.freeShipping")}</span>
              </div>
              <div className="summary-total">
                <div className="summary-row">
                  <span>{t("cart.totalAmount")}</span>
                  <span className="total-price">
                    ${cart?.discountedTotal?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Button className="checkout-button">
            {t("cart.securePayment")}
              <span className="secure-icon">🔒</span>
            </Button>
            <div className="payment-options">
              <span className="payment-text">{t("cart.securePaymentOptions")}</span>
              <div className="payment-icons">
                {["💳", "📱", "🌐"]?.map((icon, index) => (
                  <span key={index} className="payment-icon">
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
