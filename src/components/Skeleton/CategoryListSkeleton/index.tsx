import { useEffect, useState } from 'react';
import './CategoryListSkeleton.css';

const CategoryListSkeleton = () => {

      const [itemsCount, setItemsCount] = useState(10);
    
      useEffect(() => {
        const updateItemsCount = () => {
          if (window.innerWidth >= 1024) {
            setItemsCount(10);
          } else if (window.innerWidth >= 768) {
            setItemsCount(6);
          } else {
            setItemsCount(3);
          }
        };
        updateItemsCount();
        window.addEventListener('resize', updateItemsCount);
        
        return () => window.removeEventListener('resize', updateItemsCount);
      }, []);

  return (
    <div className="skeleton-category-container">
      <div className="skeleton-category-header">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-count pulse"></div>
      </div>

      <div className="skeleton-category-grid">
        {[...Array(itemsCount)].map((_, index) => (
          <div key={index} className="skeleton-product-card">
            <div className="skeleton-image pulse"></div>
            <div className="skeleton-card-content">
              <div className="skeleton-product-title pulse"></div>
              <div className="skeleton-product-price pulse"></div>
              <div className="skeleton-product-rating pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListSkeleton;