import React, { useEffect, useRef } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { SearchBarProps } from "./Searbar.type";
import { useTranslation } from "react-i18next";

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  isSearchVisible,
  setIsSearchVisible,
}) => {
  const searchRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchVisible(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <div>
      <div className="search-header-container">
        {isSearchVisible && (
          <div ref={searchRef} className="search-input-header-container">
            <AiOutlineSearch
              className="search-header-icons"
              onClick={handleSearch}
            />
            <input
              type="text"
              placeholder={t("search.placeholder")}
              className="search-input-header"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <AiOutlineClose
              className="clear-search-icon"
              onClick={clearSearch}
            />
          </div>
        )}
      </div>
      <div ref={searchRef} className="search-container-hidden">
        <div className="search-input-container-hidden">
          <AiOutlineSearch
            className="search-icon-hidden"
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            className="search-input-hidden"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {searchTerm.length > 1 && (
            <AiOutlineClose
              className="search-icon-hidden"
              onClick={clearSearch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
