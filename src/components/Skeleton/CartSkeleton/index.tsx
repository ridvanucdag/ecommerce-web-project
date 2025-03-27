import './CartSkeleton.css';

const CartSkeleton = () => {
  return (
    <div className="skeleton-cart-container">
      <div className="skeleton-cart-header">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-clear-btn pulse"></div>
      </div>

      <div className="skeleton-cart-content">
        <div className="skeleton-items-container">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-cart-item">
              <div className="skeleton-image pulse"></div>
              <div className="skeleton-item-details">
                <div className="skeleton-text-line pulse"></div>
                <div className="skeleton-text-line-sm pulse"></div>
                <div className="skeleton-price-line pulse"></div>
                <div className="skeleton-actions">
                  <div className="skeleton-quantity pulse"></div>
                  <div className="skeleton-remove-btn pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="skeleton-order-summary">
          <div className="skeleton-summary-title pulse"></div>
          <div className="skeleton-summary-row pulse"></div>
          <div className="skeleton-summary-row pulse"></div>
          <div className="skeleton-summary-divider"></div>
          <div className="skeleton-summary-total pulse"></div>
          <div className="skeleton-checkout-btn pulse"></div>
          <div className="skeleton-payment-icons">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-payment-icon pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;