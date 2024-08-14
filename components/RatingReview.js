import React, { useState } from 'react';

function RatingReview({ rating, setRating }) {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <span key={index}>
          <input
            type="radio"
            name="rating"
            value={star}
            onChange={() => setRating(star)}
          />
          <span
            className="star"
            style={{
              color: star <= (hover || rating) ? "#ffc107" : "#e4e5e9",
            }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          >
            &#9733;
          </span>
        </span>
      ))}
    </div>
  );
}

export default RatingReview;