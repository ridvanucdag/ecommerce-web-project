import React from "react";
import { FiFilter, FiStar, FiDollarSign, FiTag, FiBox } from "react-icons/fi";
import ProductCard from "../../components/ProductCard";
import "./searchPage.css";
import Dropdown from "../../components/Dropdown";
import { useSearchFilters } from "../../hooks/useSearchFilters";
import RadioButton from "../../components/RadioButton";
import Button from "../../components/Button";
import { useTranslation } from "react-i18next";
import SearchSkeleton from "../../components/Skeleton/SearchSkeleton";

const SearchPage: React.FC = () => {
      const { t } = useTranslation();
  const {
    inputValue,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    setSortBy,
    selectedBrands,
    categories,
    isCategoryLoading,
    setSelectedBrands,
    availability,
    setAvailability,
    sortBy,
    filteredProducts,
    isLoading,
    brands,
    sortOptions,
  } = useSearchFilters();

  if (isLoading || isCategoryLoading) return <SearchSkeleton />;

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="search-meta">
          <div>
            <h3>{t("search.searchTerm")} "{inputValue}"</h3>
            <span className="result-count">
              {filteredProducts.length} {t("search.results")}
            </span>
          </div>

          <Dropdown
            label={t("search.sortBy")}
            options={sortOptions?.map((option) => option?.label) || []}
            selectedValue={
              sortOptions?.find((opt) => opt?.value === sortBy)?.label || ""
            }
            onChange={(selectedLabel) => {
              const selectedOption = sortOptions?.find(
                (opt) => opt?.label === selectedLabel
              );
              if (selectedOption) {
                setSortBy(selectedOption?.value);
              }
            }}
          />
        </div>
      </header>

      <div className="search-layout">
        <aside className="filter-sidebar">
          <div className="filter-group">
            <h3>
              <FiFilter /> {t("search.categories")}
            </h3>
            <Dropdown
              label=""
              options={categories || []}
              selectedValue={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <div className="filter-group">
            <h3>
              <FiDollarSign />{t("search.priceRange")} 
            </h3>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
              />
              <div className="price-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                />
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3>
              <FiStar /> {t("search.rating")} 
            </h3>
            {[4, 3, 2, 1].map((rating) => (
              <RadioButton
                key={rating}
                id={`rating-${rating}`}
                name="rating"
                value={rating?.toString()}
                checked={selectedRating === rating}
                onChange={(value) => setSelectedRating(Number(value))}
                label={
                  <>
                    <span className="stars">
                      {[...Array(rating)]?.map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </span>
                    <span>ve üzeri</span>
                  </>
                }
                className="rating-radio"
              />
            ))}
          </div>

          <div className="filter-group">
            <h3>
              <FiTag /> {t("search.brands")} 
            </h3>
            <div className="brand-filters">
              <Button
                className={`brand-tag ${
                  selectedBrands?.length === 0 ? "active" : ""
                }`}
                onClick={() => setSelectedBrands([])}
              >
                {t("search.allBrands")} 
              </Button>
              {brands.map((brand) => (
                <Button
                  key={brand}
                  className={`brand-tag ${
                    selectedBrands?.includes(brand) ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedBrands((prev) =>
                      prev?.includes(brand)
                        ? prev?.filter((b) => b !== brand)
                        : [...prev, brand]
                    )
                  }
                >
                  {brand}
                </Button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>
              <FiBox /> {t("search.stockStatus")} 
            </h3>
            <div className="availability-filter">
              <RadioButton
                id="stock-all"
                label={t("search.allProducts")}
                name="stock"
                value="all"
                checked={availability === "all"}
                onChange={setAvailability}
              />
              <RadioButton
                id="stock-in"
                label={t("search.inStock")}
                name="stock"
                value="in_stock"
                checked={availability === "in_stock"}
                onChange={setAvailability}
              />
              <RadioButton
                id="stock-out"
                label={t("search.outofStock")}
                name="stock"
                value="out_of_stock"
                checked={availability === "out_of_stock"}
                onChange={setAvailability}
              />
            </div>
          </div>
        </aside>
        <main className="product-results">
          {filteredProducts?.length > 0 ? (
            <div className="product-grid">
              {filteredProducts?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>{t("search.adjustingYourFilters")}</h3>
              <p>{t("search.noResultsFound")}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
