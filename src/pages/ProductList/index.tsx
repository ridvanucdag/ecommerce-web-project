import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./ProductList.css";
import ProductCard from "../../components/ProductCard";
import Countdown from "../../components/Countdown";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../../components/Button";
import { ProductListProps } from "./ProductList.type";

const ProductList: React.FC<ProductListProps> = ({
  products,
  title,
  countdownMinutes,
}) => {
  const initialTime = countdownMinutes ? countdownMinutes * 60 : 0;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(products.length > 3);

  useEffect(() => {
    if (!countdownMinutes) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownMinutes]);

  const checkScrollPosition = useCallback(() => {
    if (!sliderRef.current) return;
    setCanScrollLeft(sliderRef.current.scrollLeft > 0);
    setCanScrollRight(
      sliderRef.current.scrollLeft <
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
    );
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const handleScroll = () => checkScrollPosition();
    sliderRef.current?.addEventListener("scroll", handleScroll);
    return () => sliderRef.current?.removeEventListener("scroll", handleScroll);
  }, [products, checkScrollPosition]);

  const scrollSlider = useCallback((direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollTo({
      left:
        direction === "left"
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="header-content">
          <div className="title-wrapper">
            <h2 className="section-title">
              <span className="title-text">{title}</span>
              {countdownMinutes !== undefined && (
                <div className="countdown-badge">
                  <Countdown seconds={timeLeft} />
                </div>
              )}
            </h2>
          </div>
          <div className="navigation-controls">
            <NavigationButton
              direction="left"
              onClick={() => scrollSlider("left")}
              disabled={!canScrollLeft}
            />
            <NavigationButton
              direction="right"
              onClick={() => scrollSlider("right")}
              disabled={!canScrollRight}
            />
          </div>
        </div>
      </div>

      <div className="product-scroller" ref={sliderRef}>
        <div className="product-track">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NavigationButton = memo(
  ({
    direction,
    onClick,
    disabled,
  }: {
    direction: "left" | "right";
    onClick: () => void;
    disabled: boolean;
  }) => (
    <Button
      className={`nav-buttons ${!disabled ? "hoverable" : "disabled"}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Önceki ürünler" : "Sonraki ürünler"}
    >
      {direction === "left" ? (
        <FiChevronLeft className="nav-arrow" size={20} />
      ) : (
        <FiChevronRight className="nav-arrow" size={20} />
      )}
    </Button>
  )
);

export default ProductList;