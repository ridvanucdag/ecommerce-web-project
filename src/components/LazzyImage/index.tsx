import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  onClick, 
  width, 
  height 
}) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className}
      effect="blur"
      onClick={onClick}
      width={width} 
      height={height}
    />
  );
};

export default LazyImage;
