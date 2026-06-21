import { Link } from 'react-router-dom';
import { promobanners, promoBanners3 } from '../data/products';

function PromoCard({ banner, sm }) {
  return (
    <Link to={banner.path} className={`promo-card${sm ? ' promo-card--sm' : ''}`}>
      <img src={banner.img} alt={banner.title} loading="lazy" />
      <div className="promo-card__overlay">
        <div className="promo-card__tag">{banner.tag}</div>
        <div className="promo-card__title">{banner.title}</div>
        <span className="promo-card__btn">{banner.cta}</span>
      </div>
    </Link>
  );
}

export function PromoBanners2() {
  return (
    <section className="section">
      <div className="container">
        <div className="promo-grid promo-grid--2">
          {promobanners.map((b) => (
            <PromoCard key={b.id} banner={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromoBanners3() {
  return (
    <section className="section section--gray">
      <div className="container">
        <div className="promo-grid promo-grid--3">
          {promoBanners3.map((b) => (
            <PromoCard key={b.id} banner={b} sm />
          ))}
        </div>
      </div>
    </section>
  );
}
