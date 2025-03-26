import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import './Menu.css';
import { useCategoriesQuery } from '../../requests/category/category.query';
import { Category } from '../../requests/category/category.types';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { iconMapping } from './menu.type';

const Menu: React.FC<{ handleLinkClick?: () => void }> = ({ handleLinkClick }) => {
  const { data: categories, isLoading } = useCategoriesQuery();

  if (isLoading) return <Loading/>;

  return (
    <div className="side-menu">
      <ul className="menu-list">
        {Array.isArray(categories) &&
          categories?.slice(11, 23)?.map((category: Category) => {
            const icon = iconMapping[category?.slug] || '🔸';
            return (
              <li key={category?.slug} className="menu-item">
                <Link 
                  to={`/category/${category?.slug}`} 
                  className="category-link"
                  aria-label={`${category?.name} kategorisine göz at`}
                  onClick={handleLinkClick}
                >
                  <div className="menu-content">
                    <span className="menu-icon" role="img">{icon}</span>
                    <span className="menu-text">{category?.name}</span>
                  </div>
                  <FiChevronRight className="menu-arrow" />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Menu;
