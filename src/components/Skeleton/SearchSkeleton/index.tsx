import "./SearchSkeleton.css";

const SearchSkeleton = () => {
  return (
    <div className="skeleton-search-container">
      <div className="skeleton-header">
        <div className="skeleton-header-text pulse"></div>
        <div className="skeleton-sort pulse"></div>
      </div>

      <div className="skeleton-layout">
        <div className="skeleton-sidebar">
          <div className="skeleton-filter-group">
            <div className="skeleton-filter-title pulse"></div>
            <div className="skeleton-dropdown pulse"></div>
          </div>

          <div className="skeleton-filter-group">
            <div className="skeleton-filter-title pulse"></div>
            <div className="skeleton-slider pulse"></div>
            <div className="skeleton-price-inputs">
              <div className="skeleton-price-input pulse"></div>
              <div className="skeleton-price-input pulse"></div>
            </div>
          </div>

          <div className="skeleton-filter-group">
            <div className="skeleton-filter-title pulse"></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-rating pulse"></div>
            ))}
          </div>

          <div className="skeleton-filter-group">
            <div className="skeleton-filter-title pulse"></div>
            <div className="skeleton-brands">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-brand pulse"></div>
              ))}
            </div>
          </div>

          <div className="skeleton-filter-group">
            <div className="skeleton-filter-title pulse"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-availability pulse"></div>
            ))}
          </div>
        </div>


          <div className="skeleton-product-grid">
            {[...Array(8)].map(
              (
                _,
                i
              ) => (
                <div key={i} className="skeleton-product-card">
                  <div className="skeleton-product-image pulse"></div>
                  <div className="skeleton-product-info">
                    <div className="skeleton-product-title pulse"></div>
                    <div className="skeleton-product-price pulse"></div>
                  </div>
                </div>
              )
            )}
          </div>

      </div>
    </div>
  );
};

export default SearchSkeleton;
