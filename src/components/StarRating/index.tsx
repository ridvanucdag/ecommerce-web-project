import React from "react";
import { StarRatingProps } from "./StarRating.type";
import "./StarRating.css";

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const filledStars = Math.round(rating);
  const emptyStars = 5 - filledStars;

  return (
    <div className="star-rating">
      {Array(filledStars)
        ?.fill("★")
        ?.map((star, index) => (
          <span key={`filled-${index}`} className="filled-star">
            {star}
          </span>
        ))}
      {Array(emptyStars)
        ?.fill("☆")
        ?.map((star, index) => (
          <span key={`empty-${index}`} className="empty-star">
            {star}
          </span>
        ))}{" "}
      {rating}
    </div>
  );
};

export { StarRating };
