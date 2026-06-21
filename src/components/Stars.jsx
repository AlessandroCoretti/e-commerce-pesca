export default function Stars({ rating, count }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="product-card__stars">
      <div className="stars">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f${i}`} className="star">★</span>
        ))}
        {half && <span className="star" style={{ color: '#e8651a', opacity: 0.6 }}>★</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e${i}`} className="star" style={{ color: '#ccc' }}>★</span>
        ))}
      </div>
      {count !== undefined && (
        <span className="review-count">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
