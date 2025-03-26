import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUserCircle,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getParsedItem,
  removeItem,
} from "../../providers/localStorage/localStorageService";
import { AuthSignUpResponse } from "../../requests/auth/auth.types";
import { StorageKeys } from "../../providers/localStorage/localStorage.types";
import { useUserCartQuery } from "../../requests/carts/cart.query";
import "./Header.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useCategoriesQuery } from "../../requests/category/category.query";
import { Category } from "../../requests/category/category.types";
import Menu from "../../components/Menu";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { cartsKeyFactory } from "../../requests/carts/cartKeyFactory";
import { authKeyFactory } from "../../requests/auth/authKeyFactory";

const Header: React.FC = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { data: categories } = useCategoriesQuery();
  const [profile, setProfile] = useState<AuthSignUpResponse | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = profile?.id;
  const { data: userData } = useUserCartQuery(userId!);
  const cartData = userData?.carts?.[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const profileData = getParsedItem<AuthSignUpResponse>(StorageKeys.Profile);
    setProfile(profileData || null);
  }, [location]);

  const toggleSearch = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  };
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleLogout = async () => {
    await Promise.all([
      removeItem(StorageKeys.Profile),
      removeItem(StorageKeys.User),
    ]);
    queryClient.removeQueries({
      queryKey: authKeyFactory.getMe(),
    });
    if (userId) {
      queryClient.removeQueries({
        queryKey: cartsKeyFactory.getUserCart(userId),
      });
    }
    navigate("/");
  };

  const handleMenuLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header>
      {profile && (
        <div className="right-header-container">
          <nav className="navigation-links">
            <Link to="/order-tracking" className="nav-link">
              {t("header.orderTracking")}
            </Link>
            <Link to="/become-seller" className="nav-link">
              {t("header.becomeSeller")}
            </Link>
            <Link to="/profile" className="nav-link">
              {t("header.profile")}
            </Link>
            <Link to="/login" className="nav-link" onClick={handleLogout}>
              {t("header.logout")}
            </Link>
          </nav>
        </div>
      )}
      <div className="header">
        <div className="left-section">
          <div className="hamburger-menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <Link className="product-link" to="/">
            <h1 className="title">Ecommerce</h1>
          </Link>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isSearchVisible={isSearchVisible}
          setIsSearchVisible={setIsSearchVisible}
        />
        <div className="mobile-icons">
          <AiOutlineSearch
            className="search-header-icon"
            onClick={toggleSearch}
          />
          <Link
            to={profile ? "/cart" : "/login"}
            className="cart-icon-container"
          >
            <FaShoppingCart className="mobile-cart-icon" />
            {cartData?.products && (
              <span className="mobile-cart-badge">
                {cartData?.products?.length}
              </span>
            )}
          </Link>
          <Link to={profile ? "/profile" : "/login"} className="icon-container">
            <FaUserCircle className="mobile-user-icon" />
          </Link>
        </div>
        <div className="cart-containers">
          {profile && (
            <div className="icon-container">
              <FaHeart className="icon" />
            </div>
          )}
          <Link to="/cart" className="icon-container">
            <FaShoppingCart className="icon" />
            {cartData?.products && (
              <span className="cart-badge">{cartData?.products?.length}</span>
            )}
          </Link>
          <Link to={profile ? "/profile" : "/login"} className="icon-container">
            <FaUserCircle className="icon" />
            <span className="user-name">
              {profile
                ? `${profile?.firstName} ${profile?.lastName}`
                : t("header.login")}
            </span>
          </Link>
        </div>
      </div>

      <nav className="categories-nav">
        <ul className="categories-list">
          {Array.isArray(categories) &&
            categories?.slice(0, 11)?.map((category: Category) => (
              <li key={category?.slug} className="category-item">
                <Link
                  to={`/category/${category?.slug}`}
                  className="category-links"
                >
                  {category?.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      {isMenuOpen && <Menu handleLinkClick={handleMenuLinkClick} />}
    </header>
  );
};

export default Header;