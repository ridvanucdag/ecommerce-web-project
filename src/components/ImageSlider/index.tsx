import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./ImageSlider.css";
import { Product } from "../../requests/products/product.types";
import { SlideImage } from "./ImageSlider.type";
import Button from "../Button";

const ImageSlider: React.FC<{ products: Product[] }> = memo(({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const images = React.useMemo(
    () =>
      products?.flatMap((product) =>
        product?.images?.map((image) => ({
          src: image,
          alt: product?.title,
          productId: product?.id,
        }))
      ),
    [products]
  );

  useEffect(() => {
    if (!isHovered && images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images?.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, images?.length]);

  const handleNavigation = useCallback(
    (direction: "prev" | "next") => {
      setCurrentIndex((prev) => {
        if (direction === "prev")
          return prev === 0 ? images?.length - 1 : prev - 1;
        return prev === images?.length - 1 ? 0 : prev + 1;
      });
    },
    [images]
  );

  const handleImageClick = useCallback(
    (productId: number) => {
      navigate(`/product/${productId}`);
    },
    [navigate]
  );

  if (!images.length) return null;

  return (
    <div
      className="slider-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <LazySlide
            key={`${image?.productId}-${index}`}
            image={image}
            isActive={index === currentIndex}
            onClick={handleImageClick}
          />
        ))}
      </div>

      <NavigationButton
        direction="prev"
        onClick={() => handleNavigation("prev")}
      />

      <NavigationButton
        direction="next"
        onClick={() => handleNavigation("next")}
      />

      <Pagination
        count={images?.length}
        currentIndex={currentIndex}
        onChange={setCurrentIndex}
      />
    </div>
  );
});

const LazySlide = memo(
  ({
    image,
    isActive,
    onClick,
  }: {
    image: SlideImage;
    isActive: boolean;
    onClick: (id: number) => void;
  }) => (
    <div className={`slide ${isActive ? "active" : ""}`}>
      <img
        src={image?.src}
        alt={image?.alt}
        loading="lazy"
        onClick={() => onClick(image?.productId)}
      />
      {isActive && (
        <div className="slide-caption">
          <h5>{image?.alt}</h5>
        </div>
      )}
    </div>
  )
);

const NavigationButton = memo(
  ({
    direction,
    onClick,
  }: {
    direction: "prev" | "next";
    onClick: () => void;
  }) => (
    <Button
      className={`nav-button ${direction}`}
      onClick={onClick}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
    >
      {direction === "prev" ? <FiChevronLeft /> : <FiChevronRight />}
    </Button>
  )
);

const Pagination = memo(
  ({
    count,
    currentIndex,
    onChange,
  }: {
    count: number;
    currentIndex: number;
    onChange: (index: number) => void;
  }) => (
    <div className="pagination">
      {Array.from({ length: count }).map((_, index) => (
        <Button
          key={index}
          className={`pagination-dot ${index === currentIndex ? "active" : ""}`}
          onClick={() => onChange(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
);

export default ImageSlider;
