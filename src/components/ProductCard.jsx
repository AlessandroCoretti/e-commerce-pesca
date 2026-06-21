import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Stars from './Stars';

export default function ProductCard({ p }) {
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(p);
  };

  return (
    <div className="product-card">
      {p.badge && (
        <div className={`product-card__badge${p.isNew ? ' product-card__badge--new' : ''}`}>
          {p.badge}
        </div>
      )}

      <Link to={`/product/${p.slug}`} className="product-card__img">
        <img src={p.img} alt={p.name} loading="lazy" />
        <button className="product-card__wish" aria-label="Lista desideri" onClick={(e) => e.preventDefault()}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </Link>

      <div className="product-card__body">
        <div className="product-card__brand">{p.brand}</div>
        <Link to={`/product/${p.slug}`} className="product-card__name-link">
          <div className="product-card__name">{p.name}</div>
        </Link>
        <Stars rating={p.rating} count={p.reviews} />
        <div className="product-card__price">
          <span className="price-now">{p.price.toFixed(2)} &euro;</span>
          {p.originalPrice && (
            <>
              <span className="price-was">{p.originalPrice.toFixed(2)} &euro;</span>
              <span className="price-save">-{p.discount}%</span>
            </>
          )}
        </div>
        <button className="product-card__atc" onClick={handleAdd}>
          Aggiungi al Carrello
        </button>
      </div>
    </div>
  );
}
