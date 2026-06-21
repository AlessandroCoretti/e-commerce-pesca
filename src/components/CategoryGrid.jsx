import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export default function CategoryGrid() {
  return (
    <section className="section section--gray">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/all" className="view-all">View All Categories</Link>
        </div>
        <div className="cat-grid">
          {categories.map((cat) => (
            <Link to={cat.path} className="cat-card" key={cat.id}>
              <div className="cat-card__img">
                <img src={cat.img} alt={cat.label} loading="lazy" />
              </div>
              <span className="cat-card__label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
