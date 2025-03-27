import { useState, useEffect } from 'react';
import './HomepageSkeleton.css';

const HomepageSkeleton = () => {
  const [itemsCount, setItemsCount] = useState(6);

  useEffect(() => {
    const updateItemsCount = () => {
      if (window.innerWidth >= 1024) {
        setItemsCount(6);
      } else if (window.innerWidth >= 768) {
        setItemsCount(4);
      } else {
        setItemsCount(2);
      }
    };
    updateItemsCount();
    window.addEventListener('resize', updateItemsCount);
    
    return () => window.removeEventListener('resize', updateItemsCount);
  }, []);

  return (
    <div className="home-skeleton-homepage">
      <div className="home-skeleton-hero">
        <div className="home-skeleton-menu pulse"></div>
        <div className="home-skeleton-slider pulse"></div>
      </div>

      {[...Array(3)].map((_, sectionIndex) => (
        <div key={sectionIndex} className="home-skeleton-product-section">
          <div className="home-skeleton-section-header">
            <div className="home-skeleton-section-title pulse"></div>
            {sectionIndex === 0 && <div className="home-skeleton-countdown pulse"></div>}
            <div className="home-skeleton-navigation pulse"></div>
          </div>

          <div className="home-skeleton-product-grid">
            {[...Array(itemsCount)].map((_, productIndex) => (
              <div key={productIndex} className="home-skeleton-product-card">
                <div className="home-skeleton-product-image pulse"></div>
                <div className="home-skeleton-product-info">
                  <div className="home-skeleton-product-title pulse"></div>
                  <div className="home-skeleton-product-price pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomepageSkeleton;