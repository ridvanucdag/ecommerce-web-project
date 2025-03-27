import './ProductDetailSkeleton.css';

const ProductDetailSkeleton = () => {
  return (
    <div className="skeleton-detail">
      <div className="skeleton-main">
        <div className="skeleton-gallery">
          <div className="skeleton-main-image pulse"></div>
          <div className="skeleton-thumbnails">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-thumb pulse"></div>
            ))}
          </div>
        </div>

        <div className="skeleton-summary">
          <div className="skeleton-title pulse"></div>
          <div className="skeleton-meta pulse"></div>
          <div className="skeleton-rating pulse"></div>
          <div className="skeleton-price pulse"></div>
          <div className="skeleton-button pulse"></div>
        </div>
      </div>

      <div className="skeleton-specs">
        <div className="skeleton-specs-title pulse"></div>
        <div className="skeleton-specs-content">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton-spec-item">
              <div className="skeleton-spec-label pulse"></div>
              <div className="skeleton-spec-value pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="skeleton-reviews">
        <div className="skeleton-reviews-title pulse"></div>
        <div className="skeleton-reviews-content">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-review pulse">
              <div className="skeleton-review-header">
                <div className="skeleton-reviewer pulse"></div>
                <div className="skeleton-review-rating pulse"></div>
              </div>
              <div className="skeleton-review-text pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;